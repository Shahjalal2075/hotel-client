import PropTypes from 'prop-types';

const RoomReview = ({ review }) => {

    const { profile, name, time, message, rating, _id } = review;

    console.log(typeof(rating))

    return (
        <div className='border-[#38C6D1] border-4 text-center p-4 rounded-2xl'>
            <div className="items-center flex justify-center">
                <img className="w-16 mask mask-circle" src={profile} />
                <h2 className='ml-3 text-xl font-bold'>{name}</h2>
            </div>


            <p className='my-2 mt-4 text-base font-medium'>{message}</p>

            <div className="rating">
                {
                    (rating === "1") ? <input type="radio" name={_id} className="mask mask-star-2 bg-orange-400" checked /> : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                }
                {
                    (rating === "2") ? <input type="radio" name={_id} className="mask mask-star-2 bg-orange-400" checked /> : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                }
                {
                    (rating === "3") ? <input type="radio" name={_id} className="mask mask-star-2 bg-orange-400" checked /> : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                }
                {
                    (rating === "4") ? <input type="radio" name={_id} className="mask mask-star-2 bg-orange-400" checked /> : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                }
                {
                    (rating === "5") ? <input type="radio" name={_id} className="mask mask-star-2 bg-orange-400" checked /> : <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                }
            </div>
            <p className='my-1 text-base font-bold'>{time}</p>
        </div>
    );
};

export default RoomReview;

RoomReview.propTypes = {
    review: PropTypes.object,
}