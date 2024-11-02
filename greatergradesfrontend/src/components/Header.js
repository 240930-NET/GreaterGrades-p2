import { RoleEnum } from "../enum/Role";
const Header = () => {
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = JSON.parse(storedUser);

    return (
        <div className="student-header">
            <div className="student-info">
                <h3>{parsedUser?.firstName} {parsedUser?.lastName}</h3>
                <p>{parsedUser?.username}</p>
                <p>{RoleEnum[parsedUser?.role]}</p>
            </div>
        </div>
    );
};



export default Header;