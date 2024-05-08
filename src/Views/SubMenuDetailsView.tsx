import { useContext, useEffect, useState } from "react";
import { SubMenu } from "../Settings/SubMenuConfiguration";
import { SettingsContext } from "../App";
import { createClientWithoutAuth } from "../Util";

interface SubMenuDetailsViewProps {
    subMenu: SubMenu,
}

const SubMenuDetailsView: React.FC<SubMenuDetailsViewProps> = ({subMenu}) => {
    const [worksheetTML, setWorksheetTML] = useState<any>(null)
    const settingsContext = useContext(SettingsContext);

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
    }, [])
    return(
        <div className="shadow-md hover:shadow-lg p-6 rounded-md flex flex-col space-x-2 ">
            {worksheetTML && (
                <>
                    <div className='text-2xl font-bold'>{worksheetTML.worksheet.name}</div>  
                </>
            )}

        </div>
    )
}
export default SubMenuDetailsView;
