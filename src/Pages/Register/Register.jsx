import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';

const Register = () => {

    const { createUser, googleUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name + " " + email + " " + password);

        if (password.length < 6) {
            toast("Password is less than 6 characters.");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            toast("Password don't have a capital letter");
            return;
        }
        else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
            toast("Password don't have a special character");
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user);

                toast("User Create Succsessfully.");

                updateProfile(result.user, {
                    displayName: name,
                })
                    .then()
                    .catch()

                setTimeout(() => {
                    navigate("/");
                }, 1600);
            })
            .catch(error => {
                console.error(error);
                toast(error.message);
            })
    }

    const handleGoogleSignin = () => {
        googleUser()
            .then(result => {
                console.log(result.user);
                toast("User Create Succsessfully.");

                setTimeout(() => {
                    navigate("/");
                }, 1600);
            })
            .catch(error => {
                console.error(error);
                toast(error.message);
            })
    }

    return (
        <div className="grid lg:grid-cols-5 grid-cols-2">
            <div className=" col-span-2 flex flex-col items-center justify-center">

                <h2 className="text-4xl font-bold">Create Account</h2>
                <p className="text-base font-medium mt-12">Please Enter Your Details</p>
                <button onClick={handleGoogleSignin} className="border-[#38C6D1] border-2 px-6 py-1 rounded-2xl text-xl font-semibold my-6 w-80 flex justify-center items-center gap-4">
                    <img className="w-6" src="https://i.ibb.co/5kpQLKC/google.png" alt="Google" />
                    Log In with Google
                </button>
                <div className="flex gap-4 items-center">
                    <hr className="w-20" />
                    <p>or</p>
                    <hr className="w-20" />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <form onSubmit={handleRegister} className="flex flex-col justify-center items-center" action="">
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Full Name" type="text" name="name" required />
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Email" type="email" name="email" required />
                        <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Password" type="password" name="password" required />
                        <input className="cursor-pointer bg-[#017EFF] text-lg rounded-2xl mt-4 text-white px-2 py-1 font-semibold mb-4 w-80" type="submit" value={"Register"} />
                    </form>
                    <Link to={"/login"} className="text-base font-bold text-black">Allready Have An Account? Login Now</Link>
                </div>
                <ToastContainer />

            </div>
            <div className="flex justify-center items-center col-span-3">
                <img className="w-3/4" src="https://i.ibb.co/hczH6xT/hotelentry.png" alt="" />
            </div>
        </div>
    );
};

export default Register;