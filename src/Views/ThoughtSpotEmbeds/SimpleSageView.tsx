import { ConversationEmbed, EmbedEvent, RuntimeFilterOp } from "@thoughtspot/visual-embed-sdk";
import { SageEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { useContext, useEffect } from "react";
import { SettingsContext } from "../../App";
import { SimpleSage } from "../../Settings/StandardMenus/SimpleSageConfig";

interface SimpleSageProps {
    simpleSage: SimpleSage,
}
const SimpleSageView: React.FC<SimpleSageProps> = ({simpleSage}) => {
    let embed;
    let settings = useContext(SettingsContext).settings;
    useEffect(()=>{
        let div = document.getElementById("conversation");
        if (div){
            embed = new ConversationEmbed(div,{
                worksheetId: simpleSage.worksheet,
                frameParams: {
                    width:'100%',
                    height:'100%'
                },
                runtimeFilters: [
                    {
                        columnName: 'Store Region',
                        operator: RuntimeFilterOp.IN,
                        values: ['east']
                    }
                ],
                customizations:{
                    content:{
                        strings:{
                            'Spotter': settings.otherSettings?.spotterName ? settings.otherSettings.spotterName :'Spotter'
                        }
                    },
                    style:{
                        customCSS:{
                            rules_UNSTABLE:{
                                '.zauthenticated-app-view-module__pageContent':{overflow:'hidden'}
                            }
                        }
                    }
                }
            })
            embed.render();
            embed.on(EmbedEvent.ALL, (data: any)=>{
                console.log(data)
            })
        }

    },[])
    return (

        <>
        {simpleSage.worksheet ? 
            <div className="h-full" id="conversation"></div>
            :
            <div>Please select a worksheet in the Settings menu</div>
        }
        </>
    )
}
export default SimpleSageView;