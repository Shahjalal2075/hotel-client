import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import RoomReview from "./RoomReview";
import { Helmet } from "react-helmet-async";

const RoomDetails = () => {

    const { user } = useContext(AuthContext);
    const room = useLoaderData();
    const navigate = useNavigate();



    const { _id, cover, title, max, star, review, price, details, size } = room;

    const [isChange, setIsChange] = useState(cover);

    const handleChangeBtn = (e) => {
        setIsChange(e);
    }
    const rating = (star - (star % review)) / review;

    const [photos, setPhotos] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [writeReview, setWriteReview] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/booking/${user.email}/on`)
            .then(res => res.json())
            .then(data => setWriteReview(data))
    }, [user.email]);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/review/${room.title}`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [room.title]);

    const bookingDate = selectedDate
        ? `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`
        : 'No date selected';

    useEffect(() => {
        fetch(`http://localhost:5000/roomPhotos/${room.title}`)
            .then(res => res.json())
            .then(data => setPhotos(data))
    }, [room.title]);

    const handleAddCart = () => {

        const email = user.email;
        const title = room.title;
        const max = room.max;
        const date = bookingDate;
        const cover = room.cover;
        const review = "on";
        const bookRoom = { email, title, max, date, cover, review };
        console.log(bookRoom);

        Swal.fire({
            title: "Confirm to Booked?",
            text: `${title} ${max} person(s) for ${bookingDate} Price: ${price} tk`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/rooms/${room.title}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ available: `${room.available - 1}`, review: `${room.review}`, star: `${room.star}` })
                })

                fetch('http://localhost:5000/booking', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(bookRoom)
                })
                    .then(res => {
                        res.json()
                        Swal.fire({
                            title: "Room Booked Successful",
                            text: `${title} ${max} person(s) for ${bookingDate} Price: ${price} tk`,
                            icon: "success"
                        });
                        setTimeout(() => {
                            navigate('/');
                        }, 1500);
                    })
                    .then(data => {
                        console.log(data);
                    })


            }
        });

    }

    const handleReview = e => {
        e.preventDefault();
        const name = user.displayName;
        const message = e.target.message.value;
        const rating = e.target.star.value;
        const time = currentDateTime.toLocaleString();
        const profile = user.photoURL;
        const title = room.title;
        const reviewMessage = { name, title, message, rating, time, profile };
        console.log(reviewMessage);

        fetch(`http://localhost:5000/booking/${user.email}/on`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ review: "off" })
        })

        fetch(`http://localhost:5000/rooms/${room.title}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ available: `${room.available}`, review: `${room.review - (-1)}`, star: `${room.star - (-rating)}` })
        })

        fetch('http://localhost:5000/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reviewMessage)
        })
            .then(res => {
                res.json()
                Swal.fire({
                    title: "Review Successful",
                    text: `You rated ${rating} out of 5`,
                    icon: "success"
                });
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            })
            .then(data => {
                console.log(data);
            })
    }

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => {
            clearInterval(interval);
        };
    }, []);


    console.log('Date: ' + bookingDate);

    return (

        <div className="flex justify-center items-center">
            <Helmet>
                <title>Hotel | Booking Room</title>
                <meta name="description" content="Hotel Room Booking Section" />
            </Helmet>
            <div className="w-3/4 flex flex-col">
                <div className="grid grid-cols-5 gap-1">
                    <div className="  col-span-4 row-span-5">
                        <img className="w-full" src={isChange} alt="" />
                    </div>
                    {
                        photos.map(photo => <button key={photo._id} onClick={() => handleChangeBtn(photo.cover)}><img className="w-full" src={photo.cover} alt="" /></button>)
                    }
                </div>
                <h2 className="card-title text-3xl font-bold text-[#1F2937] my-8">{title}</h2>
                <p className='text-base'><span className='font-bold'>Max. Guest:</span> {max} person(s)</p>

                <p className='text-base my-2'><span className='font-bold'>Room Size:</span> {size} sqft</p>

                <div className="">
                    <p className="font-bold text-base">Booking Date:
                        <DatePicker className="bg-[#CCEAF8] border-[#38C6D1] border-2 px-2 py-1 rounded-lg ml-3"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            placeholderText="Select a date"
                        />
                    </p>
                </div>


                <div className="rating my-4">
                    {
                        (rating === 1) ? <input type="radio" name={_id} className="mask mask-star-2 bg-orange-400" checked /> : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    }
                    {
                        (rating === 2) ? <input type="radio" name={_id} className="mask mask-star-2 bg-orange-400" checked /> : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    }
                    {
                        (rating === 3) ? <input type="radio" name={_id} className="mask mask-star-2 bg-orange-400" checked /> : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    }
                    {
                        (rating === 4) ? <input type="radio" name={_id} className="mask mask-star-2 bg-orange-400" checked /> : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    }
                    {
                        (rating === 5) ? <input type="radio" name={_id} className="mask mask-star-2 bg-orange-400" checked /> : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    }
                    <p className="text-lg mx-2">({review} Review)</p>
                </div>

                <p className="text-lg text-[#1F2937] font-normal mt-6">{details}</p>
                <div className="flex justify-between items-center my-10">
                    <p className='text-xl text-[#1F2937] font-bold'><span className=" font-bold">Price: </span>{price} tk per/night</p>
                    <button onClick={handleAddCart} className='btn btn-neutral text-[#fff]'>Book Now</button>
                </div>
                <div className="flex">
                    <div className="w-1/2">
                        <div className="grid grid-cols-1 gap-3 items-center">
                            {
                                reviews.map(review => <RoomReview
                                    key={review._id}
                                    review={review}
                                ></RoomReview>)
                            }
                        </div>
                    </div>
                    <div className="w-1/2">
                        {
                            (writeReview.length != 0) ?
                                <div className="flex flex-col justify-center items-end">
                                    <form onSubmit={handleReview} className="flex flex-col justify-center items-center" action="">
                                        <textarea className="border-[#38C6D1] border-2 p-3 h-48 text-lg text-black rounded-lg mt-4 w-80 text-start" placeholder="Enter Your Review" type="text" name="message" required />
                                        <div className='flex justify-start  mt-3'>
                                            <h2 className='text-base font-bold pr-4'>Rating: </h2>
                                            <input className='w-16 text-center pl-3 font-bold text-base mr-3' type="number" name="star" defaultValue={5} />
                                            <h2 className='text-base font-bold pr-4'> Out of 5 </h2>
                                        </div>
                                        <input className="cursor-pointer bg-[#017EFF] text-lg rounded-2xl mt-4 text-white px-2 py-1 font-semibold mb-4 w-80" type="submit" value={"Submit"} />

                                    </form>
                                </div> :
                                <div className="">

                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

export default RoomDetails;