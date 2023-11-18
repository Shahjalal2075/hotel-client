import { useEffect } from "react";
import { useState } from "react";
import AvailableRoomCard from "./AvailableRoomCard";

const AvailableRoom = () => {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/rooms')
            .then(res => res.json())
            .then(data => setRooms(data))
    }, []);

    return (
        <div>
            <h2 className="text-5xl text-center font-bold my-16">Available Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 items-center">
                {
                    rooms.map(room => <AvailableRoomCard
                        key={room._id}
                        room={room}
                    ></AvailableRoomCard>)
                }
            </div>
        </div>
    );
};

export default AvailableRoom;