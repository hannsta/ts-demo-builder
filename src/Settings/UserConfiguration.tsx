import { Action } from "@thoughtspot/visual-embed-sdk";
import { CheckBoxInput, DeleteButton, SelectInput, TextInput } from "./Inputs/InputMenus";
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
    return (
        <div className="flex flex-row space-x-4 bg-white rounded-lg p-2">
            <TextInput label="Name" value={user.name} setValue={(name) => setUser({...user, name})}/>
            <CheckBoxInput label="Self Service" value={user.selfService} setValue={(selfService) => setUser({...user, selfService})}/>
            <SelectInput label="User Role" value={user.userRole.name} setValue={(role) => setUser({...user, userRole: DefaultUserRoles.find(role => role.name === role.name) || DefaultUserRoles[0]})} options={DefaultUserRoles.map(role => role.name)}/>
            <div className='flex flex-row w-full justify-end items-center'>
                <DeleteButton onClick={() => deleteUser(user)}/>
            </div>
        </div>
    )
}
export default UserConfiguration;