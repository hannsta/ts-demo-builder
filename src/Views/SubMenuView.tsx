import { Settings } from "../Settings/SettingsConfiguration";
import { SubMenu } from "../Settings/SubMenuConfiguration"
import { ThoughtSpotObject } from "../Settings/ThoughtSpotObjectConfiguration"

interface SubMenuProps {
    settings: Settings,
    subMenu: SubMenu,
    setThoughtSpotObject: (thoughtSpotObject: ThoughtSpotObject) => void
}
const SubMenuView: React.FC<SubMenuProps> = ({settings, subMenu, setThoughtSpotObject}) => {
    return (
        <div className='flex flex-col p-8 fixed w-60 space-y-4' style={{height:'calc(100vh - 4rem)', background:settings.style.subMenuColor, borderRight: (settings.style.subMenuColor == '#ffffff' || settings.style.subMenuColor == settings.style.backgroundColor) ? '1px solid #cccccc' :'none' }}>
            <div className="font-bold text-xl mb-2">{subMenu.name}</div>
            {subMenu.objects.map((object, index) => {
                return (
                    <div onClick={()=>setThoughtSpotObject(object)} className="flex flex-row space-x-2 hover:cursor-pointer hover:font-bold">
                        {object.name}
                    </div> 
                );
            })
            }
        </div>
    );
}
export default SubMenuView;