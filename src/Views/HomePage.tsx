import { Page, SettingsContext } from "../App";
import { SubMenu } from "../Settings/SubMenuConfiguration";
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
            {({settings}) => {
                return (
                    <div className='flex flex-col items-center p-8' style={{background:settings.style.backgroundColor, height: 'calc(100vh - 4rem)', width: 'calc(100vw - 4rem)'}}>
                        <div className="text-3xl font-bold">{settings.name}</div>
                        <div className="text-2xl mt-4">Available Datasets</div>
                        <div className="flex flex-wrap justify-center gap-y-8 gap-x-8 mt-16 ">
                        {
                            settings.subMenus.map((subMenu, index) => {
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
        </SettingsContext.Consumer>
    )
}

export default HomePageView;