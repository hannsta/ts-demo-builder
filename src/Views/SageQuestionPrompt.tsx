import { SubMenu } from "../Settings/SubMenuConfiguration";

interface SageQuestionPromptProps {
    setSagePrompt: (prompt: string) => void,
    subMenu: SubMenu | null

}

const SageQuestionPrompt: React.FC<SageQuestionPromptProps> = ({setSagePrompt, subMenu}) => {
    return (
        <div className="flex flex-col">
            {subMenu &&  subMenu.sage && subMenu?.sage.sampleQuestions.length > 0 && (  
                <>
                    <div className="font-bold text-lg mt-5 mb-4">Sample Questions</div>
                    <div className="flex flex-col space-y-3">
                    {subMenu?.sage.sampleQuestions.map((question, index) => (
                        <div onClick={()=>setSagePrompt(question)} key={index} className="flex flex-row items-center justify-between hover:cursor-pointer hover:text-blue-400">
                            {question}
                        </div>
                    ))}
                    </div>
                    </>
            )}
        </div>
    );
}
export default SageQuestionPrompt;