import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../contexts/AuthContext";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from "react-router-dom";

const DropdownMenu = ({handleLogout,isVisible}) => {
    const {user}=useAuth();
    return (
        <>
            <div className="flex justify-center items-center gap-2   border-b p-2  ">
                <span className=" flex items-center justify-center ">
                    <img src={user.picture} 
                    alt="profile picture"
                    className=" max-w-none w-14 h-14 object-cover rounded-full"
                    />
                </span>
                <span className="flex flex-col justify-center  items-start font-Roboto  text-zinc-600 gap-1">
                    <p className="font-bold font-Roboto text-sm">{user.name}</p>
                    <p className="font-Roboto font-normal text-sm">{user.email}</p>
                </span>
            </div>
            <Link to="user/profile" className="flex items-center text-base w-full text-zinc-600 font-Roboto ">
                <PersonOutlineOutlinedIcon
                    fontSize="medium"
                    className="mr-2 text-[#878A99]   "
                />
                Profile
            </Link>
            <a href="#" className="flex items-center text-base w-full  font-Roboto text-zinc-600">
                <SettingsOutlinedIcon
                    fontSize="medium"
                    className="mr-2 text-[#878A99] font-Roboto"
                />
                Settings
            </a>
            <button
                onClick={handleLogout}
                className="flex items-center text-base w-full font-Roboto text-zinc-600"
            >
                <LogoutIcon
                    fontSize="medium"
                    className=" mr-2 text-[#878A99] font-Roboto"
                />
                Log out
            </button>
        </>
    );
};
export default DropdownMenu;
