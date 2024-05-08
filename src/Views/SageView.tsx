import { Settings } from "../Settings/SettingsConfiguration"
import { SubMenu } from "../Settings/SubMenuConfiguration"
import SageQuestionPrompt from "./SageQuestionPrompt"
import { HiXMark } from "react-icons/hi2"
import { Page } from "../App"
import { SageEmbed } from "@thoughtspot/visual-embed-sdk/react"

interface SageViewProps {
    setShowSage: (show: boolean) => void,
    setSagePrompt: (prompt: string) => void,
    selectedPage: Page | null,
    sagePrompt: string
}
const SageView = ({setShowSage, setSagePrompt, selectedPage, sagePrompt}: SageViewProps) => {
    return (
        <div className="absolute bg-white top-0 right-0 flex flex-col p-2 z-20 overflow-auto" style={{height:'calc(100vh - 4rem)',marginTop:'4rem',width:'600px',borderLeft:'1px solid #cccccc'}}>
            <div className='flex flex-col p-4'>
            <div className="flex flex-row text-2xl hover:font-bold">
                <button onClick={()=>setShowSage(false)}><HiXMark/></button>
            </div>
            <SageQuestionPrompt setSagePrompt={setSagePrompt} subMenu={selectedPage?.subMenu ? selectedPage.subMenu : null}/>
            </div>
            <SageEmbed
                preRenderId="sageEmbed"   
                dataSource={selectedPage?.subMenu ? selectedPage.subMenu.worksheet : ''}
                frameParams={{width: '100%', height: '100%'}}
                searchOptions={{
                    searchQuery: sagePrompt,
                    executeSearch: true
                }}
                />
            {/* <button onClick={()=>pinViz()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pin Viz</button> */}
        </div> 
    )
}
export default SageView;