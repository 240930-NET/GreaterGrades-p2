import { useEffect, useState } from "react";

const StudentHeader = () => {
    const [user, setUser] = useState();
    const url = 'http://localhost:5000/api/Auth/5';

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setUser(data);
        };
        fetchUser();
    }, []);

    return (
        <div className="student-header">
            <div className="student-info">
                <h3>{user?.username} {user?.username}</h3>
                <p>{user?.role}</p>
            </div>
        </div>
    );
};



export default StudentHeader;