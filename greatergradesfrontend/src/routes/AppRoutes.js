import Dashboard from "../pages/Dashboard";
import Course from "../pages/Course";
import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/Course' element={<Course />} />
        </Routes >
    )
}

export default AppRoutes;