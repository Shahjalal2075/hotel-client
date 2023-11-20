import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from "react";
import RoomReview from "./RoomReview";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Review = ({room}) => {

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [writeReview, setWriteReview] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/booking/${user.email}/${room.title}/on`)
            .then(res => res.json())
            .then(data => setWriteReview(data))
    }, [user.email,room.title]);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/review/${room.title}`)
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [room.title]);

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleReview = e => {
        e.preventDefault();
        const name = user.displayName;
        const message = e.target.message.value;
        const rating = e.target.star.value;
        const time = currentDateTime.toLocaleString();
        const profile = user.photoURL?user.photoURL:"https://i.ibb.co/0rcvLrD/users.png";
        const title = room.title;
        const reviewMessage = { name, title, message, rating, time, profile };
        console.log(reviewMessage);

        fetch(`http://localhost:5000/booking/${user.email}/${room.title}/on`, {
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

    console.log("Review: "+writeReview.length);

    return (
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
    );
};

export default Review;

Review.propTypes = {
    room: PropTypes.object,
}