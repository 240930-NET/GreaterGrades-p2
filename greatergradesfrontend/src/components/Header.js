import { RoleEnum } from "../enum/Role";
import { getStorageItem } from "../functions/functions";
import { useState, useEffect } from "react";


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const currentUser = getStorageItem('currentUser')

    const handleLogout = () => {
        console.log("LOGOUT TEST")
        //localStorage.removeItem('currentUser');
        //window.location.reload();
    };

    return (
        <div className="dashboard-header">
            <div className="dashboard-info">
                <h3>{currentUser?.firstName} {currentUser?.lastName}</h3>
                <p className="username">{currentUser?.username}</p>
                <p className="role-badge">{RoleEnum[currentUser?.role]}</p>
            </div>
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                &#9776;
            </div>
            {menuOpen && (
                <div className="dropdown-menu">
                    <button onClick={handleLogout}>Logout</button>

                </div>
            )}
        </div>
    );    
    
};



export default Header;