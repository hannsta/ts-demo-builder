import React from 'react';
import ColorPicker from './Inputs/ColorPicker';
import { CheckBoxInput, SelectInput } from './Inputs/InputMenus';
import { FontFamilies } from '../Util/Types';
import { StyleOptionList } from '../Util/PreBuiltStyles';

interface StyleConfigurationProps {
    style: Style,
    setStyle: (style: Style) => void
}
export interface Style {
    headerColor: string,
    headerTextColor: string,
    showHeaderName: boolean,
    leftNavColor: string,
    subMenuColor: string,
    subMenuTextColor: string,
    backgroundColor: string,
    iconColor: string,
    fontFamily: string,
    userIconColor: string,
    textColor: string,
    tileColor: string,
    preBuiltStyle: StyleOptionList
}

const StyleConfiguration: React.FC<StyleConfigurationProps> = ({style, setStyle}) => {
    return (
        <div className='flex flex-col space-y-2 '>
        {style && (
            <div className='flex flex-col space-y-2'
            >
                <div className={'bg-white flex flex-col space-y-1 rounded-lg p-2'}>
                    <div className='font-bold flex align-center items-center text-gray-400'>App</div>
                    <div className='flex flex-row space-x-2 mb-2'> 
                        <SelectInput label="Font Family" value={style.fontFamily} setValue={(fontFamily) => setStyle({...style, fontFamily})} options={FontFamilies}/>
                        <ColorPicker style="w-32"  label="Background" color={style.backgroundColor} setColor={(color) => setStyle({...style, backgroundColor: color})}/>
                        <ColorPicker style="w-32"  label="Text" color={style.textColor} setColor={(color) => setStyle({...style, textColor: color})}/>
                        <ColorPicker style="w-32"  label="Tile" color={style.tileColor} setColor={(color) => setStyle({...style, tileColor: color})}/>
                        <SelectInput label="Pre Built Style" value={style.preBuiltStyle} setValue={(preBuiltStyle: any) => setStyle({...style, preBuiltStyle})} options={Object.values(StyleOptionList)}/>
                    </div>
                </div>
                <div className={'bg-white flex flex-col space-y-1 rounded-lg p-2'}>
                    <div className='font-bold flex align-center items-center text-gray-400'>Header</div>
                    <div className='flex flex-row space-x-2 mb-2 '> 
                        <ColorPicker  style="w-32" label="Background" color={style.headerColor} setColor={(color) => setStyle({...style, headerColor: color})}/>
                        <ColorPicker  style="w-32" label="Text" color={style.headerTextColor} setColor={(color) => setStyle({...style, headerTextColor: color})}/>
                        <ColorPicker  style="w-32" label="User Icon" color={style.userIconColor} setColor={(color) => setStyle({...style, userIconColor: color})}/>
                        <CheckBoxInput label="Show Name" value={style.showHeaderName} setValue={(showHeaderName) => setStyle({...style, showHeaderName})}/>
                    </div>
                </div>
                <div className={'bg-white flex flex-col space-y-1 rounded-lg p-2'}>
                    <div className='font-bold flex align-center items-center text-gray-400'>Left Nav</div>
                    <div className='flex flex-row space-x-2 mb-2'>
                        <ColorPicker style="w-32"  label="Background" color={style.leftNavColor} setColor={(color) => setStyle({...style, leftNavColor: color})}/>
                        <ColorPicker style="w-32"  label="Icon Color" color={style.iconColor} setColor={(color) => setStyle({...style, iconColor: color})}/>
                    </div>
                </div>
                <div className={'bg-white flex flex-col space-y-1 rounded-lg p-2'}>
                    <div className='font-bold flex align-center items-center text-gray-400'>Sub Menu</div>
                    <div className='flex flex-row space-x-2 mb-2'>                
                        <ColorPicker style="w-32"  label="Background" color={style.subMenuColor} setColor={(color) => setStyle({...style, subMenuColor: color})}/>
                        <ColorPicker style="w-32"  label="Text" color={style.subMenuTextColor} setColor={(color) => setStyle({...style, subMenuTextColor: color})}/>
                    </div>
                </div>
            </div>
        )}

        </div>
    );
}

export default StyleConfiguration;

