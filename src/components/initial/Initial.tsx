import './Initial.css'
import {Dispatch, FormEvent, SetStateAction, useState} from "react";

interface Props {
    setNickname: Dispatch<SetStateAction<string>>
}

export const Initial = ({setNickname}: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false)

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };

    const handleButtonClick = async () => {
        if (inputValue.length < 3) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 2000)
            return;
        }

        setNickname(inputValue);
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
            {error && <p className="error">Nickname too short!</p>}
            <button
                className="button"
                onClick={handleButtonClick}
            >
                Set nickname
            </button>
        </form>
    )
}