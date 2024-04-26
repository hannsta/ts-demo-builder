import { useState } from "react";
import { Settings } from "../Settings/SettingsConfiguration";
import * as HeroIcons from 'react-icons/hi2';
import { SubMenu } from "../Settings/SubMenuConfiguration";

interface LeftNavProps {
    settings: Settings,
    selectSubMenu: (subMenu: SubMenu) => void
}

const LeftNav: React.FC<LeftNavProps> = ({settings, selectSubMenu}) => {
    const [wideMode, setWideMode] = useState<boolean>(false);
    
    return (
        <div onMouseEnter={()=>setWideMode(true)} onMouseLeave={()=>setWideMode(false)} className={"flex flex-col p-3 " + (wideMode ? "w-80" : "w-16")} 
            style={{backgroundColor:settings.style.leftNavColor, borderRight: (settings.style.leftNavColor == "#ffffff") ? '1px solid #cccccc' : "none"}}>
        <div className="flex flex-col space-y-3">
          {settings.subMenus.map((subMenu, index) => {
            // @ts-ignore
            const SelectedIcon: any = HeroIcons[subMenu.icon];
            return (
              <div key={index} className={"flex flex-row items-centere p-1 hover:cursor-pointer rounded-md hover:font-bold"} onClick={()=>selectSubMenu(subMenu)}>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center align-center justify-center text-3xl rounded-lg hover:cursor-pointer">
                    {SelectedIcon && <SelectedIcon style={{color: settings.style.iconColor}}/>}
                  </div>
                </div>
                {wideMode && (
                    <div className="ml-3 text-lg" style={{color:settings.style.iconColor}}>
                        {subMenu.name}
                    </div>                    
                )}
                
              </div>
            );
          })}
        </div>
      </div>
    );
}
export default LeftNav;