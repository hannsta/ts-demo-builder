/*

Primary Settings Menu Component


*/


import { useState, useRef, useEffect } from "react";
import SubMenuConfiguration, { SubMenu } from "./SubMenuConfiguration";
import  StyleConfiguration, { Style } from "./StyleConfiguration";
import { convertBase64 } from "../Util/Util";
import { TSLoginContext } from "../App";
import HomePageConfig, { HomePage } from "./StandardMenus/HomePageConfig";
import MyReportsConfig, { MyReports } from "./StandardMenus/MyReportsConfig";
import FavoritesConfig, { Favorites } from "./StandardMenus/FavoritesConfig";
import { defaultSettings } from "../Util/Types";
import { KPIType } from "./KPIConfiguration";
import UserConfiguration, { User } from "./UserConfiguration";
import { AddButton, CloseButton, ImageInput, TextInput } from "./Inputs/InputMenus";
import GitSettings from "./Git/GitSettings";
import SimpleSageConfig, { SimpleSage } from "./StandardMenus/SimpleSageConfig";
import SimpleSearchConfig, { SimpleSearch } from "./StandardMenus/SimpleSearchConfig";
import SimpleFullAppConfig, { SimpleFullApp } from "./StandardMenus/SimpleFullAppConfig";

export interface Settings {
    name: string,
    TSURL: string,
    logo: string,
    homeImage: string,
    subMenus: SubMenu[],
    style: Style
    homePage: HomePage,
    myReports: MyReports,
    favorites: Favorites,
    simpleSage: SimpleSage,
    simpleSearch: SimpleSearch,
    simpleFullApp: SimpleFullApp,
    users: User[]
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
    const [homeImage, setHomeImage] = useState<string>(settings.homeImage)
    const [subMenus, setSubMenus] = useState<SubMenu[]>(settings.subMenus ? settings.subMenus : []);
    const [homePage, setHomePage] = useState<HomePage>(settings.homePage);
    const [myReports, setMyReports] = useState<MyReports>(settings.myReports);
    const [favorites, setFavorites] = useState<Favorites>(settings.favorites);
    const [simpleSage, setSimpleSage] = useState<SimpleSage>(settings.simpleSage)
    const [simpleSearch, setSimpleSearch] = useState<SimpleSearch>(settings.simpleSearch)
    const [simpleFullApp, setSimpleFullApp] = useState<SimpleFullApp>(settings.simpleFullApp)
    const [style, setStyle] = useState<Style>(settings.style)
    const [users, setUsers] = useState<User[]>(settings.users)
    const imageInput = useRef<HTMLInputElement>(null)
    
    
    /* Set default values if settings are not provided, or are out of date */
    useEffect(() => {
        if (!simpleSage || simpleSage == undefined){
            console.log("setting simple sage")
            setSimpleSage({enabled: false, worksheet: '', name: 'Natural Language', icon: 'HiSearchCircle'})
        }
        if (!simpleSearch){
            setSimpleSearch({enabled: false, worksheet: '', name: 'Search', icon: 'HiSearch'})
        }
        if (!simpleFullApp){
            setSimpleFullApp({enabled: false, name: 'Full App', icon: 'HiViewGrid'})
        }
        if (!users){
            setUsers([])
        }
    },[])
    


    /* Function to open settings file from user prompt */
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

    /* Function to restore settings to empty default */
    const clearSettings = () => {
        setSettings(defaultSettings)
    }
    const applySettings = () => {
        window.history.pushState('', 'Application', '/');
        setSettings({name, TSURL, logo, homeImage, subMenus, style, homePage, myReports, favorites, users, simpleSearch, simpleSage, simpleFullApp})
    }
    /* Function to save settings to file */
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
                <div className="flex flex-col">


                {/* Primary Buttons */}
                <div className="flex flex-row space-x-4 items-center p-8">

                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => applySettings()}
                    >
                        Apply
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() => saveSettings()}
                    >
                        Download
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                        onClick={() => document.getElementById('file')?.click()}
                    >
                        Upload
                    </button>
                    <button
                        className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
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
                        <CloseButton onClick={() => setShowSettings(false)}/>         
                    </div>
                </div>

                <div className="h-full overflow-y-auto  p-8">
                {/* Pre Built Demos */}
                <div className="flex flex-col space-y-2 pb-4 bg-gray-100 rounded-md  p-4" >
                    <div className="font-bold text-lg mt-1 mb-1">Pre Built Demos</div> 
                        <GitSettings setSettings={setSettings}/>
                </div>

                {/* High Level Configuration */}
                <div className="flex flex-col space-y-2 pb-4 bg-gray-100 rounded-md mt-8 p-4" >
                    <div className="font-bold text-lg mt-1 mb-1">Configuration</div> 
                <div className="flex flex-col my-2 bg-white p-4 rounded-md">
                    <TextInput label="Application Name" value={name} setValue={(name) => setName(name)}/>
                    <div className="flex flex-row space-x-4">
                        <TextInput label="ThoughtSpot URL" value={TSURL} setValue={(TSURL) => setTSURL(TSURL)}/>
                        <div className="flex flex-col justify-end">
                        <button className={(isLoggedIn ? "bg-green-500 " : "bg-blue-500 hover:bg-blue-700") + " h-8 text-white font-bold py-1 px-4 rounded"} 
                            onClick={() => {setLoginPopupVisible(true)}}
                            disabled={isLoggedIn}
                        >
                            {isLoggedIn ? "Logged In"  : "Test Login"}
                        </button>
                        </div>
                    </div>
                    <div className="flex flex-row space-x-4">
                    <ImageInput label="Home" value={homeImage} setValue={(homeImage) => setHomeImage(homeImage)}/>
                    <ImageInput label="Logo" value={logo} setValue={(logo) => setLogo(logo)}/>
                    </div>

                </div>
                </div>

                {/* Style Configuration */}
                <div className="flex flex-col space-y-2 pb-4 bg-gray-100 rounded-md mt-8 p-4" >
                    <div className="font-bold text-lg mt-1 mb-1">Styles</div>
                    <StyleConfiguration style={style} setStyle={setStyle}/>
                </div>

                {/* Custom Menu Configuration */}
                <div className="flex flex-col space-y-2 pb-4 bg-gray-100 rounded-md mt-8 p-4" >
                    <div className="font-bold text-lg mt-1 mb-1">Custom Menus</div>
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
                    <AddButton isPrimary={true} label="Add SubMenu" onClick={() => setSubMenus([...subMenus, {name: "", icon: "", objects: [], filters:[],worksheet: "", userPermissions:[], kpiChart:{
                        title: "", query: "",
                        color: settings.style.headerColor,
                        type: KPIType.LINE
                    } ,sage: {askSage: true, sampleQuestions: [""]}}])}/>
                </div>

                {/* Standard Menu Configuration */}
                <div className="flex flex-col space-y-2 pb-4 bg-gray-100 rounded-md mt-8 p-4" >
                    <div className="font-bold text-lg mt-1 mb-1">Standard Menus</div>
                    <FavoritesConfig favorites={favorites} setFavorites={setFavorites}/>
                    <HomePageConfig homePage={homePage} setHomePage={setHomePage}/>
                    <MyReportsConfig myReports={myReports} setMyReports={setMyReports}/>
                    <SimpleSageConfig simpleSage={simpleSage} setSimpleSage={setSimpleSage}/>
                    <SimpleSearchConfig simpleSearch={simpleSearch} setSimpleSearch={setSimpleSearch}/>
                    <SimpleFullAppConfig simpleFullApp={simpleFullApp} setSimpleFullApp={setSimpleFullApp}/>
                </div>

                {/* User Configuration */}
                <div className="flex flex-col space-y-2 pb-4 bg-gray-100 rounded-md mt-8 p-4" >
                    <div className="font-bold text-lg mt-1 mb-1">Users</div>

                    {users && users.map((user, index) => (
                        <UserConfiguration
                            key={index}
                            user={user}
                            setUser={(newUser) => {
                                const newUsers = [...users]
                                newUsers[index] = newUser
                                setUsers(newUsers)
                            }}
                            deleteUser={() => setUsers(users.filter((_, i) => i !== index))}
                        />
                    ))}
                    {users && (
                        <AddButton isPrimary={true} label="Add User" onClick={() => setUsers([...users, {name: "", userRole: {name: "", actions: []}, selfService: true}])}/>
                    )}
                </div>
                </div>
                </div>
                )}
        </TSLoginContext.Consumer>
    );
};
export default SettingsConfiguration;