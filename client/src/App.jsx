import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import DraftPage from "./pages/DraftPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Navigate to={`/login`} />}></Route>
                <Route path='/login' exact element={<LoginPage />}></Route>
                <Route path='/home' exact element={<HomePage />}></Route>
                <Route path='/draft-room' exact element={<DraftPage />}></Route>
            </Routes>
        </Router>
    )
}

export default App
