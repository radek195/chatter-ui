import './App.css'
import {Initial} from "./initial/Initial.tsx";
import {useState} from "react";
import {Chat} from "./chat/Chat.tsx";

function App() {
    const [nickname, setNickname] = useState<string>("");

    return (
        <>
            {nickname.length < 2 ?
                <Initial setNickname={setNickname}/> :
                <Chat myNickname={nickname}/>
            }
        </>
    )
}

export default App
