import React, { useState } from 'react';

export interface ThoughtSpotObject {
    name: string,
    uuid: string,
    type: ThoughtSpotObjectType,
}
export enum ThoughtSpotObjectType {
    LIVEBOARD = "liveboard",
    ANSWER = "answer",
}
export interface ThoughtSpotObjectConfigurationProps {
    object: ThoughtSpotObject,
    setObject: (object: ThoughtSpotObject) => void
}
const ThoughtSpotObjectConfiguration: React.FC<ThoughtSpotObjectConfigurationProps>  = ({object, setObject}) => {
    return (
        <div className='flex flex-row space-x-2'>
        <div className='flex flex-col'>            
        <label>Name</label>
        <input
            className="border-2 border-gray-200 w-46 h-8 rounded-md bg-white"
            type="text"
            value={object.name}
            onChange={(e) => setObject({...object, name: e.target.value})}
        />
        </div>                
        <div className='flex flex-col'>
        <label>UUID</label>
        <input
            className="border-2 border-gray-200 w-46 h-8 rounded-md bg-white" 
            type="text"
            value={object.uuid}
            onChange={(e) => setObject({...object, uuid: e.target.value})}
        />
        </div>
        <div className='flex flex-col'>
        <label>Type</label>
        <select
            className="border-2 border-gray-200 w-32 h-8 rounded-md bg-white"
            value={object.type}
            onChange={(e) => setObject({...object, type: e.target.value as ThoughtSpotObjectType})}
        >
            <option value={ThoughtSpotObjectType.LIVEBOARD}>Liveboard</option>
            <option value={ThoughtSpotObjectType.ANSWER}>Answer</option>
        </select>
        </div>
        </div>
    );

}
export default ThoughtSpotObjectConfiguration;