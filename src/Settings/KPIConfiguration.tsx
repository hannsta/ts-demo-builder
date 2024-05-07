export interface KPIChart{
    title: string,
    query: string,
}
interface KPIConfigurationProps {
    kpi: KPIChart,
    setKPI: (kpi: KPIChart) => void,
}

const KPIChartConfiguration:React.FC<KPIConfigurationProps> = ({kpi, setKPI}) => {
    return (
        <div className='flex flex-col space-y-2 border-2 rounded-lg p-4 bg-white'>

            <label className='font-bold text-xl mt-4 mb-2'>KPI Chart</label>

            <div className='flex flex-col'>
                <label className='font-bold'>Title</label>
                <input
                    className="border-2 border-gray-200 text-xl p-1 rounded-lg w-96"
                    type="text"
                    value={kpi.title}
                    onChange={(e) => setKPI({...kpi, title: e.target.value})}
                />
            </div>
            <div className='flex flex-col'>
                <label className='font-bold'>Query</label>
                <input
                    className="border-2 border-gray-200 text-xl p-1 rounded-lg"
                    type="text"
                    value={kpi.query}
                    onChange={(e) => setKPI({...kpi, query: e.target.value})}
                />
            </div>
        </div>
    );
}
export default KPIChartConfiguration;