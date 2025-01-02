import "./Chat.css"
import {messages as stubMessages} from "../initial/stubMessages.ts";
import {CSSProperties, useEffect, useRef, useState} from "react";

interface Message {
    nickname: string;
    content: string;
}

export const Chat = ({myNickname}) => {
    const [messages, setMessages] = useState<Message[]>(stubMessages);
    const [text, setText] = useState<string>("");
    const scrollableDivRef = useRef(null);

    useEffect(() => {
        const scrollableDiv = scrollableDivRef.current;
        if (scrollableDiv) {
            scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }
    }, [messages]);

    const renderMessages = messages.map(message => {
        return (
            myNickname == message.nickname ?
                <p className={"message self"}
                   style={{"--nickname": `"${message.nickname}"`} as CSSProperties}>{message.content}</p> :
                <p className={"message received"}
                   style={{"--nickname": `"${message.nickname}"`} as CSSProperties}>{message.content}</p>
        )
    })

    const handleInputChange = (e) => {
        setText(e.target.value);
    }

    const handleSend = (e) => {
        e.preventDefault()
        const newMessage: Message = {
            nickname: myNickname,
            content: text
        }
        setMessages([...messages, newMessage]);
        setText("");
    }

    const handleEnterSend = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent the default newline behavior in the textarea
            const newMessage: Message = {
                nickname: myNickname,
                content: text
            }
            setMessages([...messages, newMessage]);
            setText("");
        }
    };

    return (
        <>
            <main>
                <div
                    className={"messages scroll-container"}
                    ref={scrollableDivRef}
                >
                    {renderMessages}
                </div>
                <div className={"controls"}>
                    <button>Go next!</button>
                    <form className={"textbox"} onSubmit={handleSend}>
                        <textarea onChange={handleInputChange} value={text} onKeyDown={handleEnterSend}/>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z"/>
                            </svg>
                        </button>
                        <input type="submit" hidden/>
                    </form>
                </div>
            </main>
        </>
    )
}