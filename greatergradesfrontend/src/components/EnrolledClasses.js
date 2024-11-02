import Tiles from "./Tiles";
const EnrolledClasses = () => {

    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = JSON.parse(storedUser);


    return (
        <div className="student-content">
            <div>
                <h3>Enrolled Classes</h3>
                <div className="student-tiles">
                    <Tiles courseIds={parsedUser?.classIds} />
                </div>
            </div>
        </div>
    )
}

export default EnrolledClasses;