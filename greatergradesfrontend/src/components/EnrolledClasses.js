import { getStorageItem } from "../functions/functions";
import Tiles from "./Tiles";
const EnrolledClasses = () => {

    const currentUser = getStorageItem('currentUser')
    console.log(currentUser)


    return (
        <div className="student-content">
            <div>
                <h3>Enrolled Classes</h3>
                <div className="tiles">
                    <Tiles courseIds={currentUser?.classIds} />
                </div>
            </div>
        </div>
    )
}

export default EnrolledClasses;