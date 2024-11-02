import Tiles from "./Tiles";

const TaughtClasses = () => {
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = JSON.parse(storedUser);


    return (
        <div className="student-content">
            <div>
                <h3>Taught Classes</h3>
                <div className="student-tiles">
                    <Tiles courseIds={parsedUser?.taughtClassIds} />
                </div>
            </div>
        </div>
    )
}

export default TaughtClasses;