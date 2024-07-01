import { useState } from "react";
import IconSelection from "../Inputs/IconSelection";
import { TextInput } from "../Inputs/InputMenus";
import { TSLoginContext } from "../../App";

export interface SimpleFullApp {
    enabled: boolean,
    name: string,
    icon: string,
}

export interface SimpleFullAppConfigProps {
    simpleFullApp: SimpleFullApp,
    setSimpleFullApp: (simpleFullApp: SimpleFullApp) => void
}

const SimpleFullAppConfig: React.FC<SimpleFullAppConfigProps> = ({simpleFullApp, setSimpleFullApp}) => {

    if (!simpleFullApp) {
        return <div></div>
    }
    return (
        <TSLoginContext.Consumer>
        {({isLoggedIn}) => (
        <div className={(simpleFullApp.enabled ? 'bg-white' : 'bg-gray-200') + ' flex flex-col space-y-2 rounded-lg p-2'}>
            <div className='flex flex-row space-x-4'>

                <IconSelection selectedIcon={simpleFullApp.icon} setSelectedIcon={(icon) => setSimpleFullApp({...simpleFullApp, icon})}/>
                <TextInput label="Name" value={simpleFullApp.name} setValue={(name) => setSimpleFullApp({...simpleFullApp, name})}/>
                <div className='flex flex-row w-full justify-end items-center'>
                    <div className='flex flex-col mr-8 text-slate-400 font-bold'>
                        Full App
                    </div>
                    <button 
                        onClick={() => setSimpleFullApp({...simpleFullApp, enabled: !simpleFullApp.enabled})}
                    className={(simpleFullApp.enabled ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-400") + " w-24 h-10 text-white hover:text-white font-bold py-2 px-4 rounded"}>
                        {simpleFullApp.enabled ? "Enabled" : "Disabled"}
                    </button>
                </div>
            </div>
        </div>
    )}
    </TSLoginContext.Consumer>
    
    );
    

}
export default SimpleFullAppConfig;