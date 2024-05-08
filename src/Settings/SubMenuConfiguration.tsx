import React, { useEffect, useState } from 'react';
import ThoughtSpotObjectConfiguration, { ThoughtSpotObject, ThoughtSpotObjectType } from './ThoughtSpotObjectConfiguration';
import IconSelection from './Inputs/IconSelection';
import SageConfiguration, { Sage } from './SageConfiguration';
import FiltersConfiguration, { Filter } from './FiltersConfiguration';
import { HiMagnifyingGlass, HiTrash } from 'react-icons/hi2';
import ThoughtSpotObjectSearch from './Inputs/ThoughtSpotObjectSearch';
import { TSLoginContext } from '../App';
import KPIChartConfiguration, { KPIChart } from './KPIConfiguration';


export interface SubMenu {
    name: string,
    icon: string,
    objects: ThoughtSpotObject[],
    worksheet: string,
    filters: Filter[],
    kpiChart: KPIChart,
    sage: Sage,
}

interface SubMenuConfigurationProps {
    subMenu: SubMenu,
    TSURL: string,
    setSubMenu: (subMenu: SubMenu) => void,
    deleteSubMenu: (subMenu: SubMenu) => void,
}
const SubMenuConfiguration: React.FC<SubMenuConfigurationProps> = ({subMenu, TSURL, setSubMenu, deleteSubMenu}) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [worksheetSearchVisible, setWorksheetSearchVisible] = useState<boolean>(false);
    useEffect(() => {
        setWorksheetSearchVisible(false);
    }, [subMenu]);
    return (
        <TSLoginContext.Consumer>
            {({isLoggedIn}) => (
        <div className='flex flex-col space-y-2 border-2 rounded-lg p-2 bg-slate-100'>
            <div className='flex flex-row space-x-4'>
                <div className='flex flex-col'>
                    <label className='font-bold'>Icon</label>
                    <IconSelection selectedIcon={subMenu.icon} setSelectedIcon={(icon) => setSubMenu({...subMenu, icon})}/>
                </div>
                <div className='flex flex-col'>

            <label className='font-bold'>Name</label>
            <input
                className="border-2 border-gray-200 text-xl p-1 rounded-lg"
                type="text"
                value={subMenu.name}
                onChange={(e) => setSubMenu({...subMenu, name: e.target.value})}
            />
            </div>
            <div className='flex flex-row w-full justify-end space-x-4 mt-2'>
                <button
                    className="w-24 h-10 bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? "Collapse" : "Expand"}
                </button>
                <button
                    className=" h-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteSubMenu(subMenu)}
                >
                    <HiTrash />
                </button>
            </div>
        </div>
        {showDetails && (
            <>
                <div className='flex flex-col mb-2'>
                    <label className='font-bold'>Worksheet</label>
                    <div className='flex flex-row'>
                    <input
                        className="border-2 w-96 border-gray-200 text-xl p-1 rounded-lg"
                        type="text"
                        value={subMenu.worksheet}
                        onChange={(e) => setSubMenu({...subMenu, worksheet: e.target.value})}
                    />
                    <button
                        className={(isLoggedIn ? "bg-blue-500 hover:bg-blue-700" : "bg-slate-400") + " text-white font-bold h-8 px-4 rounded ml-2"}
                        onClick={() => setWorksheetSearchVisible(!worksheetSearchVisible)}
                        disabled={!isLoggedIn}
                    >
                        <HiMagnifyingGlass />
                    </button>
                    </div>
                </div>
                <label className='font-bold text-xl pt-2'>Links</label>
                <div>
                {subMenu.objects.map((object, index) => (
                    <div className='flex flex-row'>
                    <ThoughtSpotObjectConfiguration
                        key={index}
                        object={object}
                        setObject={(newObject) => {
                            const newObjects = [...subMenu.objects]
                            newObjects[index] = newObject
                            setSubMenu({...subMenu, objects: newObjects})
                        }}
                        TSURL={TSURL}
                    />
                    <div className='flex flex-col justify-end'>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold h-8  px-4 rounded ml-2"
                    onClick={() => setSubMenu({...subMenu, objects: subMenu.objects.filter((_, i) => i !== index)})}>Remove</button>
                    </div>
                </div>
            ))}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4"
                onClick={() => setSubMenu({...subMenu, objects: [...subMenu.objects, {name: "", uuid: "", type: ThoughtSpotObjectType.LIVEBOARD}]})}
            >
                Add Link
            </button>
            <div className='flex flex-col mt-4'>
                <SageConfiguration
                    sage={subMenu.sage}
                    setSage={(sage) => setSubMenu({...subMenu, sage})}
                />
            </div>
            <div className='flex flex-col mt-4'>
                <FiltersConfiguration filters={subMenu.filters} setFilters={(filters) => setSubMenu({...subMenu, filters})}
                />
            </div>
            <div className='flex flex-col mt-4'>
                <KPIChartConfiguration kpi={subMenu.kpiChart} setKPI={(kpi) => setSubMenu({...subMenu, kpiChart: kpi})}/>
            </div>
            </div>
            {worksheetSearchVisible && (
                <ThoughtSpotObjectSearch
                    TSURL={TSURL}
                    isWorksheet={true}
                    setObject={(object) => setSubMenu({...subMenu, worksheet: object.uuid})} />
                )}
        </>
        
        )}

        </div>
    )}
    </TSLoginContext.Consumer>
    );
        
};

export default SubMenuConfiguration;