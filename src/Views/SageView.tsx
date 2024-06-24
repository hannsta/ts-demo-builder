import { Settings } from "../Settings/SettingsConfiguration"
import { SubMenu } from "../Settings/SubMenuConfiguration"
import { HiXMark } from "react-icons/hi2"
import { Page } from "../App"
import { SageEmbed } from "@thoughtspot/visual-embed-sdk/react"
import { createRef, useEffect, useState } from "react"
import { CloseButton } from "../Settings/Inputs/InputMenus"

interface SageViewProps {
    setShowSage: (show: boolean) => void,
    setSagePrompt: (prompt: string) => void,
    setSageLoaded: (loaded: boolean) => void,
    sageLoaded: boolean,
    selectedPage: Page | null,
    sagePrompt: string
}
const SageView = ({setShowSage, setSagePrompt, selectedPage, sagePrompt, sageLoaded, setSageLoaded}: SageViewProps) => {
    const ref = createRef<HTMLDivElement>();
    useEffect(() => {
        if (!sageLoaded) return;
        let sageEmbed = document.getElementById('tsEmbed-pre-render-wrapper-sageEmbed');
        if (!sageEmbed) return;
        sageEmbed.style.zIndex = '9000';
    })
    return (
        <div ref={ref} className="absolute bg-white top-0 right-0 flex flex-col p-2 z-20 overflow-auto" style={{height:sageLoaded? 'calc(100vh - 4rem)' :'500px',marginTop:'4rem',width:'700px',borderLeft:'1px solid #cccccc',borderBottom:'1px solid #cccccc'}}>
            <div className='flex flex-col p-4'>
            <div className="flex flex-row text-2xl hover:font-bold">
                <div className="font-bold text-lg mt-5 mb-2">Ask Sage <span className="text-gray-400">{selectedPage?.subMenu?.name}</span></div>
                <div className="ml-auto">
                    <CloseButton onClick={()=>setShowSage(false)}/>
                </div>
            </div>

            </div>
            <SageEmbed
                preRenderId="sageEmbed"   
                onSageEmbedQuery={()=>{
                    setSageLoaded(true);
                }}
                dataSource={selectedPage?.subMenu ? selectedPage.subMenu.worksheet : ''}
                frameParams={{width: '100%', height: '100%'}}
                searchOptions={{
                    searchQuery: sagePrompt,
                    executeSearch: true
                }}
                />
            {!sageLoaded && (
            <div className="flex flex-col justify-center items-center p-4 mb-10">
                <div>Press "Enter" to ask Sage a question</div>
                {selectedPage && selectedPage.subMenu &&  selectedPage.subMenu.sage && selectedPage.subMenu?.sage.sampleQuestions.length > 0 && (  
                <div className="flex flex-col items-center justify-center">
                    <div className="font-bold text-md mb-2 mt-4">Or Try a Sample Question</div>
                    <div className="flex flex-col space-y-3">
                    {selectedPage.subMenu?.sage.sampleQuestions.map((question, index) => (
                        <div onClick={()=>setSagePrompt(question)} key={index} className="flex flex-row items-center justify-between hover:cursor-pointer hover:text-blue-400">
                            {question}
                        </div>
                    ))}
                    </div>
                    </div>
            )}
            </div>
            
                )}
            {/* <button onClick={()=>pinViz()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pin Viz</button> */}
        </div> 
    )
}
export default SageView;