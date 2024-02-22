import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from "../pages/Home.jsx";
import NotFound from "../pages/404.jsx";
export default function RouteApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Router>
    )
}