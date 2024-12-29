import './Initial.css'
import {useState} from "react";

export const Initial = ({setNickname}) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        setNickname(inputValue);
    };

    return (
        <div className="initial">
            <input
                type="text"
                className="input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Nickname"
            />
            <button
                className="button"
                onClick={handleButtonClick}
            >
                Set nickname
            </button>
        </div>
    )
}