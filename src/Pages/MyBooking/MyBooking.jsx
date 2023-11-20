import { useContext, useEffect, useState } from "react";
import MyBookingCard from "./MyBookingCard";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const MyBooking = () => {

    const { user } = useContext(AuthContext);

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetch(`https://hotel-server-three.vercel.app/booking/${user.email}`)
            .then(res => res.json())
            .then(data => setRooms(data))
    }, [user.email]);

    return (
        <div className="pb-32">
            <Helmet>
                <title>Hotel | My Booked</title>
                <meta name="description" content="Hotel My Booking Section" />
            </Helmet>
            <h2 className="text-5xl text-center font-bold mb-16">My Booking Room</h2>
            {
                (rooms.length === 0)
                    ?
                    <div className="mx-auto w-full mt-10">
                        <div className="">
                            <div className="flex justify-center">
                                <img className="w-20" src="https://i.ibb.co/qCzm3nN/warning.png" alt="" />
                            </div>
                            <h2 className="text-center text-site-black font-bold text-2xl mt-8">You have not booking any room.</h2>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 items-center">
                            {
                                rooms.map(room => <MyBookingCard
                                    key={room._id}
                                    room={room}
                                ></MyBookingCard>)
                            }
                        </div>
                    </div>
            }

        </div>
    );
};

export default MyBooking;