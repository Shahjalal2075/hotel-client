import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Review from "./Review";

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


    const bookingDate = selectedDate
        ? `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`
        : 'No date selected';

    useEffect(() => {
        fetch(`http://localhost:5000/roomPhotos/${room.title}`)
            .then(res => res.json())
            .then(data => setPhotos(data))
    }, [room.title]);

    const handleAddCart = () => {

        if (!user) {

            Swal.fire({
                title: "Please Login for booking Room.",
                icon: "warning"
            });
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }

        const email = user.email;
        const title = room.title;
        const max = room.max;
        const date = bookingDate;
        const cover = room.cover;
        const review = "on";

        if (date === "No date selected") {
            Swal.fire({
                title: "You have not select date.",
                icon: "warning"
            });
            return;
        }

        const bookRoom = { email, title, max, date, cover, review };
        console.log(bookRoom);

        Swal.fire({
            title: "Confirm to Booked?",
            text: `${title} ${max} person(s) for ${date} Price: ${price} $`,
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
                            text: `${title} ${max} person(s) for ${bookingDate} Price: ${price} $`,
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
                    <p className='text-xl text-[#1F2937] font-bold'><span className=" font-bold">Price: </span>{price}$ per/night</p>
                    <button onClick={handleAddCart} className='btn btn-neutral text-[#fff]'>Book Now</button>
                </div>
                {
                    user ? <Review room={room}></Review> : <div className=""></div>
                }
            </div>
        </div>

    );
};

export default RoomDetails;