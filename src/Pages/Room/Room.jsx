import AllRoom from "./AllRoom";
import AvailableRoom from "./AvailableRoom";

const Room = () => {
    return (
        <div className="pb-16">
            <AvailableRoom></AvailableRoom>
            <AllRoom></AllRoom>
        </div>
    );
};

export default Room;