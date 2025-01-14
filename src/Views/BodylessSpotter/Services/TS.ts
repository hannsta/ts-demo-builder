import {
    init,
    BodylessConversation,
    getAnswerFromQuery,
    AuthType,
    LiveboardEmbed,
    createLiveboardWithAnswers,
    tokenizedFetch,
  } from "@thoughtspot/visual-embed-sdk";
import { useContext } from "react";
import { SettingsContext } from "../../../App";
import { createClientWithoutAuth } from "../../../Util/Util";
import { Message, Worksheet } from "../Store";
  
  const app = document.getElementById("app");
  export const Worksheets: Record<string, Worksheet>  = {
    MOVIE_RENTAL: {
      key: "MOVIE_RENTAL",
      name: "Movie Rental",
      id: "dd4d3a01-eb7b-4223-8e8f-8205e5d86adc",
    },
    SAMPLE_APPAREL: {
      key: "SAMPLE_APPAREL",
      name: "Retail Apparel",
      id: "cd252e5c-b552-49a8-821d-3eadaa049cca",
    },
  };
  
  const sampleDataCache: any = {};
  
  async function getColumns(worksheetId: string, TSURL: string) {
    const client = createClientWithoutAuth(TSURL);
    const worksheets = await client.searchMetadata({
        include_details: true,
        metadata: [
          {
            identifier: worksheetId,
            type: "LOGICAL_TABLE",
          },
        ],
    })
    return worksheets[0].metadata_detail.columns;
  }
  
  function getDataDict(columns: any) {
    return columns
      .map((c: any) => {
        return `
        Name: ${c.header.name}
        Description: ${c.header.description}`;
      })
      .join("\n ---- \n");
  }
  
  function getTokensFromColumnNames(columnNames: string[]) {

    return columnNames.map((c) => `[${c}]`).join(" ");
  }
  
  function prettifyDateVal(val: any) {
    if (val?.v?.s) {
      return new Date(val.v.s * 1000).toLocaleDateString();
    }
    return val;
  }
  
  function prettifyDates(rows: any) {
    return rows.map((row: any) => {
      return row.map((val: any) => {
        return prettifyDateVal(val);
      });
    });
  }
  
  export const getSampleData = async (worksheetId: string, TSURL: string) => {
    
    sampleDataCache[worksheetId] =
      sampleDataCache[worksheetId] || _getSampleData(worksheetId, TSURL);
    return sampleDataCache[worksheetId];
  };
  
  const _getSampleData = async (worksheetId: string, TSURL: string) => {
    const columns = await getColumns(worksheetId, TSURL);
    const columnNames = columns.filter((c: any) => !c.optionalType).map((c: any) => c.header.name);
    const tokens = getTokensFromColumnNames(columnNames);
    const client = createClientWithoutAuth(TSURL);
    const response = await client.searchData({
        query_string: tokens,
        logical_table_identifier: worksheetId,
        data_format: "COMPACT",
        record_offset: 0,
        record_size: 50,
    })
    let { data_rows, column_names } = response.contents[0];
    data_rows.unshift(column_names);
    data_rows = prettifyDates(data_rows);
    const sampleData = data_rows.map((row: any) => row.join(" | ")).join("\n\n");
    const dataDict = getDataDict(columns);
    return `
      ${sampleData}
  
      ---- End of Data ----
      
      Description about the columns:
      ${dataDict}
    `;
  };
  
  export function getCSVFromData({ columns, data }: any) {
    const colData = columns.map((c: any) => {
      const colData = data.columnDataLite.find((d: any) => d.columnId === c.column.id);
      return {
        name: c.column.name,
        id: c.column.id,
        data: JSON.parse(colData.dataValue),
      };
    });
  
    const rows = [];
    rows.push(colData.map((c: any) => c.name));
    const rowCount = Number.parseInt(data.totalRowCount);
    for (let i = 0; i < rowCount; i++) {
      rows.push(
        colData.map((c: any) => {
          const val = c.data[i];
          return typeof val === "string"
            ? `"${val.substring(0, 1000)}"`
            : prettifyDateVal(val);
        })
      );
    }
  
    console.log(rows);
  
    return rows.map((r) => r.join(" | ")).join("\n");
  }
  
  export { BodylessConversation, getAnswerFromQuery, createLiveboardWithAnswers };
  