import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyBookingCard = ({ room }) => {

    const navigate = useNavigate();

    const { _id, cover, title, date, max } = room;

    const [rooms, setRooms] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);
    const bookingDate = selectedDate
        ? `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`
        : 'No date selected';

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [isChange, setIsChange] = useState(false);

    const handleChangeDate = () => {
        setIsChange(true);
    }

    const handleDateSubmit = () => {
        if (bookingDate=="No date selected") {
            setIsChange(false);
        }
        else {
            fetch(`http://localhost:5000/booking/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ date: bookingDate })
            })
            .then(res => {
                res.json()
                Swal.fire({
                    title: "Date Change Successful",
                    text: `Your Booking Date: ${bookingDate}`,
                    icon: "success"
                });
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            })
        }
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
            <div className="card-body py-4 w-1/2">
                <h2 className="text-xl font-bold ">{title}</h2>
                <p className='text-base'><span className='font-bold'>Max. Guest:</span> {max} person(s)</p>
                <p className='text-base font-bold'>{date}</p>
                {
                    isChange ?
                        <div className="flex items-center justify-center gap-4">
                            <div className="">
                                <DatePicker className="bg-[#CCEAF8] border-[#38C6D1] border-2 px-2 py-1 rounded-lg ml-3 w-48"
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="Select a date"
                                />
                            </div>
                            <button><img onClick={handleDateSubmit} className='w-8' src="https://i.ibb.co/WG62Cdm/right.png" alt="" /></button>
                        </div>
                        :
                        <button onClick={handleChangeDate} className='cursor-pointer bg-[#017EFF] text-lg rounded-2xl mt-2 text-center text-white px-2 py-1 font-semibold'>Change Date</button>

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