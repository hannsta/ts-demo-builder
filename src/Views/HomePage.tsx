import { Page, SettingsContext, UserContext } from "../App";
import { ThoughtSpotObject } from "../Settings/ThoughtSpotObjectConfiguration";
import KPIChartView from "./KPIChart";

interface HomePageViewProps {
    setSagePrompt: (prompt: string) => void,
    setShowSage: (show: boolean) => void,
    setSelectedPage: (page: Page) => void,
    setThoughtSpotObject: (thoughtSpotObject: ThoughtSpotObject) => void
}
const HomePageView:React.FC<HomePageViewProps> = ({setSagePrompt, setShowSage, setSelectedPage, setThoughtSpotObject}) =>{
    return (
        <SettingsContext.Consumer> 
            {({settings}) => (
                <UserContext.Consumer>
                    {({user}) => {
                       
                    return (
                        <div className='flex flex-col items-center p-8' style={{background:settings.style.backgroundColor, height: 'calc(100vh - 4rem)', width: 'calc(100vw - 4rem)'}}>
                            <div className="flex flex-wrap justify-center gap-y-8 gap-x-8 mt-16 ">
                            {
                                settings.subMenus.map((subMenu, index) => {
                                    if (subMenu.userPermissions && subMenu.userPermissions.length > 0 && subMenu.userPermissions.find((permission) => permission.user.name === user.name && permission.denied)) {
                                        return null;
                                    }
                                    return (
                                    <KPIChartView key={index} 
                                    subMenu={subMenu} 
                                    setSagePrompt={setSagePrompt}
                                    setShowSage={setShowSage}
                                    setSelectedPage={setSelectedPage}
                                    setThoughtSpotObject={setThoughtSpotObject}
                                    />            
                                    );
                                })
                            }
                            </div>
                        </div>
                    );
                    }}
                </UserContext.Consumer>
            )}
        </SettingsContext.Consumer>
    )
}

export default HomePageView;