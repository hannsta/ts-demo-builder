import { useEffect, useState } from "react"
import { ThoughtSpotObject, ThoughtSpotObjectType } from "../ThoughtSpotObjectConfiguration"

interface ObjectSearchProps {
    TSURL: string,
    isWorksheet: boolean,
    setObject: (object: ThoughtSpotObject) => void
}

const ThoughtSpotObjectSearch: React.FC<ObjectSearchProps> = ({TSURL, isWorksheet, setObject}) => {
    const [search, setSearch] = useState<string>('')
    const [isLiveboard, setIsLiveboard] = useState<boolean>(true)
    const [results, setResults] = useState<ThoughtSpotObject[]>([])
    const searchObjects = async () => {
        var baseURL = TSURL.replace("#/","").replace("#","")
        baseURL += "callosum/v1/tspublic/v1/metadata/list?type="
        if (isWorksheet){
            baseURL +=  "LOGICAL_TABLE"
        }else{
            if (isLiveboard){
                baseURL += "PINBOARD_ANSWER_BOOK"
            }else{
                baseURL +=  "QUESTION_ANSWER_BOOK"
            }
        }
        fetch(baseURL+"&pattern="+encodeURIComponent(search),{
            credentials: 'include',
          }).then(response => response.json()).then((data) => {
            let objectList = data.headers;
            let newObjects: ThoughtSpotObject[] = [];
            for (let i = 0; i < objectList.length; i++){
                let object: ThoughtSpotObject = {
                    name: objectList[i].name,
                    uuid: objectList[i].id,
                    type: ThoughtSpotObjectType.LIVEBOARD
                }
                newObjects.push(object);
            }
            setResults(newObjects);
          }
        )
    }
    useEffect(() => {
        searchObjects()
    }, [])
    return (
        <div className='absolute bg-white flex flex-col w-96 border-2 p-2' style={{height:'500px'}}>
            <label className="font-bold mt-2">Type</label>
            <select
                className="border-2 border-gray-200 w-32 p-2 rounded-md bg-white"
                value={isLiveboard.toString()}
                onChange={(e) => setIsLiveboard(e.target.value === 'true')}
            >
                <option value={"true"}>Liveboard</option>
                <option value={"false"}>Answer</option>
            </select>
            <label className="font-bold mt-2" >Search</label>
            <div className='flex flex-row'>
            <input
                className="border-2 border-gray-200 w-64 h-8 rounded-md bg-white"
                type="text"
                value={search}
                onKeyUp={(e)=>{
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        searchObjects();
                    }
                }}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-8 px-4 rounded ml-2" onClick={searchObjects}>Search</button>
            </div>
            <div className='flex flex-col overflow-auto p-2 mt-4'>
            {results.map((result, index) => (
                <div className='flex flex-row' key={index}>
                    <div>{result.name}</div>
                    <button
                        className="bg-white text-blue-500 hover:text-blue-700 font-bold px-4 rounded ml-2"
                        onClick={() => setObject(result)}
                    >
                        Select
                    </button>
                </div>
            ))}
            </div>
        </div>
    )
}
export default ThoughtSpotObjectSearch;