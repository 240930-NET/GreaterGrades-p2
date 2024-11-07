import { useContext } from "react";
import { UserContext } from "../functions/UserContext";
import { useGetAllClasses } from "../greatergradesapi/Classes";
import Tiles from "./Tiles";
import InstitutionTile from "./InstitutionTile";

const AdminContent = () => {
    const { currentUser } = useContext(UserContext);
    const allClasses = useGetAllClasses();
    const classIds = allClasses.flatMap(course => course.classId);
    
    return (
        <div>
            {currentUser?.role === 2 ? 
            <div>
                <h3>Classes</h3>
                <Tiles courseIds={classIds} />
            </div>
                :
            <div>
                <h3>Classes</h3>
                <Tiles courseIds={classIds} />
                <h3>Institutions</h3>
                <InstitutionTile />
            </div>
            }
        </div>
    )
}

export default AdminContent;