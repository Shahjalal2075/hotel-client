import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div>
            <div className=' flex flex-col justify-center items-center mt-20'>
                <h2 className='text-4xl text-center mt-20 font-bold'>Opps!!!!</h2>
                <Link className='text-center bg-[#111] text-[#fff] font-bold text-xl p-4 rounded-lg m-10' to={"/"}>Go Back home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;