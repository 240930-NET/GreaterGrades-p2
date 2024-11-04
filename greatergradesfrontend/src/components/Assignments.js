import { useMemo } from "react";
import { useGetUsersClasses } from "../greatergradesapi/Classes";
import { getStorageItem } from "../functions/functions";


const Assignments = ({ courseIds }) => {
    
    const currentUser = getStorageItem('currentUser')
    const courses = useGetUsersClasses(courseIds)

    const assignments = useMemo(() => {
        return courses.flatMap(course => course.assignments || []);
    }, [courses])

    const grades = useMemo(() => {
        return assignments.flatMap(assignment => assignment.grades.userId === currentUser?.userId ? [assignment.grades] : [])
    }, [assignments, currentUser])

    console.log(grades)

    return (
        <div>
            {assignments.map((assignment, index) => (
                <div key={index} className="student-dashboard-tile">
                    <p>{assignment.name}</p>
                </div>
            ))}
        </div>
    )
}
export default Assignments;