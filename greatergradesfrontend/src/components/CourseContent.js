import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../functions/UserContext';
import { getStorageItem } from "../functions/LocalStorage";
import UserTile from './UserTile';
import { RoleEnum } from "../enum/Role";
import { deleteStudentFromClass, deleteTeacherFromClass, useGetClassById } from "../greatergradesapi/Classes";
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

    // Use the enhanced hook with refresh capability
    const { course: courseData, refresh } = useGetClassById(currentCourse?.classId);

    const handleDeleteStudent = async (studentId) => {
        try {
            const response = await deleteStudentFromClass(courseData.classId, studentId, authToken, refresh);
            if (response === 'Deleted') {
                refresh(); // Force immediate refresh
            }
        } catch (error) {
            console.error("Error removing student from class:", error);
        }
    };

    const handleDeleteTeacher = async (teacherId) => {
        try {
            const response = await deleteTeacherFromClass(courseData.classId, teacherId, authToken, refresh);
            if (response === 'Deleted') {
                refresh(); // Force immediate refresh
            }
        } catch (error) {
            console.error("Error removing teacher from class:", error);
        }
    };

    const handlePopupClose = () => {
        setIsStudentPopupOpen(false);
        setIsTeacherPopupOpen(false);
        setIsAssignmentPopupOpen(false);
        refresh(); // Force refresh when popup closes
    };

    const isTeacherOrAdmin = currentUser.role > 0;

    if (!courseData) {
        return <div>Loading course data...</div>;
    }

    return (
        <div className="course-content">
            <h3 className="course-title">{courseData.subject}</h3>
            <div className="course-body">
                <div className="course-list-title">
                    <p>Students: {courseData.students?.length || 0}</p>
                    {isTeacherOrAdmin && (
                        <button onClick={() => setIsStudentPopupOpen(true)}>Add Student</button>
                    )}
                    <div className="course-list-line" />
                    <div className="course-list-entries">
                        {courseData.students?.map((student) => (
                            <UserTile
                                key={student.userId}
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
                    <p>Teachers: {courseData.teachers?.length || 0}</p>
                    {currentUser.role > 1 && (
                        <button onClick={() => setIsTeacherPopupOpen(true)}>Add Teacher</button>
                    )}
                    <div className="course-list-line" />
                    <div className="course-list-entries">
                        {courseData.teachers?.map((teacher, index) => (
                            <UserTile
                                key={teacher.userId}
                                firstName={teacher.firstName}
                                lastName={teacher.lastName}
                                role={RoleEnum[teacher?.role]}
                                showDelete={currentUser.role > 1}
                                onDelete={() => handleDeleteTeacher(teacher.userId)}
                            />
                        ))}
                    </div>
                </div>
                <div className="course-list-title">
                    <p>Assignments: {courseData.assignments?.length || 0}</p>
                    {isTeacherOrAdmin && (
                        <button onClick={() => setIsAssignmentPopupOpen(true)}>Add Assignment</button>
                    )}
                    <div className="course-list-line" />
                    <div className='course-list-entries'>
                        {courseData.assignments?.map((assignment) => (
                            <AssignmentTile 
                                key={assignment.assignmentId}
                                assignment={assignment}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {isStudentPopupOpen && (
                <AddStudentToClassPopup 
                    onClose={handlePopupClose}
                    courseId={courseData.classId} 
                />
            )}
            {isAssignmentPopupOpen && (
                <AddAssignmentPopup
                    onClose={handlePopupClose}
                    classId={courseData.classId}
                />
            )}
            {isTeacherPopupOpen && (
                <AddTeacherToClassPopup 
                    onClose={handlePopupClose}
                    courseId={courseData.classId} 
                />
            )}
        </div>
    );
}

export default CourseContent;
