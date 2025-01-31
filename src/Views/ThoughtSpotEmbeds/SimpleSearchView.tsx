import { SearchEmbed } from "@thoughtspot/visual-embed-sdk/react";
import { SimpleSearch } from "../../Settings/StandardMenus/SimpleSearchConfig";

interface SimpleSearchProps {
    simpleSearch: SimpleSearch,
}
const SimpleSearchView: React.FC<SimpleSearchProps> = ({simpleSearch}) => {
    return (
        <SearchEmbed
            frameParams={{width: '100%', height: '100%'}}
            dataPanelV2={true}
            dataSource={simpleSearch && simpleSearch.worksheet ? simpleSearch.worksheet : ''}
        />
    )
}
export default SimpleSearchView;