import IconSelection from "./IconSelection";

interface Favorites {
    enabled: boolean,
    name: string,
    icon: string,
}

interface FavoritesConfigProps {
    favorites: Favorites,
    setFavorites: (favorites: Favorites) => void
}

const FavoritesConfig: React.FC<FavoritesConfigProps> = ({favorites, setFavorites}) => {
    return (
        <div className={(favorites.enabled ? 'bg-slate-100' : 'bg-gray-200') + ' flex flex-col space-y-2 border-2 rounded-lg p-2'}>
            <div className='flex flex-row space-x-4'>

                <div className='flex flex-col'>
                    <label className='font-bold'>Icon</label>
                    <IconSelection selectedIcon={favorites.icon} setSelectedIcon={(icon) => setFavorites({...favorites, icon})}/>
                </div>
                <div className='flex flex-col'>
                    <label className='font-bold'>Name</label>
                    <input
                        className="border-2 border-gray-200 text-xl p-1 rounded-lg"
                        type="text"
                        value={favorites.name}
                        onChange={(e) => setFavorites({...favorites, name: e.target.value})}
                    />
                </div>
                <div className='flex flex-row w-full justify-end items-center'>
                    <div className='flex flex-col mr-8 text-slate-400 font-bold'>
                        Favorites
                    </div>
                    <button 
                        onClick={() => setFavorites({...favorites, enabled: !favorites.enabled})}
                    className={(favorites.enabled ? "bg-green-400 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-400") +"w-24 h-12 text-black hover:text-white font-bold py-2 px-4 rounded"}>
                        {favorites.enabled ? "Enabled" : "Disabled"}
                    </button>
                </div>
            </div>
        </div>
    );

}