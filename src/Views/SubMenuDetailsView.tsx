import { useContext, useEffect, useState } from "react";
import { SubMenu } from "../Settings/SubMenuConfiguration";
import { SettingsContext } from "../App";
import { createClientWithoutAuth } from "../Util/Util";

interface SubMenuDetailsViewProps {
    subMenu: SubMenu,
}
enum SearchType {
    SAGE,
    SEARCH,
    GUIDED
}
const SubMenuDetailsView: React.FC<SubMenuDetailsViewProps> = ({subMenu}) => {
    const [worksheetTML, setWorksheetTML] = useState<any>(null)
    const settingsContext = useContext(SettingsContext);
    const [selectedSearchType, setSelectedSearchType] = useState<SearchType>(SearchType.SEARCH);
    useEffect(() => {
        const client = createClientWithoutAuth(settingsContext.settings.TSURL);
        client.exportMetadataTML({
            metadata: [
                {
                    type: 'LOGICAL_TABLE',
                    identifier: subMenu.worksheet
                }
            ]
        }).then((response) => {
            var tml = JSON.parse(response[0].edoc)
            console.log(tml)
            setWorksheetTML(tml);
        })
    }, [subMenu])
    return(
        <div className="shadow-md hover:shadow-lg p-6 rounded-md flex flex-col space-x-2 mt-8">
            {worksheetTML && (
                <>
                    <div className='text-lg font-bold'>{worksheetTML.worksheet ? worksheetTML.worksheet.name : "Invalid Worksheet"}</div>  
                </>
            )}

            <div className="flex flex-row space-x-4 mt-2">
                <button onClick={()=>setSelectedSearchType(SearchType.SAGE)}
                className="bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded">Sage</button>
                <button onClick={()=>setSelectedSearchType(SearchType.SEARCH)}
                className="bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded">Search</button>
                <button onClick={()=>setSelectedSearchType(SearchType.GUIDED)}
                className="bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded">Guided</button>

                
            </div>

        </div>
    )
}
export default SubMenuDetailsView;
