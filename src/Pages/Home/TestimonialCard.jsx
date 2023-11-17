import PropTypes from 'prop-types';

const TestimonialCard = ({ testimonial }) => {

    const {name,profile,position,company,message } = testimonial;

    return (
        <div className='  bg-[#38C6D1] text-center p-4 rounded-2xl'>
            <div className="items-center flex justify-center">
                <img className="w-48 mask mask-circle" src={profile} />
            </div>
            <h2 className='mt-4 text-2xl font-bold'>{name}</h2>
            <p className='my-1 text-lg font-semibold'>{position}</p>
            <p className='my-1 text-lg font-bold'>{company}</p>
            <p className='my-1 mt-4 text-base font-medium'>{message}</p>
        </div>
    );
};

export default TestimonialCard;

TestimonialCard.propTypes = {
    testimonial: PropTypes.object,
}