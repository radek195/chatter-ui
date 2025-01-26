import './App.css'
import {Initial} from "./initial/Initial.tsx";
import {useState} from "react";
import {Chat} from "./chat/Chat.tsx";
import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";

function App() {
    const [nickname, setNickname] = useState<string>("");

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Initial setNickname={setNickname}/>}/>
                    <Route path="/chat" element={<Chat myNickname={nickname}/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
