interface FiltersConfigurationProps {
    filters: Filter[],
    setFilters: (filters: Filter[]) => void
}
export interface Filter {
    name: string,
    type: FilterType,
}
export enum FilterType {
    ATTRIBUTE = "attribute",
    MEASURE = "measure",
}

const FiltersConfiguration: React.FC<FiltersConfigurationProps> = ({filters, setFilters}) => {
    return (
        <div className='flex flex-col space-y-2 rounded-lg  p-4 bg-white border-2'>
            <div className='flex flex-row space-x-4 w-full'>
                <div className='flex flex-col'>
                    <label className='font-bold text-xl mb-2'>Filters</label>
                    <div className='flex flex-col space-y-2 mt-2'>
                    {filters.map((filter, index) => (
                        <div className='flex w-full flex-row'>
                        <input
                            key={index}
                            className="border-2 border-gray-200 w-96 mr-2 h-8 rounded-md bg-white"  
                            type="text"
                            value={filter.name}
                            onChange={(e) => {
                                const updatedFilters = [...filters];
                                updatedFilters[index].name = e.target.value;
                                setFilters(updatedFilters);
                            }}
                        />
                        <button
                            className="w-24 bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-1 px-4 rounded"
                            onClick={() => {
                                const updatedFilters = [...filters];
                                updatedFilters.splice(index, 1);
                                setFilters(updatedFilters);
                            }}
                        >
                            Remove
                        </button>

                        </div>
                    ))}
                    <button
                        className="w-36 bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded"
                        onClick={() => setFilters([...filters, {name: "", type: FilterType.ATTRIBUTE}])}
                    >
                        Add Filter
                    </button>

                </div>
            </div>
        </div>
        </div>
    );
}
export default FiltersConfiguration;