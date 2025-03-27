import './App.css'
import {Initial} from "./initial/Initial.tsx";
import {useEffect, useState} from "react";
import {Chat} from "./chat/Chat.tsx";
import {Logo} from "./logo/Logo.tsx";
import {Route, Routes, useNavigate , useLocation} from "react-router-dom";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setUserId] = useState<number>();

    useEffect(() => {
        if (location.pathname == "/chat") {
            navigate("/");
        }
    }, []);

    return (
        <>
            <Logo></Logo>
            <Routes>
                <Route path="/" element={<Initial setUserId={setUserId} />}/>
                <Route path="/chat" element={<Chat userId={userId}/>}/>
            </Routes>
        </>
    )
}

export default App
