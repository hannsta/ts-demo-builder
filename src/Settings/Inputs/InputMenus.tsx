import { useEffect, useRef, useState } from "react"
import { HiInformationCircle, HiTrash, HiXMark } from "react-icons/hi2"
import { convertBase64 } from "../../Util/Util"

// Generic Input Components
// These components are used to create input menus for various settings and configurations


// Text Input Component
interface TextInputProps {
    label: string,
    value: string,
    placeholder?: string,
    helpInfo?: string,
    setValue: (value: string) => void
}
const TextInput: React.FC<TextInputProps> = ({label, value, placeholder, helpInfo, setValue}) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row space-x-2">
            <label className='font-bold'>{label}
            </label>
            {helpInfo && <HelperInfo text={helpInfo}></HelperInfo>}
            </div>
            <input
            placeholder={placeholder}
             className="border-2 border-gray-200 w-64 text-md bg-slate-50 p-1 h-8 rounded-lg" type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
    )
}
// Text Input Component
interface TextAreaInputProps {
    label: string,
    value: string,
    placeholder?: string,
    helpInfo?: string,
    setValue: (value: string) => void
}
const TextAreaInput: React.FC<TextAreaInputProps> = ({label, value, placeholder, helpInfo, setValue}) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row space-x-2">
            <label className="font-bold mb-1">{label}
            </label>
            {helpInfo && <HelperInfo text={helpInfo}></HelperInfo>}
            </div>
            <textarea
                placeholder={placeholder}
                className="border-2 border-gray-200 w-96 h-32 text-md bg-slate-50 p-2 rounded-lg resize-y"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
// Checkbox Input Component
interface CheckBoxInputProps {
    label: string,
    value: boolean,
    setValue: (value: boolean) => void
}
const CheckBoxInput: React.FC<CheckBoxInputProps> = ({label, value, setValue}) => {
    return (
        <div className="flex flex-col w-48">
            <label className='font-bold'>{label}</label>
            <input
                className="border-2 bg-slate-50 border-gray-200 h-6 w-6 m-1 rounded-lg "
                type="checkbox"
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
            />
        </div>
    )
}
// Select Input Component
interface SelectInputProps {
    label: string,
    value: string,
    setValue: (value: string) => void
    options: string[]
}
const SelectInput: React.FC<SelectInputProps> = ({label, value, setValue, options}) => {
    return (
        <div className="flex flex-col">
            <label className='font-bold'>{label}</label>
            <select className="border-2 bg-slate-50 border-gray-200 w-32 h-8 rounded-md" value={value} onChange={(e) => setValue(e.target.value)}>
                {options.map(option => <option key={option}>{option}</option>)}
            </select>
        </div>
    )
}

//  Red Button Components
interface DeleteButtonProps {
    onClick: () => void
}
const DeleteButton: React.FC<DeleteButtonProps> = ({onClick}) => 
{
    return (
        <button
            className=" h-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
            <HiTrash />
        </button>
    )
}
//  Smaller Red Button Component
interface RemoveButtonProps {
    onClick: () => void
}
const RemoveButton: React.FC<RemoveButtonProps> = ({onClick}) => 
{
    return (
        <div className="flex items-end">
        <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold h-8  px-4 rounded ml-2"
    onClick={onClick}><HiTrash />
        </button>
        </div>
    )
}
// Add Button Component
interface AddButtonProps {
    label: string,
    isPrimary?: boolean,
    onClick: () => void
}
const AddButton: React.FC<AddButtonProps> = ({label, isPrimary, onClick}) => 
{
    return (
        <button
        className={(isPrimary ? "bg-blue-500 hover:bg-blue-700 text-white" : "border-2 border-blue-500 bg-white hover:text-blue-700 text-blue-500") + " font-bold py-1 px-2 rounded w-36"}
        onClick={onClick}
    >
        {label}
    </button>
    )
}
interface HelperInfoProps {
    text: string
}
const HelperInfo: React.FC<HelperInfoProps> = ({ text }) => {
    const [canSeeInfo, setCanSeeInfo] = useState<boolean>(false);

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setCanSeeInfo(true)}
            onMouseLeave={() => setCanSeeInfo(false)}
        >
            <HiInformationCircle className="text-gray-500 hover:text-gray-700 cursor-pointer" />

            {canSeeInfo && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 shadow-lg">
                    {text}
                </div>
            )}
        </div>
    );
};
interface CloseButtonProps {
    onClick: () => void
}
const CloseButton: React.FC<CloseButtonProps> = ({onClick}) => {
    return (
        <button
        className="text-blue-600 hover:text-blue-800 font-bold text-2xl py-4 px-4 rounded"
        onClick={onClick}
        >
            <HiXMark/>
        </button>
    )
}
interface ImageInputProps {
    label: string,
    value: string,
    setValue: (value: string) => void
}
const ImageInput: React.FC<ImageInputProps> = ({label, value, setValue}) => {
    const [isImage, setIsImage] = useState(false)
    useEffect(() => {
        if(value && value.startsWith('data:image')){
            setIsImage(true);
        }
    }
    , [value])
    const imageInput = useRef<HTMLInputElement>(null);
    const handleFileRead = async (event:any) => {
        const file = event.target.files[0]
        const base64:any = await convertBase64(file)
        setValue(base64);
    }
    return (
        <div className="flex flex-col">
        <label className="font-bold mt-2">
            {label + " - "}
            <span onClick={()=>setIsImage(true)} className={(isImage ? 'text-black ' :'text-gray-400  ')+ "hover:cursor-pointer"}>Image </span> 
            <span onClick={()=>setIsImage(false)} className={(isImage ? 'text-gray-400  ' :'text-black ')+ "hover:cursor-pointer"}>URL</span>
        </label>
        {!isImage ?
        <input className="border-2 border-gray-200 w-64 text-md bg-slate-50 p-1 h-8 rounded-lg" type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        :
        <div className="flex flex-col">
        <img src={value} alt={label} onClick={()=>imageInput.current?.click()} className="w-24 h-24 hover:cursor-pointer border-2 rounded-md bg-slate-100"/>
        <input className=" upload-file" ref={imageInput} type="file" name="file" 
                            id="file"
                            onChange={handleFileRead}
                            style={{display:'none'}}
                            formEncType="multipart/form-data" 
                            required/>
        </div>
        }
        </div>
    )
}
export {TextInput, HelperInfo, TextAreaInput, CheckBoxInput, SelectInput, DeleteButton, RemoveButton, AddButton, CloseButton, ImageInput};
