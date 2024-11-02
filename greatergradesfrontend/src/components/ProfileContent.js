import { useEffect, useState } from "react";
import { RoleEnum } from "../enum/Role";
const ProfileContent = () => {
    
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = JSON.parse(storedUser);
    const [institutionName, setInstitutionName] = useState({})

    useEffect(() => {
        const fetchInstitution = async () => {
            const response = await fetch('http://localhost:5000/api/Institutions/' + parsedUser?.institutionId, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            setInstitutionName(data);
        }
        fetchInstitution();
    }, [parsedUser?.institutionId])

    return (
        <div className="student-content">
            <p>First Name: {parsedUser?.firstName}</p>
            <p>Last Name: {parsedUser?.lastName}</p>
            <p>Username: {parsedUser?.username}</p>
            <p>Role: {RoleEnum[parsedUser?.role]}</p>
            <p>Institution: {institutionName?.name}</p>
        </div>
    )
}

export default ProfileContent;