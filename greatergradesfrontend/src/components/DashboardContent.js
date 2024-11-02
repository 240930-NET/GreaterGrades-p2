import Tiles from "./Tiles";
const DashboardContent = () => {
    const storedUser = localStorage.getItem('currentUser');
    const parsedUser = JSON.parse(storedUser);

    // if user is student display this
    if (parsedUser?.role === 0){
        return (
            <div className="student-content">
                <div className="student-tiles">
                    <Tiles />
                </div>
            </div>
        )
    }

    // if user is teacher display this
    else if (parsedUser?.role === 1){
        return (
            <div className="student-content">
                <div>
                    <h3>Enrolled Classes</h3>
                    <div className="student-tiles">
                        <Tiles courseIds={parsedUser?.classIds} />
                    </div>
                    <h3>Taught Classes</h3>
                    <div className="student-tiles">
                        <Tiles courseIds={parsedUser?.taughtClassIds} />
                    </div>
                </div>
            </div>
        )
    }    

    // if user is institution admin display this
    else if (parsedUser?.role === 2){
        return (
            <div className="student-content">
                <div className="student-tiles">
                    <Tiles />
                </div>
            </div>
        )
    }

    // if user is admin display this
    else if (parsedUser?.role === 3){
        return (
            <div className="student-content">
                <div>
                    <h3>Enrolled Classes</h3>
                    <div className="student-tiles">
                        <Tiles courseIds={parsedUser?.classIds} />
                    </div>
                    <h3>Taught Classes</h3>
                    <div className="student-tiles">
                        <Tiles courseIds={parsedUser?.taughtClassIds} />
                    </div>
                </div>
            </div>
        )
    }
    
}

export default DashboardContent;