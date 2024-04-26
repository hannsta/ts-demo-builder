import { LiveboardEmbed, PreRenderedLiveboardEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { Settings } from "../Settings/SettingsConfiguration";
import { ThoughtSpotObject, ThoughtSpotObjectType } from "../Settings/ThoughtSpotObjectConfiguration";

interface ThoughtSpotObjectViewProps {
    thoughtSpotObject: ThoughtSpotObject,
    settings: Settings
}
const ThoughtSpotObjectView: React.FC<ThoughtSpotObjectViewProps> = ({thoughtSpotObject, settings}) => {
    return (
        <div className='flex flex-col p-8 w-full h-full space-y-2' style={{background:settings.style.subMenuColor}}>
            <div className="font-bold text-xl">{thoughtSpotObject.name}</div>
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