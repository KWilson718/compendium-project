export default function DataElementCard ({ className='', children, isEditable=false }) {
    return (
        <div  className={`bg-gray-800 px-4 py-2 m-2 rounded shadow-md flex flex-row ${className} `}>
            <h1 className="text-3xl font-semibold mx-4" >{children}</h1>
            {isEditable && <button className="text-3xl font-bold mx-4" >Edit</button>}
        </div>
    );
};