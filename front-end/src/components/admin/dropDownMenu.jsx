import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const DropdownMenu = ({handleLogout,isVisible}) => {
    return (
        <div
            id="dropdown"
            className={`absolute z-10  ${
                isVisible ? "hidden" : "flex"
            } items-center   gap-6 flex-col  h-40 top-16   bg-white border shadow w-[8rem]  p-4 `}
        >
            <a href="#" className="flex items-center text-sm w-full  ">
                <AccountCircleIcon
                    fontSize="small"
                    className="mr-2 text-[#878A99] font-Roboto  "
                />
                Profile
            </a>
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
