import { AddButton, RemoveButton, SelectInput, TextInput } from "./Inputs/InputMenus";

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
    DATE = "date"
}

const FiltersConfiguration: React.FC<FiltersConfigurationProps> = ({filters, setFilters}) => {
    return (
        <div className='flex flex-col space-y-2 rounded-lg bg-white '>
            <div className='flex flex-row space-x-4 w-full'>
                <div className='flex flex-col'>
                    <label className='font-bold text-xl mb-2'>Filters</label>
                    <div className='flex flex-col space-y-2 mt-2'>
                    {filters.map((filter, index) => (
                        <div className='flex w-full flex-row'>
                        <TextInput label={"Column Name"} value={filter.name} setValue={(name) => {
                            const updatedFilters = [...filters];
                            updatedFilters[index].name = name;
                            setFilters(updatedFilters);
                        }
                        }/>
                        <SelectInput label={"Type"} value={filter.type} setValue={(type) => {
                            const updatedFilters = [...filters];
                            updatedFilters[index].type = type as FilterType;
                            setFilters(updatedFilters);
                        }
                        } options={[FilterType.ATTRIBUTE, FilterType.MEASURE, FilterType.DATE]}/>
                        <RemoveButton onClick={() => {
                            const updatedFilters = [...filters];
                            updatedFilters.splice(index, 1);
                            setFilters(updatedFilters);
                        }
                        }/>


                        </div>
                    ))}
                    <AddButton label="Add Filter" onClick={() => setFilters([...filters, {name: "", type: FilterType.ATTRIBUTE}])}/>
                </div>
            </div>
        </div>
        </div>
    );
}
export default FiltersConfiguration;