import React, { useEffect, useState } from 'react';
import ThoughtSpotObjectConfiguration, { ThoughtSpotObject, ThoughtSpotObjectType } from './ThoughtSpotObjectConfiguration';
import IconSelection from './Inputs/IconSelection';
import SageConfiguration, { Sage } from './SageConfiguration';
import FiltersConfiguration, { Filter } from './FiltersConfiguration';
import { HiMagnifyingGlass, HiTrash } from 'react-icons/hi2';
import ThoughtSpotObjectSearch from './Inputs/ThoughtSpotObjectSearch';
import { TSLoginContext } from '../App';
import KPIChartConfiguration, { KPIChart } from './KPIConfiguration';
import { AddButton, DeleteButton, RemoveButton, TextInput } from './Inputs/InputMenus';
import UserPermissionConfiguration, { UserPermission } from './UserPermissionConfiguration';


export interface SubMenu {
    name: string,
    icon: string,
    objects: ThoughtSpotObject[],
    worksheet: string,
    filters: Filter[],
    kpiChart: KPIChart,
    sage: Sage,
    userPermissions: UserPermission[],
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
        <div className='flex flex-col space-y-2 rounded-lg p-2 bg-white'>
            <div className='flex flex-row space-x-4'>
            <IconSelection selectedIcon={subMenu.icon} setSelectedIcon={(icon) => setSubMenu({...subMenu, icon})}/>
            <TextInput label="Name" value={subMenu.name} setValue={(name) => setSubMenu({...subMenu, name})}/>
            <div className='flex flex-row mb-2'>
                <TextInput label="Worksheet" value={subMenu.worksheet} setValue={(worksheet) => setSubMenu({...subMenu, worksheet})} />
                <div className='flex flex-row items-end'>
                <button
                    className={(isLoggedIn ? "bg-blue-500 hover:bg-blue-700" : "bg-slate-400") + " text-white font-bold h-8 px-4 rounded ml-2"}
                    onClick={() => setWorksheetSearchVisible(!worksheetSearchVisible)}
                    disabled={!isLoggedIn}
                >
                    <HiMagnifyingGlass />
                </button>
                </div>
            </div>
            <div className='flex flex-row w-full justify-end space-x-4 mt-2'>
                <button
                    className="w-24 h-10 bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? "Collapse" : "Expand"}
                </button>
                <DeleteButton onClick={() => deleteSubMenu(subMenu)}/>
            </div>
        
        </div>
        {worksheetSearchVisible && (
                <ThoughtSpotObjectSearch
                    TSURL={TSURL}
                    type={ThoughtSpotObjectType.WORKSHEET}
                    setObject={(object) => setSubMenu({...subMenu, worksheet: object.uuid})}
                    closePopup={()=>setWorksheetSearchVisible(false)} />
                )}
        {showDetails && (
            <>
            <div className='flex flex-col mt-8 border-t-2 p-4'>

                <label className='font-bold text-xl pt-2'>Links</label>
                <div className='flex flex-col space-y-2'>
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
                            <RemoveButton onClick={() => setSubMenu({...subMenu, objects: subMenu.objects.filter((_, i) => i !== index)})}/>
                        </div>
                    ))}
                    <AddButton label={"Add Link"} onClick={() => setSubMenu({...subMenu, objects: [...subMenu.objects, {name: "", uuid: "", type: ThoughtSpotObjectType.LIVEBOARD}]})}/>
                </div>
            </div>
            <div className='flex flex-col mt-8 border-t-2 p-4'>
                <SageConfiguration
                    sage={subMenu.sage}
                    setSage={(sage) => setSubMenu({...subMenu, sage})}
                />
            </div>
            <div className='flex flex-col mt-8 border-t-2 p-4'>
                <FiltersConfiguration filters={subMenu.filters} setFilters={(filters) => setSubMenu({...subMenu, filters})}
                />
            </div>
            <div className='flex flex-col mt-8 border-t-2 p-4'>
                <KPIChartConfiguration kpi={subMenu.kpiChart} setKPI={(kpi) => setSubMenu({...subMenu, kpiChart: kpi})}/>
            </div>
            <div className='flex flex-col mt-8 border-t-2 p-4'>
                <UserPermissionConfiguration permissions={subMenu.userPermissions} setPermissions={(userPermissions) => setSubMenu({...subMenu, userPermissions})}/>
            </div>

        </>
        
        )}

        </div>
    )}
    </TSLoginContext.Consumer>
    );
        
};

export default SubMenuConfiguration;