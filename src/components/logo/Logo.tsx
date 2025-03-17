import "./Logo.css"
import {useNavigate} from "react-router-dom";

export const Logo = () => {
    const navigate = useNavigate();

    return (
        <>
          <h1 className={"logo"} onClick={() => navigate("/")}>CHATTER</h1>
        </>
    )
}