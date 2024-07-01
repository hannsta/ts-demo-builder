import { SearchDataResponse } from "@thoughtspot/rest-api-sdk";
import { useState, useContext, useEffect } from "react";
import { SettingsContext } from "../App";
import { SubMenu } from "../Settings/SubMenuConfiguration";
import { createClientWithoutAuth } from "../Util/Util";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

interface DataTableProps {
    subMenu: SubMenu,
}
const DataTable: React.FC<DataTableProps> = ({subMenu}) => {
    const [rowData, setRowData] = useState<any>(null);
    const [colDefs, setColDefs] = useState<any>(null);
    const settingsContext = useContext(SettingsContext);

    useEffect(() => {
        if (!subMenu.kpiChart.query || !subMenu.worksheet) return;
        if (subMenu.kpiChart.query === "" || subMenu.worksheet === "") return;
        let client =  createClientWithoutAuth(settingsContext.settings.TSURL);
        client.searchData({
            query_string: subMenu.kpiChart.query,
            logical_table_identifier: subMenu.worksheet
        }).then((response: SearchDataResponse) => {
            let newColDefs = [];
            let newRowData = [];
            for (let i = 0; i < response.contents[0].column_names.length; i++) {
                newColDefs.push({
                    field: response.contents[0].column_names[i],
                });
            }
            for (let i = 0; i < response.contents[0].data_rows.length; i++) {
                let row = {};
                for (let j = 0; j < response.contents[0].column_names.length; j++) {
                    let colName = response.contents[0].column_names[j];
                    //@ts-ignore
                    row[colName] = response.contents[0].data_rows[i][j];
                }
                newRowData.push(row);
            }
            setColDefs(newColDefs);
            setRowData(newRowData);
        }).catch((error) => {
            console.log("Error fetching data", error);
        });
    },[])
    return (
        <SettingsContext.Consumer>
        {({settings}) => (
        <div 
        style={{minWidth: '600px', color: settings.style.textColor, backgroundColor: settings.style.tileColor}}
        className="shadow-md hover:shadow-lg p-6 rounded-md flex flex-col space-x-2 flex w-full">

            <div className="flex flex-row mb-4">
                <div className="text-2xl font-bold">
                    {subMenu.name} Details
                </div>
            </div>
            <div className={"ag-theme-quartz"} style={{ width: '100%', height: '500px' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
            </div>
        </div>
        )}
        </SettingsContext.Consumer>
    )
}
export default DataTable;