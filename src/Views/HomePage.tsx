import { Page, SettingsContext, UserContext } from "../App";
import { ThoughtSpotObject } from "../Settings/ThoughtSpotObjectConfiguration";
import DataTable from "./DataTable";
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
                        <div className='flex flex-col items-center p-8' style={{width:'calc(100vw - 4rem)', height: 'calc(100vh - 4rem)', background:settings.style.backgroundColor, overflow:'auto'}}>
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
                            <div className="flex flex-col justify-center mt-8 w-full">
                            {
                                settings.subMenus.map((subMenu, index) => {
                                    if (subMenu.userPermissions && subMenu.userPermissions.length > 0 && subMenu.userPermissions.find((permission) => permission.user.name === user.name && permission.denied)) {
                                        return null;
                                    }
                                    return (
                                    <DataTable key={index} 
                                    subMenu={subMenu} 
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