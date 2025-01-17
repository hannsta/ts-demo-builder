import { ConversationEmbed, EmbedEvent } from "@thoughtspot/visual-embed-sdk";
import { SageEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { useEffect } from "react";
import { SimpleSage } from "../../Settings/StandardMenus/SimpleSageConfig";

interface SimpleSageProps {
    simpleSage: SimpleSage,
}
const SimpleSageView: React.FC<SimpleSageProps> = ({simpleSage}) => {
    let embed;
    useEffect(()=>{
        let div = document.getElementById("conversation");
        if (div){
            embed = new ConversationEmbed(div,{
                worksheetId: simpleSage.worksheet,
                frameParams: {
                    width:'100%',
                    height:'100%'
                },
                customizations:{
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