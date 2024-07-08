import { useState } from "react"
import IconSelection from "../Inputs/IconSelection"
import { CheckBoxInput, TextInput } from "../Inputs/InputMenus"

export interface MyReports {
    enabled: boolean,
    name: string,
    icon: string,
    selfService: boolean,
    liveboardId: string
}
export interface MyReportsConfigProps {
    myReports: MyReports,
    setMyReports: (myReports: MyReports) => void
}
const MyReportsConfig: React.FC<MyReportsConfigProps> = ({myReports, setMyReports}) => {

    return (
        <div className={(myReports.enabled ? 'bg-white' : 'bg-gray-200') + ' flex flex-col space-y-2 rounded-lg p-2'}>
            <div className='flex flex-row space-x-4'>

                <IconSelection selectedIcon={myReports.icon} setSelectedIcon={(icon) => setMyReports({...myReports, icon})}/>
                <TextInput label="Name" value={myReports.name} setValue={(name) => setMyReports({...myReports, name})}/>
                <CheckBoxInput label="Self Service" value={myReports.selfService} setValue={(selfService) => setMyReports({...myReports, selfService})}/>
                <TextInput label="Liveboard ID" value={myReports.liveboardId} setValue={(liveboardId) => setMyReports({...myReports, liveboardId})}/>
                <div className='flex flex-row w-full justify-end items-center'>
                    <div className='flex flex-col mr-8 text-slate-400 font-bold'>
                        My Reports
                    </div>
                    <button 
                        onClick={() => setMyReports({...myReports, enabled: !myReports.enabled})}
                    className={(myReports.enabled ? "bg-green-500 hover:bg-green-600 " : "bg-gray-300 hover:bg-gray-400 ") +" w-24 h-10 text-white hover:text-white font-bold py-2 px-4 rounded"}>
                        {myReports.enabled ? "Enabled" : "Disabled"}
                    </button>
                </div>
            </div>
        </div>
    );

}
export default MyReportsConfig;