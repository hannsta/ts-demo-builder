import { useState } from "react"
import IconSelection from "../Inputs/IconSelection"

export interface MyReports {
    enabled: boolean,
    name: string,
    icon: string,
    selfService: boolean
}
export interface MyReportsConfigProps {
    myReports: MyReports,
    setMyReports: (myReports: MyReports) => void
}
const MyReportsConfig: React.FC<MyReportsConfigProps> = ({myReports, setMyReports}) => {

    return (
        <div className={(myReports.enabled ? 'bg-slate-100' : 'bg-gray-200') + ' flex flex-col space-y-2 border-2 rounded-lg p-2'}>
            <div className='flex flex-row space-x-4'>

                <div className='flex flex-col'>
                    <label className='font-bold'>Icon</label>
                    <IconSelection selectedIcon={myReports.icon} setSelectedIcon={(icon) => setMyReports({...myReports, icon})}/>
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold'>Name</label>
                    <input
                        className="border-2 border-gray-200 text-xl p-1 rounded-lg"
                        type="text"
                        value={myReports.name}
                        onChange={(e) => setMyReports({...myReports, name: e.target.value})}
                    />
                </div>
                <div className='flex flex-col w-44'>
                    <label className='font-bold'>Self Service</label>
                    <input
                        className="border-2 border-gray-200 h-6 w-6 rounded-lg bg-white m-2"
                        type="checkbox"
                        checked={myReports.selfService}
                        onChange={(e) => setMyReports({...myReports, selfService: e.target.checked})}
                    />
                </div>
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