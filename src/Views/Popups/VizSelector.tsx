import { useContext, useEffect, useState } from "react"
import { createClientWithoutAuth } from "../../Util/Util"
import { SettingsContext } from "../../App"

interface VizSelectorProps {
    liveboardId: string,
    setVizId: (viz: Viz) => void,
    setVizSelectorVisible: (visible: boolean) => void
}
export interface Viz {
    id: string,
    name: string,
    tml: any,
}
const VizSelector: React.FC<VizSelectorProps> = ({liveboardId, setVizId, setVizSelectorVisible}) => {
    const [vizList, setVizList] = useState<Viz[]>([])
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
                    tml: viz
                })
            })
            setVizList(vizList)
        })
    }, [])

    return (
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center' style={{zIndex:999}}>
            <div className='absolute flex flex-col bg-white rounded-lg p-8 w-96 shadow-2xl'>
                <div className="font-bold text-xl mb-4">Select a Viz</div>
                <div className="flex flex-col space-y-2">
                    {vizList.map((viz, index) => (
                        <div key={index} className="flex flex-row items-center justify-between hover:cursor-pointer hover:text-blue-400" onClick={() => setVizId(viz)}>
                            {viz.name}
                        </div>
                    ))}
                </div>
                <div className="flex flex-row justify-end">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setVizSelectorVisible(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}
export default VizSelector;
