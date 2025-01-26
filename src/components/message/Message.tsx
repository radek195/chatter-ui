import {CSSProperties} from "react";

interface Props {
    nickname: string,
    content: string
    type: string
    myNickname: string
}

export const Message = ({nickname, content, type, myNickname}: Props) => {
    const received = myNickname == nickname ? "self" : "received";
    return <p className={`message ${type.toLowerCase()} ${type != 'SYSTEM' ? received : ''}`}
       style={{"--nickname": `"${nickname}"`} as CSSProperties}>{content}</p>
}