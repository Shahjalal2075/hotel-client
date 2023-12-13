import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
const CheckOutForm = () => {
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);

    const [clientSecret, setClientSecret] = useState('');
    const employeeSalary = 120;

    useEffect(() => {
        axios.post('https://employee-server-wine.vercel.app/create-payment-intent', { salary: employeeSalary })
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret)
            })
    }, [employeeSalary])

    const handlePay = async e => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(error);
            toast(error.message);
        }
        else {
            console.log(paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email,
                    name: user.displayName
                }
            }
        })
        if (confirmError) {
            console.log('confirm error', clientSecret);
            toast(confirmError.message);
        }
        else {
            console.log('pay intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log(paymentIntent.id);
                toast('Payment & Room Booking Successfull');
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
            else
                toast('Payment Unsuccessful');
        }
    }

    return (
        <div className="">
            <form onSubmit={handlePay}>
                <CardElement>
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                </CardElement>
                <button disabled={!stripe || !clientSecret} className="btn btn-sm btn-primary my-6" type="submit">
                    Pay
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CheckOutForm;