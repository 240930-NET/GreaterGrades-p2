import React, { useState, useContext } from 'react';
import { UserContext } from '../functions/UserContext';
import { getStorageItem } from "../functions/LocalStorage";
import UserTile from './UserTile';
import { RoleEnum } from "../enum/Role";
import { deleteStudentFromClass } from "../greatergradesapi/Classes";
import AddStudentToClassPopup from './AddStudentToClassPopup';

const CourseContent = () => {
    const { currentUser, authToken } = useContext(UserContext);
    const currentCourse = getStorageItem('currentCourse');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleDeleteStudent = async (studentId) => {
        try {
            await deleteStudentFromClass(currentCourse.classId, studentId, authToken);
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
            <h3 className="course-title">{currentCourse.subject}</h3>
            <div className="course-body">
                <div className="course-list-title">
                    <p>Students: {currentCourse.students?.length || 0}</p>
                    {isTeacherOrAdmin && (
                        <button onClick={() => setIsPopupOpen(true)}>Add Student</button>
                    )}
                    <div className="course-list-line" />
                    <div className="course-list-entries">
                        {currentCourse.students.map((student, index) => (
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
                    <p>Teachers: {currentCourse.teachers?.length || 0}</p>
                    <div className="course-list-line" />
                    <div className="course-list-entries">
                        {currentCourse.teachers.map((teacher, index) => (
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
                    <p>Assignments: {currentCourse.assignments?.length || 0}</p>
                    <div className="course-list-line" />
                </div>
            </div>
            {isPopupOpen && (
                <AddStudentToClassPopup 
                    onClose={() => setIsPopupOpen(false)} 
                    courseId={currentCourse.classId} 
                />
            )}
        </div>
    );
}

export default CourseContent;
