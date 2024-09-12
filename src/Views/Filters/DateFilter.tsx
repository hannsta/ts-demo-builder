import { useEffect, useState } from 'react';
import { Settings } from '../../Settings/SettingsConfiguration';
import { Filter } from '../../Settings/FiltersConfiguration';
import exp from 'constants';
import { DateRangePicker, Range } from 'react-date-range';
import { RuntimeFilter, RuntimeFilterOp } from '@thoughtspot/visual-embed-sdk';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { set } from 'date-fns';
export interface DateFilterProps {
    filter: Filter,
    worksheet: string,
    settings: Settings,
    setFilter: (filter: RuntimeFilter) => void
}
const DateFilter: React.FC<DateFilterProps> = ({filter, worksheet, settings, setFilter}) => {
    const [value, setValue] = useState<Range | null>({startDate: new Date(), endDate: new Date()});
    const [pickerVisible, setPickerVisible] = useState<boolean>(false);
    useEffect(() => {
        if (!value || !value.startDate || !value.endDate) return
        setFilter({
            columnName: filter.name,
            operator: RuntimeFilterOp.BW_INC,
            values: [Math.floor(value.startDate.getTime() / 1000), Math.floor(value.endDate.getTime() / 1000)]
        })
    }, [value])
    const ClearSelection = () => {
        setValue(null)
        setFilter({
            columnName: filter.name,
            operator: RuntimeFilterOp.BW_INC,
            values: []
        })
        setPickerVisible(false)
    }
    return (
        <div className='flex min-w-72 flex-col space-y-2'>

            {pickerVisible && (
                <div className='flex flex-col space-y-2 bg-white border-2 rounded-md p-4' style={{zIndex:999}}>
                    <DateRangePicker
                        ranges={value ? [value] : [{
                            startDate: new Date(),
                            endDate: new Date(),
                            key: 'selection',
                        }]}
                        onChange={(e:any) => setValue(e.selection)}
                    />
                    <div className='flex flex-row space-x-2'>
                        <button onClick={ClearSelection} className='bg-red-500 text-white rounded-lg p-2'>Clear</button>
                        <button onClick={() => setPickerVisible(false)} className='bg-blue-500 text-white rounded-lg p-2'>Done</button>
                    </div>
            </div>
            )}
            {!pickerVisible && (
                <>
                    <div className='flex flex-row space-x-2'>
                        <label style={{color:settings.style.textColor}} className='font-bold'>{filter.name}</label>
                    </div>    
                    <button onClick={() => setPickerVisible(true)} className='bg-blue-500 text-white rounded-lg p-2'>
                        {value && value.startDate && value.endDate ? value.startDate.toDateString() + " - " + value.endDate.toDateString() : "Select Date Range"}
                    </button>
                </>
            )}
        </div>
    );
}
export default DateFilter;

