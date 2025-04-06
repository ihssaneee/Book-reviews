import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../contexts/AuthContext";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from "react-router-dom";

const DropdownMenu = ({handleLogout,isVisible}) => {
    const LinkStyle="flex items-center text-base w-full text-zinc-600  p-3  m-0 hover:bg-slate-100 dark:hover:bg-[#22242B] dark:text-neutral-400 ";
    const {user}=useAuth();
    return (
        <>
            <div className="flex justify-center  items-center gap-2  font-public-sans border-b p-3 dark:border-b-neutral-500  ">
                <span className=" flex items-center justify-center ">
                    <img src={user.picture} 
                    alt="profile picture"
                    className=" max-w-none w-14 h-14 object-cover rounded-full"
                    />
                </span>
                <span className="flex flex-col justify-center  items-start  text-zinc-600 gap-1 dark:text-neutral-400">
                    <p className="font-bold  text-sm dark:text-neutral-300 ">{user.name}</p>
                    <p className=" font-normal text-sm">{user.email}</p>
                </span>
            </div>
            <Link to="user/profile" className={LinkStyle}>
                <PersonOutlineOutlinedIcon
                    fontSize="medium"
                    className="mr-2 text-[#878A99]  dark:text-slate-500 "
                />
                Profile
            </Link>
            <Link to="settings" className={LinkStyle}>
                <SettingsOutlinedIcon
                    fontSize="medium"
                    className="mr-2 text-[#878A99] dark:text-slate-500"
                />
                Settings
            </Link>
            <button
                onClick={handleLogout}
                className={LinkStyle}
            >
                <LogoutIcon
                    fontSize="medium"
                    className=" mr-2 text-[#878A99]  dark:text-slate-500 "
                />
                Log out
            </button>
        </>
    );
};
export default DropdownMenu;
