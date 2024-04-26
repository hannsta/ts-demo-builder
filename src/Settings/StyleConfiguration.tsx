import exp from 'constants';
import React from 'react';
import { SketchPicker } from 'react-color';

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

const ColorPicker: React.FC<{color: string, setColor: (color: string) => void}> = ({color, setColor}) => {
    const [showPicker, setShowPicker] = React.useState<boolean>(false);
    return (
        <div className='flex flex-col'>
            <div
                className='flex flex-row space-x-4'
                onClick={() => setShowPicker(!showPicker)}
            >
                <div className='flex flex-col'>
                    <div
                        className='flex flex-row space-x-2 items-center align-center justify-center p-2 text-2xl border-2 border-gray-200 rounded-lg hover:cursor-pointer'
                        style={{backgroundColor: color}}
                    >
                    </div>
                </div>
            </div>
            {showPicker && (
                <div className='absolute'>
                    <div
                        className='fixed inset-0'
                        onClick={() => setShowPicker(false)}
                    />
                    <div className='absolute z-10'>
                        <SketchPicker color={color} onChange={(color) => setColor(color.hex)}/>
                    </div>
                </div>
            )}
        </div>
    );
}
export default StyleConfiguration;