import { useState } from "react";
import { Settings } from "../Settings/SettingsConfiguration";
import { SubMenu } from "../Settings/SubMenuConfiguration";
import { SageEmbed } from "@thoughtspot/visual-embed-sdk/react";

interface AskSageProps {
    settings: Settings,
    subMenu: SubMenu | null,
}
const AskSage: React.FC<AskSageProps> = ({settings, subMenu}) => {
    const [showSage, setShowSage] = useState<boolean>(false);
    const [sagePromptVisible, setSagePromptVisible] = useState<boolean>(false);
    const [sagePrompt, setSagePrompt] = useState<string>('');
    const [sageSearch, setSageSearch] = useState<string>('');
    const triggerSageSearch = () => {
        setShowSage(true);
    }
    return (
        <>
            {sagePromptVisible && (
                <>
                <div onClick={()=>setSagePromptVisible(false)} className="absolute inset-0 flex flex-col items-end justify-start mt-16 z-10">
                    </div>
                    <div className="absolute top-0 right-0 bg-white w-96   mt-16  p-4 z-30"  style={{border:'1px solid #cccccc'}}>
                        <div className="flex flex-row justify-between items-center">
                            <div className="font-bold text-lg mb-1">Ask a Question {subMenu ? "about " + subMenu.name : ""}</div>
                            <button onClick={()=>setSagePromptVisible(false)}>X</button>
                        </div>
                        <div className="flex w-full h-12 bg-white border-slate-400 border rounded-2xl my-2 p-2"> 
                            <input onKeyUp={(e)=>{
                                if (e.key === 'Enter' || e.keyCode === 13) {
                                    triggerSageSearch();
                                }
                            }} onChange={(e)=>setSageSearch(e.target.value)} value={sageSearch} placeholder="Ask AI a Data Question" 
                            className="rounded-2xl w-full pl-2 bg-white border-none outline-none"></input>
                            <div onClick={triggerSageSearch} className="ml-auto text-white  flex items-center bg-blue-400 hover:bg-blue-300 rounded-lg px-4 py-2 border-none">
                                GO!
                            </div>
                        </div>
                            
                        {subMenu &&  subMenu.sage && subMenu?.sage.sampleQuestions.length > 0 && (  
                            <>
                                <div className="font-bold text-lg mt-5 mb-1">Sample Questions</div>
                                {subMenu?.sage.sampleQuestions.map((question, index) => (
                                    <div key={index} className="flex flex-row items-center justify-between p-2">
                                        <div>{question}</div>
                                        <button onClick={()=>setSagePrompt(question)}>Ask</button>
                                    </div>
                                ))}
                                </>
                        )}
                    </div>
                </>
            )}
            {showSage && (
                <div className="absolute bg-white top-0 right-0 flex flex-col p-2 z-20 overflow-auto" style={{height:'calc(100vh - 4rem)',marginTop:'4rem',width:'600px',borderLeft:'1px solid #cccccc'}}>
                    {/* close button */}
                    <div className="flex flex-row ">
                        <button onClick={()=>setShowSage(false)}>X</button>
                    </div>
                    <SageEmbed
                        preRenderId="sageEmbed"
                        
                        dataSource={subMenu?.worksheet}
                        frameParams={{width: '100%', height: '100%'}}
                        searchOptions={{
                            searchQuery: sagePrompt,
                            executeSearch: sagePrompt!='' ? true : false
                          }}
                        customizations={{
                            style: {
                            customCSS: {
                                variables: {
                                "--ts-var-root-background": "#ffffff",
                                "--ts-var-viz-border-radius": "25px",
                                },
                                rules_UNSTABLE: {
                                    '.eureka-search-bar-module__sageEmbedSearchBarWrapper':{
                                        'display': 'none !important'
                                    },
                                    '[data-testid="pinboard-header"]': {
                                        'display': 'none !important'
                                    },
                                    '.ReactModalPortal .ReactModal__Overlay':{
                                        'background-color': '#ffffff00 !important'
                                    },
                                    '.answer-module__searchCurtain':{
                                        'background-color': '#ffffff00 !important'
                                    },
                                    '[data-testid="eureka-ai-answer-header"]':{
                                        'display': 'none !important'
                                    },
                                    '[data-testid="answer-content-loading-indicator"], .eureka-ai-answer-module__aiExpandedAnswerWrapper': {
                                        'min-height':'400px',
                                        'height':'400px'
                                    },
                                    '.eureka-ai-answer-module__aiAnswerFooter':{
                                        'margin-top':'170px'
                                    },
                                    '.eureka-ai-answer-title-description-module__aiAnswerSummary':{
                                        'padding' :'0 1.4285714286rem 0 !important'
                                    },
                                    '.eureka-ai-answer-module__aiAnswerContainer':{
                                        'margin':'0 1.7142857143rem !important'
                                    }
                                }
                                
                            }
                            }
                        }}
                        />
                </div>                
        )}
                
            <button onClick={()=>setSagePromptVisible(!sagePromptVisible)} className="flex flex-row items-center p-2 rounded-lg hover:bg-gray-200"> Ask Sage </button>
        </>
    );
}
export default AskSage;
