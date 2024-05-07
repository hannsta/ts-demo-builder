import { useState, useEffect, useContext } from "react";
import { createClientWithoutAuth } from "../Util";
import { SettingsContext } from "../App";

interface KPIChartProps {
    query: string,
    worksheetId: string
}
const KPIChartView: React.FC<KPIChartProps> = ({query, worksheetId}) => {
    const [data, setData] = useState<any>(null);
    const settingsContext = useContext(SettingsContext);


    useEffect(() => {
        if (!query || !worksheetId) return;
        if (query == "" || worksheetId == "") return;
        let client =  createClientWithoutAuth(settingsContext.settings.TSURL);
        client.searchData({
            query_string: query,
            logical_table_identifier: worksheetId
        }).then((response: any) => {
            console.log("rest data",response);
        })
    })
    return (
        <div>
            {data && (
                <div>
                    <div className="text-3xl font-bold">{data[0].value}</div>
                    <div className="text-lg">{data[0].name}</div>
                </div>
            )}
        </div>
    );
}
export default KPIChartView;