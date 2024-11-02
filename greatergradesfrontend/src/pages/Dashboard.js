import { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import DashboardContent from "../components/DashboardContent";
import ProfileContent from "../components/ProfileContent";
import EnrolledClasses from "../components/EnrolledClasses";
import TaughtClasses from "../components/TaughtClasses";

const storedUser = localStorage.getItem('currentUser');
const parsedUser = JSON.parse(storedUser);
let sidebarItems = [];

if (parsedUser?.role === 0) {
    sidebarItems = [
        { id: 'dashboard', label: 'Dashboard'},
        { id: 'profile', label: 'Profile'},
        { id: 'enrolled classes', label: 'Enrolled Classes'},
        { id: 'taught classes', label: 'Taught Classes'}
    ]
}
else if (parsedUser?.role === 1) {
    sidebarItems = [
        { id: 'dashboard', label: 'Dashboard'},
        { id: 'profile', label: 'Profile'},
        { id: 'enrolled classes', label: 'Enrolled Classes'},
        { id: 'taught classes', label: 'Taught Classes'}
    ]
}
else if (parsedUser?.role === 2) {
    sidebarItems = [
        { id: 'dashboard', label: 'Dashboard'},
        { id: 'profile', label: 'Profile'},
        { id: 'enrolled classes', label: 'Enrolled Classes'},
        { id: 'taught classes', label: 'Taught Classes'}
    ]
}
else if (parsedUser?.role === 3) {
    sidebarItems = [
        { id: 'dashboard', label: 'Dashboard'},
        { id: 'profile', label: 'Profile'},
        { id: 'enrolled classes', label: 'Enrolled Classes'},
        { id: 'taught classes', label: 'Taught Classes'}
    ]
}


const Dashboard = () => {

    const [selectedItem, setSelectedItem] = useState('dashboard');

    const renderContent = () => {
        switch (selectedItem) {
            case 'dashboard':
                return <DashboardContent />;
            case 'profile':
                return <ProfileContent />;
            case 'enrolled classes':
                return <EnrolledClasses />
            case 'taught classes':
                return <TaughtClasses />
            default:
                return <div>doesnt match....</div>
        }
    }



    return (
        <main className='student-dashboard'>
            <SideBar items={sidebarItems} selectedItem={selectedItem} onSelectItem={setSelectedItem}/>
            <div className='student-body'>
                <Header />
                {renderContent()}
            </div>
        </main>
    );
};

export default Dashboard;