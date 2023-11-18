import { useContext, useEffect, useState } from "react";
import MyBookingCard from "./MyBookingCard";
import { AuthContext } from "../../providers/AuthProvider";

const MyBooking = () => {

    const { user } = useContext(AuthContext);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/booking/${user.email}`)
            .then(res => res.json())
            .then(data => setRooms(data))
    }, [user.email]);

    return (
        <div className="pb-32">
            <h2 className="text-5xl text-center font-bold mb-16">My Booking Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 items-center">
                {
                    rooms.map(room => <MyBookingCard
                        key={room._id}
                        room={room}
                    ></MyBookingCard>)
                }
            </div>
        </div>
    );
};

export default MyBooking;