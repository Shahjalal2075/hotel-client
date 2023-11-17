import PropTypes from 'prop-types';

const AllRoomCard = ({ room }) => {

    const { cover, title } = room;

    return (
        <div className="card shadow-xl bg-[#38C6D1] p-2">
            <figure className='flex justify-center items-center'><img src={cover} /></figure>
            <div className="">
                <h2 className="text-center text-2xl font-bold py-1">{title}</h2>
            </div>
        </div>
    );
};

export default AllRoomCard;

AllRoomCard.propTypes = {
    room: PropTypes.object,
}