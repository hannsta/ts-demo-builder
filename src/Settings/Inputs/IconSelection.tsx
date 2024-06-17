import { useState } from 'react';
import * as HeroIcons from 'react-icons/hi2';



/**
 * IconSelection component
 * @param selectedIcon - the currently selected icon
 * @param setSelectedIcon - function to set the selected icon
 * @returns
 * IconSelection component
 * 
 * Example usage:
 * ```tsx
 * <IconSelection selectedIcon={myReports.icon} setSelectedIcon={(icon) => setMyReports({...myReports, icon})}/>
 * ```
 *  
*/

interface IconSelectionProps {
    selectedIcon: string,
    setSelectedIcon: (icon: string) => void
}
const IconSelection: React.FC<IconSelectionProps> = ({selectedIcon, setSelectedIcon}) => {
    const [showIcons, setShowIcons] = useState<boolean>(false);
    // @ts-ignore
    const SelectedIcon: any = HeroIcons[selectedIcon];

    return (
        <div className='flex flex-col'>
        <label className='font-bold'>Icon</label>
        <div className='flex flex-col bg-white h-8 w-8'> 
            <div
                className='flex flex-row space-x-4'
                onClick={() => setShowIcons(!showIcons)}
            >
                <div className='flex flex-col'>
                    <div
                        className='w-8 h-8 flex flex-row space-x-2 items-center align-center justify-center p-1 text-xl border-2 border-gray-200 rounded-lg hover:cursor-pointer'
                    >
                        {SelectedIcon && <SelectedIcon/>}
                    </div>
                </div>
            </div>

            {showIcons && (
                <div className="relative">
                <div className="absolute">
                    <div className="fixed inset-0" onClick={() => setShowIcons(false)}/>
                    <div className="absolute z-10 bg-white w-96 flex flex-row flex-wrap space-x-4 p-4 bg-white border-2 rounded-lg">
                    {Object.keys(HeroIcons).map((icon, index) => {
                    // @ts-ignore
                    const Icon:any = HeroIcons[icon];
                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center space-y-2 hover:cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
                            onClick={() => {
                                setShowIcons(false)
                                setSelectedIcon(icon)}
                            }
                        >
                            <Icon/>
                        </div>
                    );
                })}
                </div>
            </div>           
        </div> 
            )}
    </div>
    </div>
    );
}
    

export default IconSelection;
