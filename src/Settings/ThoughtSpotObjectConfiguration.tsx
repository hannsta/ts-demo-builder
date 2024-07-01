import React, { useEffect, useState } from 'react';
import * as HeroIcons from 'react-icons/hi2';
import ThoughtSpotObjectSearch from './Inputs/ThoughtSpotObjectSearch';
import { TSLoginContext } from '../App';
import { SelectInput, TextInput } from './Inputs/InputMenus';

export interface ThoughtSpotObject {
    name: string,
    uuid: string,
    type: ThoughtSpotObjectType,
}
export enum ThoughtSpotObjectType {
    LIVEBOARD = "liveboard",
    ANSWER = "answer",
    WORKSHEET = "worksheet"
}
export interface ThoughtSpotObjectConfigurationProps {
    object: ThoughtSpotObject,
    setObject: (object: ThoughtSpotObject) => void
}
const ThoughtSpotObjectConfiguration: React.FC<ThoughtSpotObjectConfigurationProps>  = ({object, setObject}) => {
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    useEffect(() => {
        setSearchVisible(false);
    }, [object]);
    return (
        <TSLoginContext.Consumer>
            {({isLoggedIn}) => (
        <div className='flex flex-row space-x-2'>
            <TextInput label="Name" value={object.name} setValue={(name) => setObject({...object, name})}/>
            <TextInput label="UUID" value={object.uuid} setValue={(uuid) => setObject({...object, uuid})}/>
            <SelectInput label="Type" value={object.type} setValue={(type: any) => setObject({...object, type})} options={[ThoughtSpotObjectType.LIVEBOARD, ThoughtSpotObjectType.ANSWER]}/>

            <div className='flex flex-col'>
            <label>Search</label>
            <button
                className={(isLoggedIn ? "bg-blue-500 hover:bg-blue-700 " : "bg-slate-400 ") +  "text-white font-bold h-8 px-4 rounded ml-2"}
                onClick={() => setSearchVisible(!searchVisible)}
                disabled={!isLoggedIn}
            >
                <HeroIcons.HiMagnifyingGlass />
            </button>
            </div>
            {searchVisible && (
                <ThoughtSpotObjectSearch type={object.type} setObject={setObject} closePopup={()=>setSearchVisible(false)}/>
            )}
        </div>
        )}
        </TSLoginContext.Consumer>
    );

}
export default ThoughtSpotObjectConfiguration;

