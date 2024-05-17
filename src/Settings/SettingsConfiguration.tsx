/*

This component is a form that allows the user to configure the settings of the application. It contains the following fields:
- Application Name: A text input field where the user can enter the name of the application.
- ThoughtSpot URL: A text input field where the user can enter the URL of the ThoughtSpot instance.
- Logo: An image upload field where the user can upload a logo for the application.
- Styles: A section where the user can configure the styles of the application, such as the background color, header color, and icon color.
- HomePage: A  menu that allows the user to enable or disable and configure the home page.
- MyReports: A menu that allows the user to enable or disable and configure the My Reports page.
- Favorites: A menu that allows the user to enable or disable and configure the Favorites page.

*/


import { useState, useRef, useEffect } from "react";
import SubMenuConfiguration, { SubMenu } from "./SubMenuConfiguration";
import  StyleConfiguration, { Style } from "./StyleConfiguration";
import { convertBase64 } from "../Util";
import { TSLoginContext } from "../App";
import HomePageConfig, { HomePage } from "./StandardMenus/HomePageConfig";
import MyReportsConfig, { MyReports } from "./StandardMenus/MyReportsConfig";
import FavoritesConfig, { Favorites } from "./StandardMenus/FavoritesConfig";
import { HiXMark } from "react-icons/hi2";
import { defaultSettings } from "../Types";

export interface Settings {
    name: string,
    TSURL: string,
    logo: string,
    subMenus: SubMenu[],
    style: Style
    homePage: HomePage,
    myReports: MyReports,
    favorites: Favorites,
}
interface SettingsProps {
    settings: Settings,
    setSettings: (settings: Settings) => void,
    setLoginPopupVisible: (visible: boolean) => void,
    setShowSettings: (show: boolean) => void
}


const SettingsConfiguration: React.FC<SettingsProps> = ({settings, setSettings, setLoginPopupVisible, setShowSettings}) => {
    const [name, setName] = useState<string>(settings.name)
    const [TSURL, setTSURL] = useState<string>(settings.TSURL)
    const [logo, setLogo] = useState<string>(settings.logo)
    const [subMenus, setSubMenus] = useState<SubMenu[]>(settings.subMenus ? settings.subMenus : []);
    const [homePage, setHomePage] = useState<HomePage>(settings.homePage);
    const [myReports, setMyReports] = useState<MyReports>(settings.myReports);
    const [favorites, setFavorites] = useState<Favorites>(settings.favorites);
    const [style, setStyle] = useState<Style>(settings.style)
    const imageInput = useRef<HTMLInputElement>(null)

    const handleFileRead = async (event:any) => {
        const file = event.target.files[0]
        const base64:any = await convertBase64(file)
        setLogo(base64);
    }

    function loadDefaults(){
        fetch('DefaultSettings.json').then(response => response.json()).then(data => {
          setSettings(data)
        })
      }
    const openSettings = (file: Blob | null) => {
        if(!file) return;
        const fileReader = new FileReader();
        fileReader.readAsText(file)
        fileReader.onload = () => {
            if (typeof fileReader.result === 'string'){
                var settings = JSON.parse(fileReader.result)
                setSettings(settings);
            }
        }   
    }
    const clearSettings = () => {
        setSettings(defaultSettings)
    }
    const saveSettings = () =>{
        var a:any = document.getElementById("saveButton");
        if(a){
            console.log("saving")
            var file = new Blob([JSON.stringify(settings)], {type: 'json'});
            a.href = URL.createObjectURL(file);
            a.download = settings.name;
            a.click()
        }
    }
    return (
        <TSLoginContext.Consumer>
            {({isLoggedIn}) => (
                <div className="flex flex-col p-8">


                <div className="flex flex-row space-x-4 items-center mb-8">
                <div className="font-bold text-2xl mb-2">Settings</div>

                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>  setSettings({name, TSURL, logo, subMenus, style, homePage, myReports, favorites})}
                    >
                        Apply
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => saveSettings()}
                    >
                        Download
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => document.getElementById('file')?.click()}
                    >
                        Upload
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => clearSettings()}
                    >
                        Clear
                    </button>
                    <a id="saveButton"></a>
                    <input type="file" name="file" 
                                        className="upload-file" 
                                        id="file"
                                        onChange={(e) => openSettings(e.target.files ? e.target.files[0] : null)}
                                        style={{display:'none'}} 
                                        required/>
                    <div className="flex w-full justify-end">         
                                                            <button
                        className="text-blue-600 font-bold text-2xl py-4 px-4 rounded"
                        onClick={() => setShowSettings(false)}
                    >
                         <HiXMark/>
                    </button>
                    </div>
                </div>
                <div className="flex flex-col my-2">
                    <label className="font-bold">Application Name</label>
                    <input
                        className="border-2 border-gray-200 text-xl p-1 rounded-lg"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="flex flex-row space-x-4">
                        <div className="flex flex-col">
                        <label className="font-bold mt-2">ThoughtSpot URL</label>
                        <input
                            className="border-2 border-gray-200 text-xl p-1 rounded-lg w-96"
                            type="text"
                            value={TSURL}
                            onChange={(e) => setTSURL(e.target.value)}
                        />
                        </div>
                        <div className="flex flex-col justify-end">
                        <button className={(isLoggedIn ? "bg-green-500 " : "bg-blue-500 hover:bg-blue-700") + " h-10 text-white font-bold py-2 px-4 rounded"} 
                            onClick={() => {setLoginPopupVisible(true)}}
                            disabled={isLoggedIn}
                        >
                            {isLoggedIn ? "Logged In"  : "Test Login"}
                        </button>
                        </div>
                    </div>
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
                <div className="font-bold text-lg mt-4 mb-2">Custom Menus</div>
                <div className="flex flex-col space-y-2 pb-4">
                {subMenus && subMenus.map((subMenu, index) => (
                    <SubMenuConfiguration
                        key={index}
                        subMenu={subMenu}
                        TSURL={TSURL}
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
                    onClick={() => setSubMenus([...subMenus, {name: "", icon: "", objects: [], filters:[],worksheet: "", kpiChart:{
                        title: "", query: "",
                        color: settings.style.headerColor
                    } ,sage: {askSage: true, sampleQuestions: [""]}}])}
                >
                    Add SubMenu
                </button>
                <div className="font-bold text-lg mt-4 mb-2">Standard Menus</div>
                <div className="mb-2">
                <FavoritesConfig favorites={favorites} setFavorites={setFavorites}/>
                </div>
                <div className="mb-2">
                <HomePageConfig homePage={homePage} setHomePage={setHomePage}/>
                </div>
                <div className="mb-2">
                <MyReportsConfig myReports={myReports} setMyReports={setMyReports}/>
                </div>
                </div>
            )}
        </TSLoginContext.Consumer>
    );
};
export default SettingsConfiguration;