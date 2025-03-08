import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const DropdownMenu = ({handleLogout,isVisible}) => {
    return (
        <div
            id="dropdown"
            className={`absolute z-10  ${
                isVisible ? "hidden" : "flex"
            } items-center   gap-6 flex-col   h-40 top-16   bg-white border shadow w-44 p-4 `}
        >
            <Link to="dashboard/profile/view" className="flex items-center text-sm w-full  ">
                <AccountCircleIcon
                    fontSize="small"
                    className="mr-2 text-[#878A99] font-Roboto  "
                />
                Profile
            </Link>
            <a href="#" className="flex items-center text-sm w-full  ">
                <SettingsIcon
                    fontSize="small"
                    className="mr-2 text-[#878A99] font-Roboto"
                />
                Settings
            </a>
            <button
                onClick={handleLogout}
                className="flex items-center text-sm w-full "
            >
                <LogoutIcon
                    fontSize="small"
                    className=" mr-2 text-[#878A99] font-Roboto"
                />
                Log out
            </button>
        </div>
    );
};
export default DropdownMenu;
