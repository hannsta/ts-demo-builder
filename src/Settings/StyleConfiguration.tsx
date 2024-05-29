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
        <div className='flex flex-col space-y-2 rounded-lg p-2 bg-white'>
        {style && (
            <div className='flex flex-row space-x-4'>
                <ColorPicker label="Header Color" color={style.headerColor} setColor={(color) => setStyle({...style, headerColor: color})}/>
                <ColorPicker label="Left Nav Color" color={style.leftNavColor} setColor={(color) => setStyle({...style, leftNavColor: color})}/>
                <ColorPicker label="Left Nav Hover Color" color={style.leftNavHoverColor} setColor={(color) => setStyle({...style, leftNavHoverColor: color})}/>
                <ColorPicker label="Background Color" color={style.backgroundColor} setColor={(color) => setStyle({...style, backgroundColor: color})}/>
                <ColorPicker label="Sub Menu Color" color={style.subMenuColor} setColor={(color) => setStyle({...style, subMenuColor: color})}/>
                <ColorPicker label="Sub Menu Text Color" color={style.subMenuTextColor} setColor={(color) => setStyle({...style, subMenuTextColor: color})}/>
                <ColorPicker label="Text Color" color={style.textColor} setColor={(color) => setStyle({...style, textColor: color})}/>
                <ColorPicker label="Icon Color" color={style.iconColor} setColor={(color) => setStyle({...style, iconColor: color})}/>
            </div>
        )}

        </div>
    );
}

export default StyleConfiguration;