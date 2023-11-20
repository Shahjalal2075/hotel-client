import { useEffect } from "react";
import { useState } from "react";
import StunningCard from "./StunningCard";

const Stunning = () => {

    const [stunning, setStunning] = useState([]);

    useEffect(() => {
        fetch('https://hotel-server-three.vercel.app/stunning')
            .then(res => res.json())
            .then(data => setStunning(data))
    }, []);

    return (
        <div>
            <h2 className="text-5xl text-center font-bold my-16">Our Hotel</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 items-center">
                {
                    stunning.map(img => <StunningCard
                        key={img._id}
                        img={img}
                    ></StunningCard>)
                }
            </div>

        </div>
    );
};

export default Stunning;