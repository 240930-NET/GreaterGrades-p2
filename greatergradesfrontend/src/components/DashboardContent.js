import { getStorageItem } from "../functions/functions";
import Tiles from "./Tiles";


const DashboardContent = () => {
    const currentUser = getStorageItem('currentUser');

    // if user is student display this
    if (currentUser?.role === 0){
        return (
            <div className="student-content">
                <div className="student-tiles">
                    <Tiles />
                </div>
            </div>
        )
    }

    // if user is teacher display this
    else if (currentUser?.role === 1){
        return (
            <div className="student-content">
                <div>
                    <h3>Enrolled Classes</h3>
                    <div className="student-tiles">
                        <Tiles courseIds={currentUser?.classIds} />
                    </div>
                    <h3>Taught Classes</h3>
                    <div className="student-tiles">
                        <Tiles courseIds={currentUser?.taughtClassIds} />
                    </div>
                </div>
            </div>
        )
    }    

    // if user is institution admin display this
    else if (currentUser?.role === 2){
        return (
            <div className="student-content">
                <div className="student-tiles">
                    <Tiles />
                </div>
            </div>
        )
    }

    // if user is admin display this
    else if (currentUser?.role === 3){
        return (
            <div className="student-content">
                <div>
                    <h3>Enrolled Classes</h3>
                    <div className="student-tiles">
                        <Tiles courseIds={currentUser?.classIds} />
                    </div>
                    <h3>Taught Classes</h3>
                    <div className="student-tiles">
                        <Tiles courseIds={currentUser?.taughtClassIds} />
                    </div>
                </div>
            </div>
        )
    }
    
}

export default DashboardContent;