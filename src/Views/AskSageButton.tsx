import { useEffect, useState } from "react";
import { Settings } from "../Settings/SettingsConfiguration";
import { SubMenu } from "../Settings/SubMenuConfiguration";
import { PreRenderedSageEmbed, SageEmbed, useEmbedRef } from "@thoughtspot/visual-embed-sdk/react";
import { HostEvent } from "@thoughtspot/visual-embed-sdk";
import SageQuestionPrompt from "./SageQuestionPrompt";

interface AskSageButtonProps {
    settings: Settings,
    subMenu: SubMenu | null,
    isLoggedIn: boolean,
    setShowSage: (showSage: boolean) => void
}
const AskSageButton: React.FC<AskSageButtonProps> = ({settings, subMenu, isLoggedIn}) => {
    const [showSage, setShowSage] = useState<boolean>(false);
    const [sagePromptVisible, setSagePromptVisible] = useState<boolean>(false);
    const [sagePrompt, setSagePrompt] = useState<string>('');
    const [sageSearch, setSageSearch] = useState<string>('');

    const embedRef = useEmbedRef<typeof SageEmbed>();

    return (
        <>
            {sagePromptVisible && (
                <>
                <div onClick={()=>setSagePromptVisible(false)} className="absolute inset-0 flex flex-col items-end justify-start mt-16 z-10">
                    </div>
                    <div className="absolute top-0 right-0 bg-white w-96   mt-16  p-4 z-30"  style={{border:'1px solid #cccccc'}}>
                    <div className="flex flex-row justify-between items-center">
                        <div className="font-bold text-lg mb-1">Ask a Question</div>
                            <button onClick={()=>setSagePromptVisible(false)}>X</button>
                        </div>
                        <SageQuestionPrompt setSagePrompt={setSagePrompt} subMenu={subMenu}/>
                    </div>
                </>
            )}
            <button onClick={()=>setShowSage(true)} className="flex flex-row items-center p-2 rounded-lg hover:bg-gray-200"> Ask Sage </button>
        </>
    );
}
export default AskSageButton;
