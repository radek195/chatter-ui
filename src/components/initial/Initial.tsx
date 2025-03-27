import './Initial.css'
import {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {useNavigate} from "react-router-dom";
import {postUser} from "../../api";
import axios from "axios";

interface Props {
    setUserId: Dispatch<SetStateAction<number | undefined>>
}

export const Initial = ({setUserId}: Props) => {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState(false)
    const [age, setAge] = useState<number>(0);
    const [gender, setGender] = useState<string>("");
    const [responseError, setResponseError] = useState<string[]>([]);

    const navigate = useNavigate();

    const handleNicknameChange = (e: FormEvent<HTMLInputElement>) => {
        setNickname(e.currentTarget.value);
    };

    const onFocus = () => {
        setError(false);
    }

    const handleAgeChange = (e: FormEvent<HTMLInputElement>) => {
        setAge(parseInt(e.currentTarget.value));
    }

    const onOptionChanged = (e: FormEvent<HTMLInputElement>) => {
        setGender(e.currentTarget.value);
    }

    const handleButtonClick = async (e: FormEvent) => {
        e.preventDefault();
        if (nickname.length < 3) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000)
            return;
        }
        const request = {
            nickname,
            gender,
            age
        }

        try {
            const response = await postUser(request)
            setUserId(response.data)
            navigate("/chat")
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setResponseError(e.response?.data.errors)
                setTimeout(() => {
                    setResponseError([]);
                }, 3000)
            }
        }


    };

    return (
        <form className="initial">
            <div className={"relative"}>
                <input
                    type="text"
                    className={!error ? "nickname" : "nickname invalid"}
                    value={nickname}
                    onChange={handleNicknameChange}
                    onFocus={onFocus}
                    placeholder="Nickname"
                />
                <p className={!error ? "error" : "error visible"}>Nickname too short!</p>
            </div>
            <div className={"details"}>
                <input
                    type="number"
                    name="age"
                    className={"age details-item"}
                    placeholder={"Age"}
                    onChange={handleAgeChange}
                />
                <div className={"details-item"}>
                    <label>
                        <input
                            type="radio"
                            id={"male"}
                            name={"gender"}
                            value={"MALE"}
                            checked={gender === "MALE"}
                            onChange={onOptionChanged}
                        />
                        <span>Male</span>
                    </label>
                </div>
                <div className={"details-item"}>
                    <label>
                        <input type="radio"
                               id={"female"}
                               name={"gender"}
                               value={"FEMALE"}
                               checked={gender === "FEMALE"}
                               onChange={onOptionChanged}
                        />
                        <span>Female</span>
                    </label>
                </div>

                <div className={"details-item"}>
                    <label>
                        <input type="radio"
                               id={"other"}
                               name={"gender"}
                               value={"OTHER"}
                               checked={gender === "OTHER"}
                               onChange={onOptionChanged}
                        />
                        <span>Other</span>
                    </label>
                </div>
            </div>
            <div className={"relative"}>
                <button
                    className="button"
                    onClick={handleButtonClick}
                >
                    Confirm
                </button>
                {responseError.map(item => <p className={!responseError ? "error" : "error visible"}>{item}</p>)}
            </div>
        </form>
    )
}