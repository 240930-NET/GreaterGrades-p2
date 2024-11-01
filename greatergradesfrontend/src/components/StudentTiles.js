import { useEffect, useState } from "react";



const StudentTiles = () => {

    const [courses, setCourses] = useState([]);
    const url = 'http://localhost:5000/api/Classes'

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setCourses(data);
        };
        fetchCourses();
    }, []);

    return (
        <div>
            {courses.map((course) => <div className="student-dashboard-tile" key={course.classId}>{course.subject}</div>)}
        </div>
    );
};

export default StudentTiles;