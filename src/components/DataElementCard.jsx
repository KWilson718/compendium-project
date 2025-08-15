export default function DataElementCard ({ className='', children }) {
    return (
        <div  className={`bg-gray-800 px-4 py-2 m-2 rounded shadow-md ${className} `}>
            <h1 className="text-3xl font-semibold" >{children}</h1>
        </div>
    );
};