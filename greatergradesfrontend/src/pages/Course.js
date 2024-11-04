import Assignments from "../components/Assignments";
import { getStorageItem } from "../functions/functions";

const currentUser = getStorageItem('currentUser')
const Course = () => {
    return (
        <main>
            <Assignments courseIds={currentUser?.classIds} />
        </main>
    )
}
export default Course;