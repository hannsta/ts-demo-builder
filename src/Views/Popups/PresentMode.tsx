import { exportTML } from "@thoughtspot/visual-embed-sdk";
import { AppEmbed, LiveboardEmbed, useEmbedRef, HostEvent } from "@thoughtspot/visual-embed-sdk/react";
import { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../../App";

interface PresentModeProps {
    setPresentModeVisible: (visible: boolean) => void;
    liveboardId: string;
}

const PresentMode: React.FC<PresentModeProps> = ({ setPresentModeVisible, liveboardId }) => {
    const [tabIds, setTabIds] = useState<string[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);
    const currentTabIndex = useRef(0); // Mutable ref to store the current index
    const intervalTriggered = useRef(false);
    const embedRef = useEmbedRef<typeof LiveboardEmbed>();
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the interval
    const settings = useContext(SettingsContext).settings
    useEffect(() => {
        exportTML({
            metadata: [
                {
                    type: "LIVEBOARD", // Metadata Type
                    identifier: liveboardId,
                },
            ],
            export_associated: false,
            export_fqn: false,
            edoc_format: "JSON",
        })
            .then((result) => {
                const tabList: string[] = [];
                const tml = JSON.parse(result[0].edoc);
                console.log(tml)
                // @ts-ignore
                if (tml.liveboard.layout && tml.liveboard.layout.tabs && tml.liveboard.layout.tabs.length > 1){
                    tml.liveboard.layout.tabs.forEach((tab: any) => {
                        tabList.push(tab.id);
                    });
                }
                setTabIds(tabList);
                setLoaded(true);
            })
            .catch((error) => {
                console.error(error);
            });

        return () => {
            // Clear interval on unmount
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [liveboardId]);

    const onLoad = () => {
        setTimeout(()=>{
            if (intervalTriggered.current) return;
            //Start interval to cycle through visualizations
            intervalRef.current = setInterval(() => {
                intervalTriggered.current = true;
                if (!loaded) return;
                if (tabIds.length > 1){
                    currentTabIndex.current = (currentTabIndex.current + 1) % tabIds.length;
                    embedRef.current.trigger(HostEvent.SetActiveTab, {tabId: tabIds[currentTabIndex.current]})
                }else{
                    console.log("here")
                    embedRef.current.trigger(HostEvent.Reload)
                }

            }, (settings.otherSettings && settings.otherSettings.tabSwitchFrequency) ? settings.otherSettings.tabSwitchFrequency  * 1000 : 30000);
        },2000)

    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 z-50 w-screen h-screen">
            <div className="bg-white p-4 w-screen h-screen" id="present-mode">
                <button
                    onClick={() => {
                        // Clear the interval when closing
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current);
                        }
                        setPresentModeVisible(false);
                    }}
                >
                    Close
                </button>
                <div className="flex w-full h-full">
                    {loaded && (
                        <LiveboardEmbed
                            ref={embedRef}
                            liveboardId={liveboardId}
                            frameParams={{ width: "100%", height: "100%" }}
                            onLoad={onLoad}
                            hideLiveboardHeader={true}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PresentMode;
