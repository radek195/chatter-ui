import "./Chat.css"
import {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react";
import {getChatroom} from "../../api";
import {Client} from "@stomp/stompjs";
import {Message} from "../message/Message.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {StompSubscription} from "@stomp/stompjs/src/stomp-subscription.ts";

interface Message {
    content: string;
    senderNickname: string;
    type: string;
    myNickname?: string;
}

interface Props {
    myNickname: string
}

let stompClient: Client;
export const Chat = ({myNickname}: Props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    const subscriptionRef = useRef<StompSubscription | null>(null);
    const scrollableDivRef = useRef<HTMLDivElement | null>(null);

    const connect = () => {
        stompClient = new Client({
            brokerURL: `${import.meta.env.VITE_WSS_BASE_URL}/websocket`
        });
        stompClient.onConnect = () => {
            subscribeToNewRoom()
        };
        stompClient.activate();
    }

    const subscribeToNewRoom = async () => {
        setMessages([]);
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
        }
        const response = await getChatroom()
        const newRoom = response.data.uuid;
        setRoom(newRoom);
        subscriptionRef.current = stompClient?.subscribe(`/topic/message/room/${newRoom}`, response => {
            const json = JSON.parse(response.body);
            const message: Message = {
                content: json.content,
                senderNickname: json.senderNickname,
                type: json.type
            }
            setMessages((prevMessages) => [...prevMessages, message]);
        }, {nickname: myNickname});
    }

    useEffect(() => {
        const handleBeforeUnload = () => {
            subscriptionRef.current?.unsubscribe();
            if (stompClient.connected) {
                stompClient.deactivate();
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        connect()
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        }
    }, []);

    useEffect(() => {
        const scrollableDiv = scrollableDivRef.current;
        if (scrollableDiv) {
            scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }
    }, [messages]);

    const renderMessages = messages?.map(message => {
        return <Message nickname={message.senderNickname} content={message.content} type={message.type} myNickname={myNickname}/>;
    })

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const sendMessage = () => {
        const textToSend = text.trim()
        if (textToSend === "") {
            setText("");
            return;
        }
        stompClient?.publish({
            destination: `/app/message/${room}`,
            body: JSON.stringify(
                {'content': text, 'senderNickname': myNickname, 'type': 'USER'})
        })
        setText("");
    }

    const handleSend = (e: FormEvent) => {
        e.preventDefault()
        sendMessage()
    }

    const handleEnterSend = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage()
        }
    };

    const findNext = () => {
        subscribeToNewRoom()
    }

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
                    <button onClick={findNext}>Go next!</button>
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