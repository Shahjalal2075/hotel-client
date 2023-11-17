import PropTypes from 'prop-types';

const StunningCard = ({img}) => {

    const {cover } = img;

    return (
        <div className="card shadow-xl bg-[#38C6D1]">
            <figure className='flex justify-center items-center m-2'><img src={cover} /></figure>
        </div>
    );
};

export default StunningCard;

StunningCard.propTypes = {
    img: PropTypes.object,
}