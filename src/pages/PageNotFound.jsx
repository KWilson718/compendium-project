import { useNavigate } from "react-router-dom";

import StandardButton1 from '../components/StdButon1.jsx';

// Basic 404 Page Component with button to return back to home
export default function DoesNotExist(){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen max-h-100 bg-gray-900 text-white" >
            <h1>The Page You Are Looking For Does Not Exist</h1>
            <StandardButton1 onClick={handleClick} >Return Home</StandardButton1>
        </div>
    );
}