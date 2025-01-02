import './Initial.css'
import {useState} from "react";

export const Initial = ({setNickname}) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false)

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
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
        <div className="initial">
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
        </div>
    )
}