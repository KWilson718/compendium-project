import { useNavigate } from "react-router-dom";

export default function DoesNotExist(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    return(
        <div>
            <h1>The Page You Are Looking For Does Not Exist</h1>
            <button onClick={handleClick} >Return Home</button>
        </div>
    );
}