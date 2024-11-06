import React, { useState, useContext } from 'react';
import { addClass, addTeacherToClass } from '../greatergradesapi/Classes';
import { UserContext } from '../functions/UserContext';

const AddClassPopup = ({ onClose, institutionId }) => {
    const [subject, setSubject] = useState('');
    const [error, setError] = useState('');
    const { currentUser, authToken, setCurrentUser } = useContext(UserContext); // Get currentUser from context

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subject) {
            setError('Subject is required.');
            return;
        }
    
        const course = await addClass(subject, institutionId, authToken);
        if (course && course.classId) {
            await addTeacherToClass(course.classId, currentUser.userId, authToken);

            const updatedUser = {
                ...currentUser,
                taughtClassIds: [...currentUser.taughtClassIds, course.classId]
            };
    
            setCurrentUser(updatedUser);
            onClose();
        } else {
            setError('Failed to create class.');
            console.log(course)
        }
    };
    

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Add New Class</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="subject">Class Subject:</label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddClassPopup;