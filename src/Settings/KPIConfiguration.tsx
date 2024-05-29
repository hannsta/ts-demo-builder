import ColorPicker from "./Inputs/ColorPicker";
import { SelectInput, TextInput } from "./Inputs/InputMenus";

export enum KPIType {
    LINE = "Line",
    BAR = "Bar",
    PIE = "Pie"
}

export interface KPIChart{
    title: string,
    query: string,
    color: string,
    type: KPIType
}
interface KPIConfigurationProps {
    kpi: KPIChart,
    setKPI: (kpi: KPIChart) => void,
}

const KPIChartConfiguration:React.FC<KPIConfigurationProps> = ({kpi, setKPI}) => {
    return (
        <div className='flex flex-col space-y-2 rounded-lg bg-white'>

            <label className='font-bold text-xl mb-2'>KPI Chart</label>
            <div className="flex flex-row space-x-4">
                <TextInput label="Title" value={kpi.title} setValue={(title) => setKPI({...kpi, title})}/>
                <SelectInput label="Chart Type" value={kpi.type} setValue={(type: any) => setKPI({...kpi, type})} options={[
                    KPIType.LINE,
                    KPIType.BAR,
                    KPIType.PIE
                ]}/>
                <ColorPicker label="Chart Color" color={kpi.color} setColor={(color) => setKPI({...kpi, color: color})}/>
            </div>
            <TextInput label="Query" value={kpi.query} setValue={(query) => setKPI({...kpi, query})}/>


        </div>
    );
}
export default KPIChartConfiguration;