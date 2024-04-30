import { SageEmbed } from "@thoughtspot/visual-embed-sdk"
import { Settings } from "../Settings/SettingsConfiguration"
import { SubMenu } from "../Settings/SubMenuConfiguration"
import SageQuestionPrompt from "./SageQuestionPrompt"

interface SageViewProps {
    settings: Settings,
    subMenu: SubMenu | null,
}
const SageView = ({settings, subMenu}: SageViewProps) => {

    
    return (
        <div className="absolute bg-white top-0 right-0 flex flex-col p-2 z-20 overflow-auto" style={{height:'calc(100vh - 4rem)',marginTop:'4rem',width:'600px',borderLeft:'1px solid #cccccc'}}>
            {/* close button */}
            {/* <div className="flex flex-row ">
                <button onClick={()=>setShowSage(false)}>X</button>
            </div>
            <SageQuestionPrompt setSagePrompt={setSagePrompt} subMenu={selectedPage?.subMenu ? selectedPage.subMenu : null}/>
            <SageEmbed
                preRenderId="sageEmbed"   
                dataSource={selectedPage?.subMenu ? selectedPage.subMenu.worksheet : ''}
                frameParams={{width: '100%', height: '100%'}}
                searchOptions={{
                    searchQuery: sagePrompt,
                    executeSearch: true
                }}
                
                /> */}
        </div>  
    )
}