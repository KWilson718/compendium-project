export default function StandardButton1 ({onClick, className='', children, disabled=false}) {
    return (
        <button 
            className={`m-2 p-2 bg-gray-700 rounded hover:bg-gray-500 transition-colors duration-200 ${className}`} 
            onClick={onClick} 
            disabled={disabled}
        >
            {children}
        </button>
    );
}