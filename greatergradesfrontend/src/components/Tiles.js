import { Link } from "react-router-dom";
import { useGetUsersClasses } from "../greatergradesapi/Classes";
import forestImage from "../images/forest.jfif";

const Tiles = ({ courseIds }) => {
    const classes = useGetUsersClasses(courseIds);

    return (
        <div className="tiles-container">
            {classes.map((course, index) => (
                <Link key={index} to="/Course" className="dashboard-tile-link">
                    <div className="dashboard-tile">
                        <h3 className="tile-title">{course.subject}</h3>
                        <img src={forestImage} alt="Course placeholder" className="tile-image" />
                        <div className="tile-footer">
                            <p>{course.students?.length || 0} Students</p>
                            <p>{course.teachers?.length || 0} Teachers</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Tiles;
