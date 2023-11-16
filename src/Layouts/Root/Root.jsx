import { Outlet } from "react-router-dom";
import Header from "../../Shared/Header/Header";

const Root = () => {
    return (
        <div>
            <div className="container mx-auto">
                <Header></Header>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;