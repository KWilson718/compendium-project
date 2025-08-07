import { useNavigate } from "react-router-dom";

export default function DoesNotExist(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen max-h-100 bg-gray-900 text-white" >
            <h1>The Page You Are Looking For Does Not Exist</h1>
            <button onClick={handleClick} >Return Home</button>
        </div>
    );
}