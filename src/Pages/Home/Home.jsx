import { Helmet } from "react-helmet-async";
import AdsSlider from "./AdsSlider";
import Newsletter from "./Newsletter";
import Stunning from "./Stunning";
import Testimonials from "./Testimonials";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


const Home = () => {

    useEffect(() => {
        AOS.init({
            duration: 3000,
            once: true,
        });
    }, []);

    return (
        <div>
            <Helmet>
                <title>Hotel | Home</title>
                <meta name="description" content="Hotel Home Section" />
            </Helmet>

            <div data-aos="fade-down" className="">
                <AdsSlider></AdsSlider>
            </div>
            <div data-aos="fade-up" className="">
                <Stunning></Stunning>
            </div>
            <div data-aos="flip-right" className="">
                <Testimonials></Testimonials>
            </div>
            <div data-aos="flip-up" className="">
                <Newsletter></Newsletter>
            </div>



        </div>
    );
};

export default Home;