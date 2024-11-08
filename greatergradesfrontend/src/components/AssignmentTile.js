import { useContext, useState, useEffect } from "react";
import { useGetGrades } from "../greatergradesapi/Grades";
import { UserContext } from "../functions/UserContext";
import { deleteAssignment, useGetAllAssignments } from "../greatergradesapi/Assignment";
import UpdateAssignmentPopup from "./UpdateAssignmentPopup";

const AssignmentTile = ({ assignment, onDelete, onUpdate, isTeacherOrAdmin }) => {
    const { currentUser, authToken } = useContext(UserContext);
    const [popupOpen, setPopupOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const grades = useGetGrades(refresh);
    const assignments = useGetAllAssignments(refresh);

    const grade = grades?.filter(grade => grade.assignmentId === assignment.assignmentId);
    const newAssignment = assignments?.find(assign => assign.assignmentId === assignment?.assignmentId);

    useEffect(() => {
    }, [refresh]);

    const handleUpdateClick = () => {
        setPopupOpen(true);
    };

    const handleClose = () => {
        setPopupOpen(false);
        setRefresh(prev => !prev);
        if (onUpdate) {
            onUpdate();
        }
    };

    const handleDeleteClick = async () => {
        try {
            const result = await deleteAssignment(assignment.assignmentId, authToken);
            if (result === 'Deleted') {
                if (onDelete) {
                    await onDelete(assignment.assignmentId);
                }
                if (onUpdate) {
                    onUpdate();
                }
            }
        } catch (error) {
            console.error("Error deleting assignment:", error);
        }
    };
    

    return (
        <div className="user-tile">
            <h4 className="user-name">{newAssignment?.name || assignment.name}</h4>
            <p className="user-role">{grade[0]?.score}/{newAssignment?.maxScore || assignment.maxScore}</p>
            {isTeacherOrAdmin && (
                <div>
                    <div>
                        <button 
                            className="delete-icon"
                            onClick={handleDeleteClick}
                        >
                            🗑️
                        </button>
                        <button 
                            className="delete-icon"
                            onClick={handleUpdateClick}
                        >
                            ✏️
                        </button>
                    </div>
                    {popupOpen && (
                        <UpdateAssignmentPopup
                            onClose={handleClose}
                            id={newAssignment?.assignmentId || assignment.assignmentId}
                            classId={newAssignment?.classId || assignment.classId}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default AssignmentTile;