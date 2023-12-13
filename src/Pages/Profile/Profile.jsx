import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

const Profile = () => {

    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOutUser()
            .then()
            .catch()
        navigate("/");
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {
                user.photoURL ? <img className="mask mask-circle w-52" src={user.photoURL} /> : <img className="mask mask-circle w-52" src="https://i.ibb.co/0rcvLrD/users.png" />
            }

            <h2 className="font-bold text-2xl my-6">Name: {user.displayName}</h2>
            <h2 className="font-bold text-2xl mb-6">Email: {user.email}</h2>
            <div className="flex justify-between gap-16 mt-6">
                <Link to={'/edit'} className="btn font-bold btn-neutral text-[#fff]">Edit</Link>
                <button onClick={handleLogOut} className="btn font-bold btn-neutral text-[#fff]">Logout</button>
            </div>
        </div>
    );
};

export default Profile;