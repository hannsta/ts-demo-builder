import { useEffect, useState } from "react"
import { ThoughtSpotObject, ThoughtSpotObjectType } from "../ThoughtSpotObjectConfiguration"
import { CloseButton } from "./InputMenus"

// This component is used to search for ThoughtSpot objects
// It does this by making the metadata/list API call to ThoughtSpot
// The user can search for either Liveboards, Answers, or Worksheets


interface ObjectSearchProps {
    TSURL: string,
    type: ThoughtSpotObjectType,
    setObject: (object: ThoughtSpotObject) => void,
    closePopup: () => void
}

const ThoughtSpotObjectSearch: React.FC<ObjectSearchProps> = ({TSURL, type, setObject, closePopup}) => {
    const [search, setSearch] = useState<string>('')
    const [isLiveboard, setIsLiveboard] = useState<boolean>(true)
    const [results, setResults] = useState<ThoughtSpotObject[]>([])
    const searchObjects = async () => {
        var baseURL = TSURL.replace("#/","").replace("#","")
        baseURL += "callosum/v1/tspublic/v1/metadata/list?type="
        if (type == ThoughtSpotObjectType.WORKSHEET){
            baseURL +=  "LOGICAL_TABLE"
        }else{
            if (type == ThoughtSpotObjectType.LIVEBOARD){
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
                    type: type
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
        <div className='relative'>
        <div className='absolute shadow-2xl bg-white flex flex-col w-96 border-2 p-2' style={{height:'500px',right:'75px'}}>
            <div className='flex flex-row justify-between'>
            <div className='font-bold mt-2 text-lg mb-2'>Search for {type}</div>
            <CloseButton onClick={closePopup}/>
            </div>


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
        </div>
    )
}
export default ThoughtSpotObjectSearch;