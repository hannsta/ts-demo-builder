import { Action } from "@thoughtspot/visual-embed-sdk";
import { CheckBoxInput, CloseButton, DeleteButton, RemoveButton, SelectInput, TextInput } from "./Inputs/InputMenus";
import { useEffect, useState } from "react";
import ActionSelection from "./Inputs/ActionSelection";
export const DefaultUserRoles: UserRole[] = [
    {
        name: "Read Only",
        actions: [Action.MakeACopy, Action.ExportTML, Action.ImportTML, Action.Explore, Action.Download, Action.Edit, Action.Save, Action.Share, Action.Pin, Action.Schedule, Action.SpotIQAnalyze]
    },
    {
        name: "Analyst",
        actions: [Action.Edit, Action.Save, Action.Share, Action.Pin]
    },
    {
        name: "Power User",
        actions: []
    },
    {
        name: "Custom",
        actions: []
    }
]
interface UserRole {
    name: string,
    actions: Action[],

}
export interface User {
    name: string,
    userRole: UserRole,
    selfService: boolean,
}

interface UserConfigurationProps {
    user: User,
    setUser: (user: User) => void,
    deleteUser: (user: User) => void,
}

const UserConfiguration: React.FC<UserConfigurationProps> = ({user, setUser, deleteUser}) => {
    const [showActions, setShowActions] = useState<boolean>(false);
    return (
        <div className="flex flex-row space-x-4 bg-white rounded-lg p-2">
            
            <TextInput label="Name" value={user.name} setValue={(name) => setUser({...user, name})}/>
            <div className="w-44">
                <CheckBoxInput label="Self Service" value={user.selfService} setValue={(selfService) => setUser({...user, selfService})}/>
            </div>

            <SelectInput label="User Role" value={user.userRole.name} setValue={(role) => {
                const updatedRole = DefaultUserRoles.find((defaultRole) => defaultRole.name === role);
                if(updatedRole){
                    setUser({...user, userRole: updatedRole});
                }else{
                    setUser({...user, userRole: {name: "Custom", actions: []}});
                }
            }} options={DefaultUserRoles.map(role => role.name)}/>
            
            {user.userRole.name === "Custom" && (
                <ActionSelection user={user} setUser={setUser}/>
            )}
            <div className='flex flex-row w-full justify-end items-center'>
                <DeleteButton onClick={() => deleteUser(user)}/>
            </div>
        </div>
    )
}
export default UserConfiguration;