import DataElementCard from "./DataElementCard";

export default function DataElementRow({dataObject, dataIndexArray}) {
    const listItems = dataIndexArray.map(objectID => 
        <DataElementCard></DataElementCard>
    );

    return (
        <div>

        </div>
    );
}