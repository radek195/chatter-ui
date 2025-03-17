import './App.css'
import {Initial} from "./initial/Initial.tsx";
import {useEffect, useState} from "react";
import {Chat} from "./chat/Chat.tsx";
import {Logo} from "./logo/Logo.tsx";
import {Route, Routes, useNavigate , useLocation} from "react-router-dom";

function App() {
    const [nickname, setNickname] = useState<string>("");
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname == "/chat") {
            navigate("/");
        }
    }, []);
    return (
        <>
            <Logo></Logo>
            <Routes>
                <Route path="/" element={<Initial setNickname={setNickname}/>}/>
                <Route path="/chat" element={<Chat myNickname={nickname}/>}/>
            </Routes>
        </>
    )
}

export default App
