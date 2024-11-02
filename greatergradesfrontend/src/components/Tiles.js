import { useEffect, useState } from "react";

const Tiles = ({ courseIds }) => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const responses = await Promise.all(
                    courseIds.map(courseId => 
                        fetch('http://localhost:5000/api/Classes/' + courseId, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                                'Content-Type': 'application/json'
                            }
                        }).then(res => res.json())
                    )
                )
                setCourses(responses);
            } catch {}
        }
        if (courseIds.length > 0) fetchCourses();

    }, [courseIds])

    return (
        <div>
            {courses.map((course, index) => (
                <div key={index} className="student-dashboard-tile">
                    <p>{course.subject}</p>
                </div>
            ))}
        </div>
    )

}

export default Tiles;