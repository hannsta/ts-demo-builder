
import IconSelection from "../Inputs/IconSelection";
import { TextInput } from "../Inputs/InputMenus";
export interface HomePage {
    enabled: boolean,
    name: string,
    icon: string
}
export interface HomePageConfigProps {
    homePage: HomePage,
    setHomePage: (homePage: HomePage) => void
}
const HomePageConfig: React.FC<HomePageConfigProps> = ({homePage, setHomePage}) => {

    return (
        <div className={(homePage.enabled ? 'bg-white' : 'bg-gray-200') + ' flex flex-col space-y-2 rounded-lg p-2'}>
            <div className='flex flex-row space-x-4'>
                <IconSelection selectedIcon={homePage.icon} setSelectedIcon={(icon) => setHomePage({...homePage, icon})}/>
                <TextInput label="Name" value={homePage.name} setValue={(name) => setHomePage({...homePage, name})}/>
                <div className='flex flex-row w-full justify-end items-center'>
                    <div className='flex flex-col mr-8 text-slate-400 font-bold'>
                        Home Page
                    </div>
                    <div className='flex flex-col'>
                    <button
                        onClick={() => setHomePage({...homePage, enabled: !homePage.enabled})} 
                        className={(homePage.enabled ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-400") + "w-24 h-10 text-white hover:text-white font-bold py-2 px-4 rounded"}>
                        {homePage.enabled ? "Enabled" : "Disabled"}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default HomePageConfig;