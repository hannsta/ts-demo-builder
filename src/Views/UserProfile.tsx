import { HiUser } from "react-icons/hi2";
import { User } from "../Settings/UserConfiguration";
import { SettingsContext } from "../App";
import { useState } from "react";

interface UserProfileProps {
    user: User,
    setUser: (user: User) => void
}
const UserProfile: React.FC<UserProfileProps> = ({user, setUser}) => {
    const [userSelectionVisible, setUserSelectionVisible] = useState<boolean>(false);
    return (
        <SettingsContext.Consumer>
            {({settings}) => (
                <>
                <div className="flex-row flex items-center space-x-4">
                    <div className='text-lg font-bold' style={{color:settings.style.headerTextColor}}>{user.name}</div>
                    <div onClick={()=>setUserSelectionVisible(!userSelectionVisible)} className='hover:border-blue-500 hover:cursor-pointer w-12 h-12 p-2 flex bg-white border-2 text-3xl items-center justify-center' style={{borderRadius:'25px'}}>
                        <HiUser style={{color:settings.style.userIconColor}}/>
                    </div>
                </div>

                {userSelectionVisible && (
                    <div className='absolute'>
                        <div className='fixed inset-0' onClick={() => setUserSelectionVisible(false)}/>
                        <div style={{top:"55px",right:"-220px"}} className='absolute z-10 bg-white w-56 flex flex-col flex-wrap space-y-2 p-4 bg-white border-2 rounded-lg'>
                            {settings.users && settings.users.map((user, index) => (
                                <div key={index} className='flex flex-row items-center space-x-2 hover:cursor-pointer hover:bg-gray-200 p-2 rounded-lg' onClick={() => {setUser(user); setUserSelectionVisible(false)}}>
                                    <HiUser style={{color:settings.style.userIconColor}}/>
                                    <div>{user.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                </>
            )}
        </SettingsContext.Consumer>
    )
}
export default UserProfile;