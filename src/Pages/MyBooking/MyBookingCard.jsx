import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyBookingCard = ({ room }) => {

    const navigate = useNavigate();

    const { _id, cover, title, date, max } = room;

    const [rooms, setRooms] = useState([]);

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

                fetch(`http://localhost:5000/rooms/${room.title}`,{
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({available: `${rooms.available-(-1)}`})
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
                <button onClick={handleCancel} className='cursor-pointer bg-[#d33] text-lg rounded-2xl mt-2 text-center text-white px-2 py-1 font-semibold'>Cancel Room</button>
            </div>
        </div>
    );
};

export default MyBookingCard;

MyBookingCard.propTypes = {
    room: PropTypes.object,
}