import React, { useState, useContext } from 'react';
import { UserContext } from '../functions/UserContext';
import { getStorageItem } from "../functions/LocalStorage";
import UserTile from './UserTile';
import { RoleEnum } from "../enum/Role";
import { deleteStudentFromClass } from "../greatergradesapi/Classes";
import AddStudentToClassPopup from './AddStudentToClassPopup';
import AssignmentTile from './AssignmentTile';
import AddAssignmentPopup from './AddAssignmentPopup';
import AddTeacherToClassPopup from './AddTeacherToClassPopup';

const CourseContent = () => {
    const { currentUser, authToken } = useContext(UserContext);
    const currentCourse = getStorageItem('currentCourse');
    const [isAssignmentPopupOpen, setIsAssignmentPopupOpen] = useState(false);
    const [isStudentPopupOpen, setIsStudentPopupOpen] = useState(false);
    const [isTeacherPopupOpen, setIsTeacherPopupOpen] = useState(false);

    const handleDeleteStudent = async (studentId) => {
        try {
            await deleteStudentFromClass(currentCourse.userId, studentId, authToken);
            console.log(`Student with ID ${studentId} removed from course.`);
        } catch (error) {
            console.error("Error removing student from class");
        }
    };

    const isTeacherOrAdmin = currentUser.role > 0;
    console.log("Perms?")
    console.log(isTeacherOrAdmin)

    return (
        <div className="course-content">
            <h3 className="course-title">{currentCourse?.subject}</h3>
            <div className="course-body">
                <div className="course-list-title">
                    <p>Students: {currentCourse?.students?.length || 0}</p>
                    {isTeacherOrAdmin && (
                        <button onClick={() => setIsStudentPopupOpen(true)}>Add Student</button>
                    )}
                    <div className="course-list-line" />
                    <div className="course-list-entries">
                        {currentCourse?.students.map((student, index) => (
                            <UserTile
                                key={index}
                                firstName={student.firstName}
                                lastName={student.lastName}
                                role={RoleEnum[student?.role]}
                                showDelete={isTeacherOrAdmin}
                                onDelete={() => handleDeleteStudent(student.userId)}
                            />
                        ))}
                    </div>
                </div>
                <div className="course-list-title">
                    <p>Teachers: {currentCourse?.teachers?.length || 0}</p>
                    {currentUser.role > 1 && (
                        <button onClick={() => setIsTeacherPopupOpen(true)}>Add Teacher</button>
                    )}
                    <div className="course-list-line" />
                    <div className="course-list-entries">
                        {currentCourse?.teachers.map((teacher, index) => (
                            <UserTile
                                key={index}
                                firstName={teacher.firstName}
                                lastName={teacher.lastName}
                                role={RoleEnum[teacher?.role]}
                            />
                        ))}
                    </div>
                </div>
                <div className="course-list-title">
                    <p>Assignments: {currentCourse?.assignments?.length || 0}</p>
                    {isTeacherOrAdmin && (
                        <button onClick={() => setIsAssignmentPopupOpen(true)}>Add Assignment</button>
                    )}
                    <div className="course-list-line" />
                    <div className='course-list-entries'>
                        {currentCourse?.assignments.map((assignment, index) => (
                            <AssignmentTile 
                                key={index}
                                assignment={assignment}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {isStudentPopupOpen && (
                <AddStudentToClassPopup 
                    onClose={() => setIsStudentPopupOpen(false)} 
                    courseId={currentCourse?.classId} 
                />
            )}
            {isAssignmentPopupOpen && (
                <AddAssignmentPopup
                    onClose={() => setIsAssignmentPopupOpen(false)}
                    classId={currentCourse?.classId}
                />
            )}
            {isTeacherPopupOpen && (
                <AddTeacherToClassPopup 
                    onClose={() => setIsTeacherPopupOpen(false)} 
                    courseId={currentCourse?.classId} 
                />
            )}
        </div>
    );
}

export default CourseContent;
