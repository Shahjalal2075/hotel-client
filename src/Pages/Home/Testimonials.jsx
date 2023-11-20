import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {

    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('https://hotel-server-three.vercel.app/testimonials')
            .then(res => res.json())
            .then(data => setTestimonials(data))
    }, []);

    return (
        <div>
            <h2 className="text-5xl text-center font-bold my-16">Testimonials</h2>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3 items-center">
                {
                    testimonials.map(testimonial => <TestimonialCard
                        key={testimonial._id}
                        testimonial={testimonial}
                    ></TestimonialCard>)
                }
            </div>

        </div>
    );
};

export default Testimonials;