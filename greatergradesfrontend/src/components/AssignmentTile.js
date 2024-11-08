import { useContext, useState, useEffect } from "react";
import { useGetGrades } from "../greatergradesapi/Grades";
import { UserContext } from "../functions/UserContext";
import { deleteAssignment, useGetAllAssignments } from "../greatergradesapi/Assignment";
import UpdateAssignmentPopup from "./UpdateAssignmentPopup";

const AssignmentTile = ({ assignment }) => {

    const { currentUser, authToken } = useContext(UserContext);
    const [popupOpen, setPopupOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const grades = useGetGrades(refresh);
    const assignments = useGetAllAssignments(refresh);

    const grade = grades?.filter(grade => grade.assignmentId === assignment.assignmentId);
    const newAssignment = assignments?.find(assign => assign.assignmentId === assignment?.assignmentId);

    useEffect (() => {

    }, [refresh])

    const handleRemoveClick = (id) => {
        deleteAssignment(id, authToken)
        setRefresh(prev => !prev);
    }

    const handleUpdateClick = () => {
        setPopupOpen(true);
    }

    const handleClose = () => {
        setPopupOpen(false);
        setRefresh(prev => !prev);
    }

    return (
        <div className="user-tile">
            <h4 className="user-name">{newAssignment?.name}</h4>
            <p className="user-role">{grade[0]?.score}/{newAssignment?.maxScore}</p>
            {currentUser?.role !== 0 ?
                <div>
                    <div>
                        <button onClick={() => handleRemoveClick(newAssignment?.assignmentId)}>Remove</button>
                        <button onClick={() => handleUpdateClick()}>Update</button>
                    </div>
                    {popupOpen && (
                        <UpdateAssignmentPopup 
                        onClose={() => handleClose()}
                        id={newAssignment?.assignmentId}
                        classId={newAssignment?.classId}
                        />
                    )}
                </div>
            :
                <div />
            }
            
        </div>
    )
}
export default AssignmentTile;