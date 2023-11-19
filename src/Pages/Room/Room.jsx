import { Helmet } from "react-helmet-async";
import AllRoom from "./AllRoom";
import AvailableRoom from "./AvailableRoom";

const Room = () => {
    return (
        <div className="pb-16">
            <Helmet>
                <title>Hotel | Room</title>
                <meta name="description" content="Hotel All Room Section" />
            </Helmet>
            <AvailableRoom></AvailableRoom>
            <AllRoom></AllRoom>
        </div>
    );
};

export default Room;