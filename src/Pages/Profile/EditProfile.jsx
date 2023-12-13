import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const EditProfile = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name + " " + email + " ");

        updateProfile(user, {
            displayName: name,
        })
            .then()
            .catch()

        toast("User Update Succsessfully.");

        setTimeout(() => {
            navigate("/profile");
        }, 1600);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {
                user.photoURL ? <img className="mask mask-circle w-52" src={user.photoURL} /> : <img className="mask mask-circle w-52" src="https://i.ibb.co/0rcvLrD/users.png" />
            }

            <form onSubmit={handleSave} className="flex flex-col justify-center items-center" action="">
                <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Full Name" type="text" name="name" defaultValue={user.displayName} required />
                <input className="border px-6 py-1 text-lg text-black rounded-2xl mt-4 w-80" placeholder="Enter Email" type="email" name="email" value={user.email} required />
                <input className="cursor-pointer bg-[#017EFF] text-lg rounded-2xl mt-4 text-white px-2 py-1 font-semibold mb-4 w-80" type="submit" value={"Update"} />
            </form>
            <ToastContainer />
        </div>
    );
};

export default EditProfile;