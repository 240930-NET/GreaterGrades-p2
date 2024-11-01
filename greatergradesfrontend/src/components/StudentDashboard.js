import StudentHeader from "./StudentHeader";
import StudentMainContent from "./StudentMainContent";
import StudentSideBar from "./StudentSideBar";

const StudentDashboard = () => {
    return (
        <main className='student-dashboard'>
            <StudentSideBar />
            <div className='student-body'>
                <StudentHeader />
                <StudentMainContent />
            </div>
        </main>
    );
};

export default StudentDashboard;