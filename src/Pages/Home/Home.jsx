import { Helmet } from "react-helmet-async";
import AdsSlider from "./AdsSlider";
import Newsletter from "./Newsletter";
import Stunning from "./Stunning";
import Testimonials from "./Testimonials";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Hotel | Home</title>
                <meta name="description" content="Hotel Home Section" />
            </Helmet>
            <AdsSlider></AdsSlider>
            <Stunning></Stunning>
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;