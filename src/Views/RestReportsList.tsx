

  import { useContext, useEffect, useState } from "react";
import { Settings } from "../Settings/SettingsConfiguration";
  import { ThoughtSpotObject, ThoughtSpotObjectType } from "../Settings/ThoughtSpotObjectConfiguration"
import { executeTML, executeTMLInput } from "@thoughtspot/visual-embed-sdk";
import { HiPlus } from "react-icons/hi2";
import { SettingsContext, TSLoginContext } from "../App";

  interface MyReportsProps {
      settings: Settings,
      isMyReports: boolean,
      setThoughtSpotObject: (thoughtSpotObject: ThoughtSpotObject) => void
  }
  const RestReportsList: React.FC<MyReportsProps> = ({settings, isMyReports, setThoughtSpotObject}) => {
    const [liveboards, setLiveboards] = useState<ThoughtSpotObject[]>([])
    const [showNewLiveboard, setShowNewLiveboard] = useState<boolean>(false);
    const loginContext = useContext(TSLoginContext);

    const createNewLiveboard = (name: string, description: string) => {
        let liveboard: executeTMLInput = {
            create_new: true,
            metadata_tmls: ['liveboard:\n  name: '+name+'\n  description: '+description]
        }
        executeTML(liveboard).then((data)=>{
            let newId = data[0].response.header.id_guid;
            let newLiveboard: ThoughtSpotObject = {
                name: name,
                uuid: newId,
                type: ThoughtSpotObjectType.LIVEBOARD
            }
            setLiveboards([...liveboards, newLiveboard]);
            setThoughtSpotObject(newLiveboard);
            setShowNewLiveboard(false);
        });
    }
    useEffect(() => {
        //get login context
        if (!loginContext.isLoggedIn) return;
        var baseURL = settings.TSURL.replace("#/","").replace("#","")
        fetch(baseURL+"callosum/v1/tspublic/v1/metadata/list?type=PINBOARD_ANSWER_BOOK&category="+(isMyReports ? "MY" : "FAVORITE") +"&batchsize=10",{
            credentials: 'include',
          }).then(response => response.json()).then((data) => {
            let liveboardList = data.headers;
            let newLiveboards: ThoughtSpotObject[] = [];
            for (let i = 0; i < liveboardList.length; i++){
                let liveboard: ThoughtSpotObject = {
                    name: liveboardList[i].name,
                    uuid: liveboardList[i].id,
                    type: ThoughtSpotObjectType.LIVEBOARD
                }
                newLiveboards.push(liveboard);
            }
            setLiveboards(newLiveboards);
          }

        )
    },[])
        
      return (
          <div className='flex flex-col p-8 absolute w-60 space-y-4' style={{color:settings.style.subMenuTextColor, height:'calc(100% - 4rem)', background:settings.style.subMenuColor, borderRight: (settings.style.subMenuColor == '#ffffff' || settings.style.subMenuColor == settings.style.backgroundColor) ? '1px solid #cccccc' :'none' }}>
              <div className="font-bold text-xl mb-2">{isMyReports ? "My Reports" : "My Favorites"}</div>
              {liveboards.map((liveboard, index) => {
                  return (
                      <div onClick={()=>setThoughtSpotObject(liveboard)} className="flex flex-row space-x-2 hover:cursor-pointer hover:font-bold"
                      dangerouslySetInnerHTML={{__html: liveboard.name}}>
                      </div> 
                  );
              })
              }
            <button onClick={()=>setShowNewLiveboard(!showNewLiveboard)} className="font-bold flex flex-row space-x-1 mt-4 hover:cursor-pointer hover:text-blue-700 text-blue-500 items-center">
                <HiPlus/>
                <div>Create New</div>
            </button>
            {showNewLiveboard && (
                <NewLiveboardView createNewLiveboard={createNewLiveboard}/>
            )}
          </div>
      );
  }
  export default RestReportsList;

  interface NewLiveboardProps{
    createNewLiveboard: (name: string, description: string) => void
  }
  const NewLiveboardView: React.FC<NewLiveboardProps> = ({createNewLiveboard}) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    return (
        <div className="relative flex flex-col space-y-4 z-30 bg-white p-4 rounded-md shadow-2xl w-72" style={{top:'-8em', left: '14rem'}}>
            <div className="font-bold">Create New Liveboard</div>
            <input className="border-2 border-gray-200 w-full h-8 rounded-md bg-white p-2" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <textarea className="border-2 border-gray-200 w-full h-32 rounded-md bg-white p-2" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-8 px-4 rounded" onClick={()=>createNewLiveboard(name,description)}>Create</button>
        </div>
    );
  }