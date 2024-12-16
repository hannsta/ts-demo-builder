import { Action } from "@thoughtspot/visual-embed-sdk";
import { useState } from "react";
import { CloseButton } from "./InputMenus";
import { User } from "../UserConfiguration";

interface ActionSelectionProps {
    user: User,
    setUser: (user: User) => void
}
const ActionSelection: React.FC<ActionSelectionProps> = ({user, setUser}) => {
    const [showActions, setShowActions] = useState<boolean>(false);
    //set default to list of Action enum
    const [actions, setActions] = useState<Action[]>([]);
    return (
        <div className="flex flex-col">
            <label className="font-bold">Actions</label>
            
            {showActions && (
            <div className="relative">
                <div className="absolute mt-8 flex flex-col p-8 space-y-4 bg-white border-2" style={{width:"700px",right:"-100px"}}>
                <div className="flex flex-row w-full">
                <div className="font-bold text-lg w-96">Select Visible Actions</div>
                <div className="flex flex-row justify-end w-full">
                    <CloseButton onClick={() => setShowActions(false)}/>
                </div>
                </div>
                <div className="grid gap-4 grid-cols-3 align-center space-x-8">
                {Object.keys(Action).map((key, index) => {
                    const action = Action[key as keyof typeof Action]; // Get the value corresponding to the key
                    return (
                        <div 
                            key={index} 
                            className={(user.userRole.visibleActions && user.userRole.visibleActions.includes(action as Action) ? 'bg-green-400 color-white ' : '') + "flex flex-col w-48 items-center space-y-2 hover:cursor-pointer hover:bg-gray-200 p-2 rounded-lg"} 
                            onClick={() => {
                                if (!user.userRole.visibleActions) return;
                                const updatedActions = [...user.userRole.visibleActions] as Action[];
                                if(updatedActions.includes(action as Action)){
                                    updatedActions.splice(updatedActions.indexOf(action as Action), 1);
                                } else {
                                    updatedActions.push(action as Action);
                                }
                                setUser({...user, userRole: {...user.userRole, visibleActions: updatedActions}});
                            }}
                        >
                            <div>{key}</div> {/* Display the key */}
                        </div>
                    )
                })}
                </div>
            </div>
            </div>
            )}
            <div className="flex flex-row space-x-4" onClick={() => setShowActions(!showActions)}>
                <div className="h-8 flex flex-row space-x-2 items-center align-center justify-center p-1 text-xl border-2 border-gray-200 rounded-lg hover:cursor-pointer">
                    <div className="text-sm">{ user.userRole.visibleActions ? user.userRole.visibleActions.length : 0}</div>
                </div>
            </div>
        </div>
    );
}
export default ActionSelection;