import { useState } from "react";
import { SubMenu } from "../Settings/SubMenuConfiguration";

interface SageQuestionPromptProps {
    setSagePrompt: (prompt: string) => void,
    subMenu: SubMenu | null

}

const SageQuestionPrompt: React.FC<SageQuestionPromptProps> = ({setSagePrompt, subMenu}) => {
    const [sageSearch, setSageSearch] = useState<string>('');
    const triggerSageSearch = () => {
        setSagePrompt(sageSearch);
    }
    return (
        <div className="flex flex-col">
            {/* <div className="flex w-full h-12 bg-white border-slate-400 border rounded-2xl my-2 p-2"> 
                <input onKeyUp={(e)=>{
                    if (e.key === 'Enter' || e.keyCode === 13) {
                        triggerSageSearch();
                    }
                }} onChange={(e)=>setSageSearch(e.target.value)} value={sageSearch} placeholder="Ask AI a Data Question" 
                className="rounded-2xl w-full pl-2 bg-white border-none outline-none"></input>
                <div onClick={triggerSageSearch} className="ml-auto text-white  flex items-center bg-blue-400 hover:bg-blue-300 rounded-lg px-4 py-2 border-none">
                    GO!
                </div>
            </div> */}
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
    );
}
export default SageQuestionPrompt;