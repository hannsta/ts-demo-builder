import { useEffect, useState } from 'react';
import { Settings } from '../../Settings/SettingsConfiguration';
import { Filter } from '../../Settings/FiltersConfiguration';
import exp from 'constants';
import { MultiSelect } from 'react-multi-select-component';
import { RuntimeFilter, RuntimeFilterOp } from '@thoughtspot/visual-embed-sdk';

export interface AttributeFilterProps {
    filter: Filter,
    worksheet: string,
    settings: Settings,
    setFilter: (filter: RuntimeFilter) => void
}
const AttributeFilter: React.FC<AttributeFilterProps> = ({filter, worksheet, settings, setFilter}) => {
    const [value, setValue] = useState<{label: string, value: string}[]>([]);
    const [options, setOptions] = useState<{label: string, value: string}[]>([]);
    useEffect(() => {
        setFilter({
            columnName: filter.name,
            operator: RuntimeFilterOp.IN,
            values: value.map((v) => v.value)
        })
    }, [value])
    useEffect(() => {
        var baseURL = settings.TSURL.replace("#/","").replace("#","")
        var url = baseURL+"api/rest/2.0/searchdata"
        fetch(url,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method:'POST',
            credentials: 'include',
            body: JSON.stringify({
                "query_string": "["+filter.name+"]",
                "logical_table_identifier": worksheet,
                "record_offset": 0,
                "record_size": 80
            })
        }).then(response => response.json()).then((data:any) => {
            let newOptions = []
            let values = data.contents[0].data_rows;
            for (let i = 0; i < values.length; i++){
                newOptions.push({label: values[i], value: values[i]})
            }
            setOptions(newOptions)
        }).catch(()=>{
            console.log("DEMO BUILDER - Bad column name please try a new one")
        })
    }, [])
    return (
        <div className='flex min-w-72 flex-col space-y-2'>
            <label style={{color:settings.style.textColor}} className='font-bold'>{filter.name}</label>
            <MultiSelect
                options={options}
                value={value}
                onChange={(e:any) => setValue(e)}
                labelledBy="Select"
            />
        </div>
    );
}
export default AttributeFilter;

