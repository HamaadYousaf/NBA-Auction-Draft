import { SocketContext, socket } from "./socketConfig"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DraftPage from "./pages/DraftPage"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"

const App = () => {

    return (
        <SocketContext.Provider value={socket}>
            <Router>
                <Routes>
                    <Route path='/' exact element={<Navigate to={`/login`} />}></Route>
                    <Route path='/login' exact element={<LoginPage />}></Route>
                    <Route path='/register' exact element={<RegisterPage />}></Route>
                    <Route path='/home' exact element={<HomePage />}></Route>
                    <Route path='/draft-room' exact element={<DraftPage />}></Route>
                </Routes>
            </Router>
        </SocketContext.Provider>
    )
}

export default App
