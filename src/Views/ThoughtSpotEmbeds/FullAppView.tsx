import { AppEmbed,  } from "@thoughtspot/visual-embed-sdk/react";
import { SimpleFullApp } from "../../Settings/StandardMenus/SimpleFullAppConfig";
interface SimpleFullAppProps {
    simpleFullApp: SimpleFullApp,
}
const SimpleFullAppView: React.FC<SimpleFullAppProps> = ({simpleFullApp}) => {
    return (
        <AppEmbed
            frameParams={{width: '100%', height: '100%'}}
        />
    )
}
export default SimpleFullAppView;