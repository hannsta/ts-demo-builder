import { SageEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { SimpleSage } from "../../Settings/StandardMenus/SimpleSageConfig";

interface SimpleSageProps {
    simpleSage: SimpleSage,
}
const SimpleSageView: React.FC<SimpleSageProps> = ({simpleSage}) => {
    return (
        <SageEmbed
            frameParams={{width: '100%', height: '100%'}}
            dataSource={simpleSage.worksheet}
        />
    )
}
export default SimpleSageView;