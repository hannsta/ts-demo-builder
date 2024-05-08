import React from 'react';
import ColorPicker from './Inputs/ColorPicker';

interface StyleConfigurationProps {
    style: Style,
    setStyle: (style: Style) => void
}
export interface Style {
    headerColor: string,
    leftNavColor: string,
    leftNavHoverColor: string,
    subMenuColor: string,
    subMenuTextColor: string,
    backgroundColor: string,
    textColor: string,
    iconColor: string,
}

const StyleConfiguration: React.FC<StyleConfigurationProps> = ({style, setStyle}) => {
    return (
        <div className='flex flex-col space-y-2 border-2 rounded-lg p-2 bg-slate-100'>
        {style && (
            <div className='flex flex-row space-x-4'>

                <div className='flex flex-col'>
                    <label>Header Color</label>
                    <ColorPicker color={style.headerColor} setColor={(color) => setStyle({...style, headerColor: color})}/>
                </div>
                <div className='flex flex-col'>
                    <label>Left Nav Color</label>
                    <ColorPicker color={style.leftNavColor} setColor={(color) => setStyle({...style, leftNavColor: color})}/>
                </div>
                <div className='flex flex-col'>
                    <label>Left Nav Hover Color</label>
                    <ColorPicker color={style.leftNavHoverColor} setColor={(color) => setStyle({...style, leftNavHoverColor: color})}/>
                </div>
                <div className='flex flex-col'>
                    <label>Background Color</label>
                    <ColorPicker color={style.backgroundColor} setColor={(color) => setStyle({...style, backgroundColor: color})}/>
                </div>
                <div className='flex flex-col'>
                    <label>Sub Menu Color</label>
                    <ColorPicker color={style.subMenuColor} setColor={(color) => setStyle({...style, subMenuColor: color})}/>
                </div>
                <div className='flex flex-col'>
                    <label>Sub Menu Text Color</label>
                    <ColorPicker color={style.subMenuTextColor} setColor={(color) => setStyle({...style, subMenuTextColor: color})}/>
                </div>
                
                <div className='flex flex-col'>
                    <label>Text Color</label>
                    <ColorPicker color={style.textColor} setColor={(color) => setStyle({...style, textColor: color})}/>
                </div>
                <div className='flex flex-col'>
                    <label>Icon Color</label>
                    <ColorPicker color={style.iconColor} setColor={(color) => setStyle({...style, iconColor: color})}/>
                </div>
            </div>
        )}

        </div>
    );
}

export default StyleConfiguration;