import { AddButton, DeleteButton, RemoveButton, TextInput } from "./Inputs/InputMenus";

export interface Sage{
    askSage: boolean,
    sampleQuestions: string[],
}

interface SageConfigurationProps {
    sage: Sage,
    setSage: (sage: Sage) => void
}

const SageConfiguration: React.FC<SageConfigurationProps> = ({sage, setSage}) => {
    return (
        <div className='flex flex-col space-y-2 rounded-lg bg-white'>
            <div className='flex flex-row space-x-4 w-full'>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center mb-4'>
                        <label className='font-bold text-xl mr-2'>Ask Sage</label>
                        <div className="flex flex-row  items-center">
                            <input
                                className="border-2 border-gray-200 h-6 w-6 rounded-lg bg-white m-2"
                                type="checkbox"
                                checked={sage.askSage}
                                onChange={(e) => setSage({...sage, askSage: e.target.checked})}
                            />
                            <div className={"text-lg "+(sage.askSage ? "text-green-400" : "text-gray-400")}>{sage.askSage ? "Enabled" : "Disabled"}</div>
                        </div>
                    </div>
                    {sage.askSage && (
                        <>
                            <div className='flex flex-col space-y-2 mb-2'>
                            {sage.askSage && sage.sampleQuestions.map((question, index) => (
                                <div className='flex w-full flex-row'>
                                    <TextInput label={"Sample Question "+(index+1)} value={question} setValue={(question) => {
                                        const updatedQuestions = [...sage.sampleQuestions];
                                        updatedQuestions[index] = question;
                                        setSage({...sage, sampleQuestions: updatedQuestions});
                                    }
                                    }/>
                                    <RemoveButton onClick={() => {
                                        const updatedQuestions = [...sage.sampleQuestions];
                                        updatedQuestions.splice(index, 1);
                                        setSage({...sage, sampleQuestions: updatedQuestions});
                                    }   
                                    }/>
                                </div>
                            ))}
                            </div>
                            <AddButton label="Add Question" onClick={() => setSage({...sage, sampleQuestions: [...sage.sampleQuestions, ""]})}/>

                        </>   
                    )}

                </div>
            </div>
        </div>
    );
}
export default SageConfiguration;