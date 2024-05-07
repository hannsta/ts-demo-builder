import { SettingsContext } from "../App";
import KPIChartView from "./KPIChart";

interface HomePageViewProps {

}
const HomePageView:React.FC<HomePageViewProps> = () =>{
    return (
        <SettingsContext.Consumer> 
            {({settings}) => {
                return (
                    <div className='flex flex-col items-center p-8' style={{background:settings.style.backgroundColor, height: 'calc(100vh - 4rem)', width: 'calc(100vw - 4rem)'}}>
                        <div className="text-3xl font-bold">{settings.name}</div>
                        <div className="flex flex-wrap justify-center gap-y-8 gap-x-8 mt-16 ">
                        {
                            settings.subMenus.map((subMenu, index) => {
                                return (
                                    <div 
                                    style={{minWidth: '600px'}}
                                    className="shadow-md hover:shadow-lg h-80 p-6 rounded-md flex flex-row space-x-2 hover:cursor-pointer hover:font-bold ">
                                        <div className="text-2xl font-bold">
                                            {subMenu.name}
                                            {subMenu.kpiChart && (
                                                <>
                                                <KPIChartView worksheetId={subMenu.worksheet} query={subMenu.kpiChart.query}/>
                                                <div className="text-lg font-normal">{subMenu.kpiChart.title}</div>
                                                </>

                                            )}
                                        </div>
                                    </div>
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