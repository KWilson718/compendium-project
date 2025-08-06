export default function StandardButton1 ({onClick, className='', children, disabled=false}) {
    return (
        <button 
            className={`m-2 p-2 transition-colors duration-200 rounded ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-500'} ${className}`} 
            onClick={onClick} 
            disabled={disabled}
        >
            {children}
        </button>
    );
}