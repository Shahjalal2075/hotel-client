
const Newsletter = () => {
    return (
        <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-10">
                <img className="w-full" src="https://i.ibb.co/vccZbt5/newsletter.png" alt="" />
            </div>
            <div className="md:w-1/2 p-10">
                <h2 className="text-5xl font-bold mt-8">Subscribe to our Newsletter!</h2>
                <p className="text-2xl font-semibold my-6">Subscribe to our Newsletter and stay<br />updated.</p>
                <form className="flex flex-col justify-center" action="">
                    <input className="border border-[#171717] px-6 py-2 text-lg text-black rounded-lg w-80" placeholder="Email" type="email" name="email" required />
                    <input className=" cursor-pointer bg-[#017EFF] text-lg rounded-lg mt-4 text-white px-2 py-2 font-semibold mb-4 w-80" type="submit" value={"Subscribe"} />
                </form>
            </div>
        </div>
    );
};

export default Newsletter;