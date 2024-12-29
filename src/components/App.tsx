import './App.css'
import {Initial} from "./initial/Initial.tsx";
import {useEffect, useState} from "react";

function App() {
    const [nickname, setNickname] = useState("");

    useEffect(() => {
      console.log("Nickname to: " + nickname);
    })

    return (
        <>
            <Initial setNickname={setNickname} />
        </>
    )
}

export default App
