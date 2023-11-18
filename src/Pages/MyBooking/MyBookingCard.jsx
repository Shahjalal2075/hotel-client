import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyBookingCard = ({ room }) => {

    const navigate = useNavigate();

    const { _id, cover, title, date, max, review } = room;

    const [rooms, setRooms] = useState([]);

    const [value, setValue] = useState(1);

    const rating = (rooms.star - (rooms.star % rooms.review)) / rooms.review;

    const increment = () => {
        setValue(prevValue => (prevValue < 5 ? prevValue + 1 : prevValue));
    };

    const decrement = () => {
        setValue(prevValue => (prevValue > 1 ? prevValue - 1 : 1));
    };

    const submitReview = () => {
        fetch(`http://localhost:5000/rooms/${rooms.title}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ available: `${rooms.available}`, review: `${rooms.review - (-1)}`, star: `${rooms.star - (-value)}` })
        })
        fetch(`http://localhost:5000/booking/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ review: 0 })
        })
            .then(res => {
                res.json()
                Swal.fire({
                    title: "Review Successful",
                    text: `You rated ${value} out of 5`,
                    icon: "success"
                });
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            })
    }

    useEffect(() => {
        fetch(`http://localhost:5000/rooms/${title}`)
            .then(res => res.json())
            .then(data => setRooms(data))
    }, [title]);

    const handleCancel = () => {
        Swal.fire({
            title: 'Are you sure to Cancel Room?',
            text: `${title} ${max} person(s) for ${date}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: "No",
            confirmButtonText: "Confirm!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/rooms/${room.title}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ available: `${rooms.available - (-1)}`, review: `${rooms.review}`, star: `${rooms.star}` })
                })

                fetch(`http://localhost:5000/booking/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => {
                        res.json()
                    })
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Canceled!',
                                `${title} Room has been Canceled.`,
                                'success'
                            )
                        }
                    })
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        })

    }

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure className='w-1/2'><img src={cover} alt="Movie" /></figure>
            <div className="card-body w-1/2">
                <h2 className="text-xl font-bold ">{title}</h2>
                <p className='text-base'><span className='font-bold'>Max. Guest:</span> {max} person(s)</p>
                <p className='text-base font-bold'>{date}</p>
                {
                    (review == 1) ?
                        <div className='flex justify-start'>
                            <h2 className='text-base font-bold pr-4'>Rating: </h2>
                            <button className='font-bold text-base' onClick={decrement}>-</button>
                            <input className='w-12 text-center pl-3 font-bold text-base' type="number" value={value} readOnly />
                            <button className='font-bold text-base' onClick={increment}>+</button>
                            <button onClick={submitReview} className='font-bold text-base ml-6'>
                                <img className='w-6' src="https://i.ibb.co/WG62Cdm/right.png" alt="" />
                            </button>
                        </div>
                        :
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
                            <p className="text-lg mx-2">({rooms.review} Review)</p>
                        </div>
                }
                <button onClick={handleCancel} className='cursor-pointer bg-[#d33] text-lg rounded-2xl mt-2 text-center text-white px-2 py-1 font-semibold'>Cancel Room</button>
            </div>
        </div>
    );
};

export default MyBookingCard;

MyBookingCard.propTypes = {
    room: PropTypes.object,
}