import DataElementCard from "./DataElementCard";

export default function DataElementRow({dataObject, dataIndexArray}) {
    const listItems = dataIndexArray.map(objectID => 
        <DataElementCard key={objectID} >{JSON.stringify(dataObject[objectID])}</DataElementCard>
    );

    return (
        <div>
            {listItems}
        </div>
    );
}