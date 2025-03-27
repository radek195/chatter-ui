import "./Preferences.css"
import {SlArrowDown} from "react-icons/sl";
import {useRef, useState} from "react";
import {putPreferences} from "../../api";
import {Dots} from "./dots/Dots.tsx";

interface Props {
    userId: number | undefined
}

export const Preferences = ({userId}: Props) => {
    const [minAge, setMinAge] = useState<number>(16);
    const [maxAge, setMaxAge] = useState<number>(80);

    const preferenceContainer = useRef<HTMLDivElement>(null);
    const [dropped, setDropped] = useState<boolean>(true);
    const [animate, setAnimate] = useState<boolean>(false);

    const handleMinAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinAge(parseInt(e.target.value));
    }

    const handleMaxAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxAge(parseInt(e.target.value));
    }

    const handleDropdown = () => {
        setDropped(!dropped);
    }

    const handleButtonClick = async () => {
        setAnimate(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await putPreferences(userId, {
                minAge,
                maxAge,
            });
            setAnimate(false)
            setDropped(true);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className={"dropdown"}>
                <div className={"preference-dropdown"} onClick={handleDropdown}>
                    <SlArrowDown size={"20px"} className={dropped ? "preference-icon" : ""}/>
                    <p className={"dropdown-title"}>Preferences</p>
                </div>
                <div className={dropped ? 'dropped' : ''}>
                    <div className={'preferences'} ref={preferenceContainer}>
                        <div className={"preference"}>
                            <p>Min age: {minAge}</p>
                            <input type="range" min={16} max={80} onChange={handleMinAgeChange}/>
                        </div>
                        <div className={"preference"}>
                            <p>Max age: {maxAge}</p>
                            <input type="range" min={16} max={80} onChange={handleMaxAgeChange}/>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleButtonClick}>{animate ? <Dots/> : 'Set'}</button>
                    </div>
                </div>

            </div>
        </>
    );
}