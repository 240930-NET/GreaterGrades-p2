import React, { useState, useContext } from 'react';
import { useGetAllUsers } from '../greatergradesapi/Auth';
import { UserContext } from '../functions/UserContext';
import { addStudentToClass } from '../greatergradesapi/Classes';

const AddStudentToClassPopup = ({ onClose, courseId }) => {
    const [selectedStudent, setSelectedStudent] = useState('');
    const [error, setError] = useState('');
    const { currentUser, authToken } = useContext(UserContext);
    var users = useGetAllUsers();
    users = users.filter(user => user.institutionId === currentUser.institutionId);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedStudent) {
            setError('Please select a student to add.');
            return;
        }

        try {
            const result = await addStudentToClass(courseId, selectedStudent, authToken);
            if (result === 'Added') {
                onClose();
            } else {
                setError('Failed to add student to class.');
            }
        } catch (err) {
            setError('Failed to add student to class.');
            console.error(err);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Add Student to Class</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="student">Select Student:</label>
                        <select
                            id="student"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                        >
                            <option value="">Select a student</option>
                            {users.map((user) => (
                                <option key={user.userId} value={user.userId}>
                                    {user.firstName} {user.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Add Student</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddStudentToClassPopup;
