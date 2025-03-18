import './Initial.css'
import {Dispatch, FormEvent, SetStateAction, useState} from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    setNickname: Dispatch<SetStateAction<string>>
}

export const Initial = ({setNickname}: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };

    const handleButtonClick = async (e: FormEvent) => {
        e.preventDefault();
        if (inputValue.length < 3) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000)
            return;
        }

        setNickname(inputValue);
        navigate("/chat")
    };

    const onFocus = () => {
        setError(false);
    }

    return (
        <form className="initial">
            <input
                type="text"
                className={!error ? "input" : "input invalid"}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={onFocus}
                placeholder="Nickname"
            />
            <p className={!error ? "error" : "error visible"}>Nickname too short!</p>
            <button
                className="button"
                onClick={handleButtonClick}
            >
                Set nickname
            </button>
        </form>
    )
}