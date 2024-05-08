import React from "react";
import { SketchPicker } from "react-color";

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
                        className='flex w-10 h-10 flex-row space-x-2 items-center align-center justify-center p-2 text-2xl border-2 border-gray-200 rounded-lg hover:cursor-pointer'
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