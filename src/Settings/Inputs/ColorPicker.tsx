import React from "react";
import { SketchPicker } from "react-color";


/**
 * ColorPicker component
 * @param label - label for the color picker
 * @param color - color value
 * @param setColor - function to set the color value
 * @returns
 * ColorPicker component
 *  
 * Example usage:
 * ```tsx
 * <ColorPicker label="Header Color" color={style.headerColor} setColor={(color) => setStyle({...style, headerColor: color})}/>
 * ```
 * 
*/

interface ColorPickerProps {
    label: string;
    color: string;
    style?: string;
    setColor: (color: string) => void;
}
const ColorPicker: React.FC<ColorPickerProps> = ({label, color, style, setColor}) => {
    const [showPicker, setShowPicker] = React.useState<boolean>(false);
    return (
        <div className={(style ? style : '') + ' flex flex-col'}>
            <label className='font-bold'>{label}</label>
            <div
                className='flex flex-row space-x-4'
                onClick={() => setShowPicker(!showPicker)}
            >
                <div className='flex flex-col'>
                    <div
                        className='flex w-8 h-8 flex-row space-x-2 items-center align-center justify-center p-2 text-2xl border-2 border-gray-200 rounded-lg hover:cursor-pointer'
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
export default ColorPicker;