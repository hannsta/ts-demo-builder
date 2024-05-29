import { HiLockClosed, HiLockOpen, HiUser } from "react-icons/hi2";
import { SettingsContext } from "../App";
import { AddButton } from "./Inputs/InputMenus";
import { User } from "./UserConfiguration";
import { useEffect } from "react";

interface UserPermissionConfigurationProps {
    permissions: UserPermission[],
    setPermissions: (permissions: UserPermission[]) => void
}
export interface UserPermission {
    user: User,
    denied: boolean,
}
const UserPermissionConfiguration: React.FC<UserPermissionConfigurationProps> = ({permissions, setPermissions}) => {
    useEffect(() => {
        if(!permissions){
            setPermissions([]);
        }
    },[]);
    return (
        <SettingsContext.Consumer>
            {({settings}) => (
                <div className='flex flex-col space-y-2 rounded-lg bg-white'>
                <label className='font-bold text-xl mb-2'>Users</label>
                {permissions && (
                    <div className='flex flex-col space-y-2'>
                        {settings.users.map((user, index) => (
                            <div key={index} className='flex flex-row items-center space-x-2 hover:cursor-pointer hover:bg-gray-200 p-2 rounded-lg' onClick={() => {
                                const updatedPermissions = [...permissions];
                                const permission = updatedPermissions.find((permission) => permission.user.name === user.name);
                                if(permission){
                                    permission.denied = !permission.denied;
                                }else{
                                    updatedPermissions.push({user, denied: false});
                                }
                                setPermissions(updatedPermissions);
                            }
                            }>
                                <div className='w-8 h-8 p-2 flex bg-white border-2 text-3xl items-center justify-center' style={{borderRadius:'25px'}}>
                                    <HiUser style={{color:settings.style.iconColor}}/>
                                </div>
                                <div className="w-36">{user.name}</div>
                                <div>{permissions.find((permission) => permission.user.name === user.name)?.denied ? <HiLockClosed className="h-8 w-8 text-red-500"/> : <HiLockOpen className="h-8 w-8 text-gray-500"/>}</div>
                            </div>
                            ))}
                    </div>
                )}
                </div>
            )}
        </SettingsContext.Consumer>
    );
}
export default UserPermissionConfiguration;