import { useState, useEffect, useContext } from "react";
import { createClientWithoutAuth, numberWithCommas } from "../Util";
import { Page, PageType, SettingsContext } from "../App";
import { SearchDataResponse } from "@thoughtspot/rest-api-sdk";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, CategoryScale, LinearScale, LineController, LineElement, PointElement, Title,Filler } from "chart.js";
import { SubMenu } from "../Settings/SubMenuConfiguration";
import { ThoughtSpotObject } from "../Settings/ThoughtSpotObjectConfiguration";

export interface KPIChartProps {
    subMenu: SubMenu,
    setSagePrompt: (prompt: string) => void,
    setShowSage: (show: boolean) => void,
    setThoughtSpotObject: (thoughtSpotObject: ThoughtSpotObject) => void,
    setSelectedPage: (page: Page) => void,
}
const KPIChartView: React.FC<KPIChartProps> = ({subMenu, setSagePrompt, setShowSage, setThoughtSpotObject,setSelectedPage}) => {
    const [data, setData] = useState<any>(null);
    const settingsContext = useContext(SettingsContext);

    useEffect(() => {
        if (!subMenu.kpiChart.query || !subMenu.worksheet) return;
        if (subMenu.kpiChart.query === "" || subMenu.worksheet === "") return;
        let client =  createClientWithoutAuth(settingsContext.settings.TSURL);
        client.searchData({
            query_string: subMenu.kpiChart.query,
            logical_table_identifier: subMenu.worksheet
        }).then((response: SearchDataResponse) => {
            setData(response.contents[0].data_rows);
        })
        ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Title, Filler);
    },[])
    return (
        <SettingsContext.Consumer>
            {({settings}) => (
        <div 
        style={{minWidth: '600px'}}
        className="shadow-md hover:shadow-lg p-6 rounded-md flex flex-col space-x-2 ">
            <div className="flex flex-row">
            <div onClick={()=>setSelectedPage({
                            type: PageType.SUBMENU,
                            subMenu: subMenu,
                        })} className="text-2xl font-bold hover:cursor-pointer hover:text-gray-400">
                {subMenu.name}
            </div>
            <div className="flex flex-col ml-auto">
                <div className="text-lg font-normal">{subMenu.kpiChart ? subMenu.kpiChart.title : ''}</div>
                <div className="text-4xl font-bold mr-4 mt-2">{data && numberWithCommas(Math.round(data[data.length-1][1]))}</div>
            </div> 
            </div>
            {subMenu.kpiChart && (
                <div className="flex h-32 mt-8 pr-4">
                    {data && (
                        <Line 
                            data={
                            {
                                labels: data.map((row:any) => row[0]),
                                datasets: [
                                    {
                                        label: 'KPI',
                                        data: data.map((row:any) => row[1]),
                                        fill: "start",
                                        backgroundColor: settings.style.headerColor.toLowerCase() === "#ffffff" ? settings.style.iconColor : settings.style.headerColor,
                                        borderColor: 'rgba(255, 99, 132, 0.2)',
                                    },
                                ],
                            }
                        }
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                tooltip: {
                                    enabled: true
                                },
                                filler: {
                                    propagate: true
                                },
                                legend: {
                                    display: false
                                },
                                title: {
                                    display: false
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: false,
                                    display: true,
                                    ticks: {
                                        //number of ticks on the y axis
                                        maxTicksLimit: 3
                                    },
                                    grid: {
                                        display: false
                                    }
                                },
                                x: {
                                    display: false,
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }}/>
                    )}
                </div>
            )}
            <div className="text-lg font-bold mt-8 mb-2">
                Explore Dashboards
            </div>
            <div className="flex flex-col space-y-2">
                {subMenu.objects.map((object, index) => (
                    <div
                    onClick={()=>{
                        setThoughtSpotObject(object)
                        setSelectedPage({
                            type: PageType.SUBMENU,
                            subMenu: subMenu,
                        })
                    }}
                    className="flex flex-row space-x-2 hover:cursor-pointer hover:font-bold hover:text-blue-400">
                        {object.name}
                    </div>
                ))}
            </div>
            <div className="text-lg font-bold mt-4 mb-2">
                Common Questions
            </div>
            <div className="flex flex-col space-y-2">
                {subMenu.sage.sampleQuestions.map((question, index) => (
                    <div 
                    onClick={()=>{
                        setSagePrompt(question)
                        setShowSage(true)
                    }}
                    className="flex flex-row space-x-2 hover:cursor-pointer hover:font-bold hover:text-blue-400">
                        {question}
                    </div>
                ))}
            </div>
        
        </div>
        )}
        </SettingsContext.Consumer>
    );
}
export default KPIChartView;