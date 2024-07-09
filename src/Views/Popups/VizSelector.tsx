import { useContext, useEffect, useState } from "react"
import { createClientWithoutAuth } from "../../Util/Util"
import { SettingsContext } from "../../App"
import { CloseButton } from "../../Settings/Inputs/InputMenus"
import { HiTableCells } from "react-icons/hi2"
import { FaChartArea, FaChartBar, FaChartLine, FaChartPie, FaTable } from "react-icons/fa";

interface VizSelectorProps {
    liveboardId: string,
    setVizId: (viz: Viz) => void,
    setVizSelectorVisible: (visible: boolean) => void
}
export interface Viz {
    id: string,
    name: string,
    chartType: string,
    tml: any,
}
const VizSelector: React.FC<VizSelectorProps> = ({liveboardId, setVizId, setVizSelectorVisible}) => {
    const [vizList, setVizList] = useState<Viz[]>([])
    const [vizListLoaded, setVizListLoaded] = useState<boolean>(false)
    const settingsContext = useContext(SettingsContext);
    useEffect(() => {
        let client =  createClientWithoutAuth(settingsContext.settings.TSURL);
        client.exportMetadataTML({
            metadata: [
                {
                    identifier: liveboardId
                }
            ],
            export_fqn: true
        }).then((response) => {
            let vizList: Viz[] = []
            let tml = JSON.parse(response[0].edoc)
            console.log(tml)
            // @ts-ignore
            tml.liveboard.visualizations.forEach((viz: any) => {
                if (!viz.answer) return
                vizList.push({
                    id: viz.viz_guid,
                    name: viz.answer.name,
                    chartType: viz.answer.chart.type,
                    tml: viz
                })
            })
            setVizList(vizList)
            setVizListLoaded(true)
        })
    }, [])

    return (
        <div className='absolute top-0 left-0 flex justify-center items-center overflow-hidden' style={{zIndex:999, width:'calc(100vh - 19rem)', height:'calc(100vh - 8rem)'}}>
            <div className='absolute flex flex-col bg-white rounded-lg p-4 shadow-2xl overflow-auto' style={{ maxHeight:'800px', minWidth:'400px', minHeight:'400px'}}>
                <div className="flex p-4 flex-row justify-between items-center"> 
                    <div className="font-bold text-xl mb-4">Select a Viz</div>
                    <CloseButton onClick={()=>setVizSelectorVisible(false)}/>
                </div>
                <div className="flex overflow-auto p-4" style={{ maxHeight:'800px', minWidth:'400px', minHeight:'400px',scrollbarWidth:'thin'}}>
                    {vizList.length > 0 && vizListLoaded && (
                        <div className="grid grid-cols-3 gap-4" >
                            {vizList.map((viz, index) => (
                                <div key={index} className="flex flex-col hover:cursor-pointer hover:font-bold hover:shadow-xl h-44 w-44 overflow-hidden shadow-md rounded-md" onClick={() => setVizId(viz)}>
                                    <div className="bg-gray-100 p-2" >
                                        {viz.chartType == 'PIVOT_TABLE' && (
                                            <FaTable />
                                        )}
                                        {viz.chartType == 'LINE' && (
                                            <FaChartLine />
                                        )}
                                        {viz.chartType == 'BAR' && (
                                            <FaChartBar />
                                        )}
                                        {viz.chartType == 'AREA' || viz.chartType == 'KPI' && (
                                            <FaChartArea />
                                        )}
                                        {viz.chartType == 'PIE' && (
                                            <FaChartPie />
                                        )}
                                        {['PIVOT_TABLE', 'LINE', 'BAR', 'AREA', 'KPI', 'PIE'].indexOf(viz.chartType) == -1 && (
                                            <FaTable />
                                        )}
                                    </div>
                                    <div className="p-4">
                                    {viz.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {vizList.length == 0 && vizListLoaded && (
                        <div className="flex h-full w-full align-center items-center justify-center text-md">No Vizs Found</div>
                    )}
                    {vizList.length == 0 && !vizListLoaded && (
                        <div className="flex h-full w-full align-center items-center justify-center text-md">Loading Viz List ...</div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default VizSelector;
