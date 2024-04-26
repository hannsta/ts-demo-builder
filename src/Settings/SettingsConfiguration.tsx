import { useState, useRef } from "react";
import SubMenuConfiguration, { SubMenu } from "./SubMenuConfiguration";
import  StyleConfiguration, { Style } from "./StyleConfiguration";
import { convertBase64 } from "../Util";

export interface Settings {
    name: string,
    TSURL: string,
    logo: string,
    subMenus: SubMenu[],
    style: Style

}
interface SettingsProps {
    settings: Settings,
    setSettings: (settings: Settings) => void
}


const SettingsConfiguration: React.FC<SettingsProps> = ({settings, setSettings}) => {
    const [name, setName] = useState<string>(settings.name)
    const [TSURL, setTSURL] = useState<string>(settings.TSURL)
    const [logo, setLogo] = useState<string>(settings.logo)
    const [subMenus, setSubMenus] = useState<SubMenu[]>(settings.subMenus ? settings.subMenus : []);
    const [style, setStyle] = useState<Style>(settings.style)
    const imageInput = useRef<HTMLInputElement>(null)


    const handleFileRead = async (event:any) => {
        const file = event.target.files[0]
        const base64:any = await convertBase64(file)
        setLogo(base64);
    }


    return (
        <div className="flex flex-col p-8">
                    <div className="font-bold text-lg mb-2">Settings</div>

        <div className="flex flex-row justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
                onClick={() => setSettings({name, TSURL, logo, subMenus, style})}
            >
                Save
            </button>
        </div>
        <div className="flex flex-col my-2">
            <label className="font-bold">Application Name</label>
            <input
                className="border-2 border-gray-200 text-xl p-1 rounded-lg"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label className="font-bold mt-2">ThoughtSpot URL</label>
            <input
                className="border-2 border-gray-200 text-xl p-1 rounded-lg"
                type="text"
                value={TSURL}
                onChange={(e) => setTSURL(e.target.value)}
            />
            <label className="font-bold mt-2">Logo</label>
            <img src={logo} alt="logo" onClick={()=>imageInput.current?.click()} className="w-24 h-24"/>
            <input ref={imageInput} type="file" name="file" 
                                  className="upload-file" 
                                  id="file"
                                  onChange={handleFileRead}
                                  style={{display:'none'}}
                                  formEncType="multipart/form-data" 
                                  required/>

        </div>
        <div className="font-bold text-lg mb-2 mt-4">Styles</div>
        <StyleConfiguration style={style} setStyle={setStyle}/>
        <div className="font-bold text-lg mt-4 mb-2">Menus</div>
        <div className="flex flex-col space-y-2 pb-4">
        {subMenus && subMenus.map((subMenu, index) => (
            <SubMenuConfiguration
                key={index}
                subMenu={subMenu}
                setSubMenu={(newSubMenu) => {
                    const newSubMenus = [...subMenus]
                    newSubMenus[index] = newSubMenu
                    setSubMenus(newSubMenus)
                }}
                deleteSubMenu={() => setSubMenus(subMenus.filter((_, i) => i !== index))}
            />
        ))}
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSubMenus([...subMenus, {name: "", icon: "", objects: [], worksheet: "", sage: {askSage: true, sampleQuestions: [""]}}])}
        >
            Add SubMenu
        </button>

        </div>
    );
};
export default SettingsConfiguration;