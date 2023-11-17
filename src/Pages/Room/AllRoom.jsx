import { useEffect, useState } from "react";
import AllRoomCard from "./AllRoomCard";

const AllRoom = () => {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/roomPhotos')
            .then(res => res.json())
            .then(data => setRooms(data))
    }, []);

    return (
        <div>
            <h2 className="text-5xl text-center font-bold my-16">All Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 items-center">
                {
                    rooms.map(room => <AllRoomCard
                        key={room._id}
                        room={room}
                    ></AllRoomCard>)
                }
            </div>
        </div>
    );
};

export default AllRoom;