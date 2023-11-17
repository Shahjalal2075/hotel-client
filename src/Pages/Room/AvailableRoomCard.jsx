import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AvailableRoomCard = ({ room }) => {

    const { cover,title,total,available,max } = room;

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure className='w-1/2'><img src={cover} alt="Movie" /></figure>
            <div className="card-body w-1/2">
                <h2 className="text-xl font-bold ">{title}</h2>
                <p className='text-base'><span className='font-bold'>Max. Guest:</span> {max} person(s)</p>
                <p className='text-base font-medium text-[#35B734]'>{available} rooms are available out of {total}</p>
                <Link className='cursor-pointer bg-[#017EFF] text-lg rounded-2xl mt-2 text-center text-white px-2 py-1 font-semibold'>View Room</Link>
            </div>
        </div>
    );
};

export default AvailableRoomCard;

AvailableRoomCard.propTypes = {
    room: PropTypes.object,
}