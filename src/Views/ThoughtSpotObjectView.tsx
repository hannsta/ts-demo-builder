import { LiveboardEmbed, PreRenderedLiveboardEmbed, RuntimeFilter, SearchEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { Settings } from "../Settings/SettingsConfiguration";
import { ThoughtSpotObject, ThoughtSpotObjectType } from "../Settings/ThoughtSpotObjectConfiguration";
import { SubMenu } from "../Settings/SubMenuConfiguration";
import AttributeFilter from "./Filters/AttributeFilter";
import { useState } from "react";
import { PageType } from "../App";
import CustomActionPopup from "./Popups/CustomActionPopup";
import { User } from "../Settings/UserConfiguration";
import VizSelector, { Viz } from "./Popups/VizSelector";
import { Action, AnswerService, HostEvent } from "@thoughtspot/visual-embed-sdk";
import { createClientWithoutAuth } from "../Util/Util";
import { FilterType } from "../Settings/FiltersConfiguration";
import DateFilter from "./Filters/DateFilter";



interface ThoughtSpotObjectViewProps {
    user: User,
    thoughtSpotObject: ThoughtSpotObject,
    type: PageType | null,
    subMenu: SubMenu | null,
    settings: Settings,
    updateFilters: (runtimeFilters: RuntimeFilter[]) => void,
    setShowSage: (showSage: boolean) => void

}
const ThoughtSpotObjectView: React.FC<ThoughtSpotObjectViewProps> = ({user, thoughtSpotObject, type, subMenu, settings, updateFilters, setShowSage }) => {
    const [customActionPopupVisible, setCustomActionPopupVisible] = useState<boolean>(false);
    const [customActionData, setCustomActionData] = useState<any>(null);
    const [vizSelectorVisible, setVizSelectorVisible] = useState<boolean>(false);
    const PinViz = async (viz: Viz) => {
        let client =  createClientWithoutAuth(settings.TSURL);
        client.exportMetadataTML({
            metadata: [
                {
                    identifier: thoughtSpotObject.uuid
                }
            ],
            export_fqn: true
        }).then((response) => {
            let tml = JSON.parse(response[0].edoc)
            let vizTML = viz.tml;
            if (!tml.liveboard.visualizations) tml.liveboard.visualizations = [vizTML];
            else tml.liveboard.visualizations.push(vizTML);
            client.importMetadataTML({
                metadata_tmls: [JSON.stringify(tml)]
            }).then((response) => {       
                var element: any = document.querySelector("#tsEmbed-pre-render-wrapper-liveboardEmbed")
                if (element && element.__tsEmbed){
                    element.__tsEmbed.navigateToLiveboard("")
                    element.__tsEmbed.navigateToLiveboard(thoughtSpotObject.uuid)
                }
            })
        })
    }
    console.log(user.userRole.actions)
    return (
        <div className='flex flex-col p-8 w-full h-full space-y-2' style={{background:settings.style.backgroundColor,overflow:'auto'}}>
            <div className="mb-4">
                <div className="font-bold text-xl mb-4" style={{color:settings.style.textColor}} dangerouslySetInnerHTML={{__html: thoughtSpotObject.name}}></div>
                {subMenu?.filters && subMenu.filters.length > 0 && (
                    <div className='flex flex-col space-y-2  mb-4'>
                        <div className="flex flex-row space-x-2">

                            {subMenu.filters.map((filter, index) => {
                                return (
                                    <>
                                    {filter.type == FilterType.ATTRIBUTE && (
                                        <AttributeFilter key={index} filter={filter} worksheet={subMenu.worksheet} settings={settings} setFilter={(filter) => 
                                            updateFilters([filter])
                                        }/>
                                    )}
                                    {filter.type == FilterType.DATE && (
                                        <DateFilter key={index} filter={filter} worksheet={subMenu.worksheet} settings={settings} setFilter={(filter) =>
                                            updateFilters([filter])
                                        }/>
                                    )}

                                    </>
                                
                                );
                            })}
                        </div>
                    </div>
                )}
                {type == PageType.MYREPORTS && (
                    <>
                        <button className="w-36 bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded" onClick={() => {
                            setShowSage(true);
                        }}>
                            Create a Viz
                        </button>
                        <button className="w-36 bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded ml-2" onClick={() => {
                            setVizSelectorVisible(true);
                        }}>
                            Add a Viz
                        </button>
                    </>
                )}

            </div>
            {thoughtSpotObject.type == ThoughtSpotObjectType.LIVEBOARD && (
                <LiveboardEmbed
                    hiddenActions={user.userRole.name != "Custom" ? user.userRole.actions  : undefined}
                    visibleActions={user.userRole.name == "Custom" ? user.userRole.actions : undefined}
                    onCustomAction={(data)=>{
                        console.log(data.data)
                        setCustomActionData(data.data);
                        setCustomActionPopupVisible(true);
                    }}
                    preRenderId="liveboardEmbed"
                    liveboardId={thoughtSpotObject.uuid}
                    frameParams={{width: '100%', height: '100%'}}
                />
            )}
            {thoughtSpotObject.type == ThoughtSpotObjectType.ANSWER && (
                <SearchEmbed
                    hiddenActions={user.userRole.actions}

                    onCustomAction={(data)=>{
                        console.log(data.data)
                        setCustomActionData(data.data);
                        setCustomActionPopupVisible(true);
                    }}
                    //preRenderId="searchEmbed"
                    answerId={thoughtSpotObject.uuid}
                    frameParams={{width: '100%', height: '100%'}}
                />
            )}
            {customActionPopupVisible && (
                <CustomActionPopup data={customActionData} closePopup={() => setCustomActionPopupVisible(false)}/>
            )}
            {vizSelectorVisible && (
                <VizSelector liveboardId={settings.myReports.liveboardId} setVizId={PinViz} setVizSelectorVisible={setVizSelectorVisible}/>
            )}
        </div>
    );
}
export default ThoughtSpotObjectView;