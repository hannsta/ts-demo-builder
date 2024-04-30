import { LiveboardEmbed, PreRenderedLiveboardEmbed, RuntimeFilter } from "@thoughtspot/visual-embed-sdk/react";
import { Settings } from "../Settings/SettingsConfiguration";
import { ThoughtSpotObject, ThoughtSpotObjectType } from "../Settings/ThoughtSpotObjectConfiguration";
import { SubMenu } from "../Settings/SubMenuConfiguration";
import AttributeFilter from "./AttributeFilter";
import { useState } from "react";
import { PageType } from "../App";



interface ThoughtSpotObjectViewProps {
    thoughtSpotObject: ThoughtSpotObject,
    type: PageType | null,
    subMenu: SubMenu | null,
    settings: Settings,
    updateFilters: (runtimeFilters: RuntimeFilter[]) => void,
    setShowSage: (showSage: boolean) => void

}
const ThoughtSpotObjectView: React.FC<ThoughtSpotObjectViewProps> = ({thoughtSpotObject, type, subMenu, settings, updateFilters, setShowSage }) => {
    return (
        <div className='flex flex-col p-8 w-full h-full space-y-2' style={{background:settings.style.backgroundColor,overflow:'auto'}}>
            <div className="font-bold text-xl mb-4">{thoughtSpotObject.name}</div>
            {subMenu?.filters && subMenu.filters.length > 0 && (
                <div className='flex flex-col space-y-2'>
                    <div className="flex flex-row space-x-2">
                        {subMenu.filters.map((filter, index) => {
                            return (
                                <AttributeFilter key={index} filter={filter} worksheet={subMenu.worksheet} settings={settings} setFilter={(filter) => 
                                    updateFilters([filter])
                                }/>
                            );
                        })}
                    </div>
                </div>
            )}
            {type == PageType.MYREPORTS && (
                <button className="w-36 bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded" onClick={() => {
                    setShowSage(true);
                }}>
                    Add a Viz
                </button>

            )}
            {thoughtSpotObject.type == ThoughtSpotObjectType.LIVEBOARD && (
                <LiveboardEmbed
                    preRenderId="liveboardEmbed"
                    liveboardId={thoughtSpotObject.uuid}
                    frameParams={{width: '100%', height: '100%'}}
                />
            )}
        </div>
    );
}
export default ThoughtSpotObjectView;