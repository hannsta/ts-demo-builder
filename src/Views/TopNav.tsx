import { Page, PageType, SettingsContext } from "../App"
import SettingsConfiguration from "../Settings/SettingsConfiguration"
import { User } from "../Settings/UserConfiguration"
import UserProfile from "./UserProfile"

interface TopNavProps {
    user: User,
    setUser: (user: User) => void,
    showSettings: boolean,
    setShowSettings: (show: boolean) => void,
    setSelectedPage: (page: Page) => void,
    setSettings: (settings: any) => void,
    setLoginPopupVisible: (visible: boolean) => void,
    setShowSage: (show: boolean) => void
}
const TopNav: React.FC<TopNavProps> = ({user, setUser, showSettings, setShowSettings, setShowSage, setSettings, setLoginPopupVisible, setSelectedPage}) => {
    
    return (
        <SettingsContext.Consumer>
            {({settings}) => (
                <header className="fixed z-20 flex w-full h-16" style={{backgroundColor:settings.style.headerColor, borderBottom: (settings.style.headerColor == "#ffffff") ? '1px solid #cccccc' : "none"}}>
                    <div className="flex flex-row justify-between w-full px-4 py-2 h-16">
                    <div className="flex flex-row space-x-4">
                        <img src={settings.logo} alt="logo" onClick={()=>setSelectedPage({
                            type: PageType.HOMEIMAGE
                        })} className=" hover:cursor-pointer"/>
                        <div className="text-2xl font-bold flex items-center" style={{color:settings.style.headerTextColor}}>
                        {settings.style.showHeaderName ? settings.name : ''}
                        </div>
                    </div>
                    <div className='flex flex-row space-x-4'>

                        <button onClick={()=>setShowSage(true)} style={{color:settings.style.headerTextColor}} className="flex flex-row items-center p-2 rounded-lg hover:bg-gray-200"> Ask Sage </button>
                        <UserProfile setUser={setUser} user={user}/>
                    </div>
                    {showSettings && (
                        <>
                            <div className="absolute bg-white right-0 flex p-2 z-70 overflow-auto" style={{top:'4rem',height:'calc(100vh - 4rem)',borderLeft:'1px solid #cccccc'}}>
                            <SettingsConfiguration 
                            key={JSON.stringify(settings)}
                            setShowSettings={setShowSettings}
                            settings={settings} setSettings={setSettings} setLoginPopupVisible={setLoginPopupVisible} />
                            </div>
                        </>
                        )}
                    </div>
                </header>
            )}
        </SettingsContext.Consumer>
    )
}
export default TopNav;