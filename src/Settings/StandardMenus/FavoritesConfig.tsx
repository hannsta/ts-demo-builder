import IconSelection from "../Inputs/IconSelection";
import { TextInput } from "../Inputs/InputMenus";

export interface Favorites {
    enabled: boolean,
    name: string,
    icon: string,
}

export interface FavoritesConfigProps {
    favorites: Favorites,
    setFavorites: (favorites: Favorites) => void
}

const FavoritesConfig: React.FC<FavoritesConfigProps> = ({favorites, setFavorites}) => {
    return (
        <div className={(favorites.enabled ? 'bg-white' : 'bg-gray-200') + ' flex flex-col space-y-2 rounded-lg p-2'}>
            <div className='flex flex-row space-x-4'>

                <IconSelection selectedIcon={favorites.icon} setSelectedIcon={(icon) => setFavorites({...favorites, icon})}/>
                <TextInput label="Name" value={favorites.name} setValue={(name) => setFavorites({...favorites, name})}/>
                <div className='flex flex-row w-full justify-end items-center'>
                    <div className='flex flex-col mr-8 text-slate-400 font-bold'>
                        Favorites
                    </div>
                    <button 
                        onClick={() => setFavorites({...favorites, enabled: !favorites.enabled})}
                    className={(favorites.enabled ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-400") + " w-24 h-10 text-white hover:text-white font-bold py-2 px-4 rounded"}>
                        {favorites.enabled ? "Enabled" : "Disabled"}
                    </button>
                </div>
            </div>
        </div>
    );

}
export default FavoritesConfig;