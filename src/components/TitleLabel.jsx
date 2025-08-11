export default function TitleLabel({name, onClick, className='', disabled=false}){
    return (
        <button
            className={`m-2 p-2${disabled ? 'bg-gray-400 cursor-not-allowed' : ''} ${className}`} 
            onClick={onClick} 
            disabled={disabled}
        >
            <h1 className="text-4xl font-black" >{name}</h1>
        </button>
    );
}