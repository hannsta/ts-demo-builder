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
        <div className='flex flex-col space-y-2 rounded-lg border-2 p-4 bg-white'>
            <div className='flex flex-row space-x-4 w-full'>
                <div className='flex flex-col'>
                    <label className='font-bold text-xl mb-4'>Ask Sage</label>
                    <div className="flex flex-row items-center">
                    <input
                        className="border-2 border-gray-200 h-6 w-6 rounded-lg bg-white m-2"
                        type="checkbox"
                        checked={sage.askSage}
                        onChange={(e) => setSage({...sage, askSage: e.target.checked})}
                    />
                    <div className={"text-lg "+(sage.askSage ? "text-green-400" : "text-gray-400")}>{sage.askSage ? "Enabled" : "Disabled"}</div>
                    </div>

                    {sage.askSage && (
                        <>
                            <label>Sample Questions</label>
                            <div className='flex flex-col space-y-2 mb-4'>
                            {sage.askSage && sage.sampleQuestions.map((question, index) => (
                                <div className='flex w-full flex-row'>
                                <input
                                    key={index}
                                    className="border-2 border-gray-200 w-96 mr-2 h-8 rounded-md bg-white"  
                                    type="text"
                                    value={question}
                                    onChange={(e) => {
                                        const updatedQuestions = [...sage.sampleQuestions];
                                        updatedQuestions[index] = e.target.value;
                                        setSage({...sage, sampleQuestions: updatedQuestions});
                                    }}
                                />
                                <button
                                    className="w-24 bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-1 px-4 rounded"
                                    onClick={() => {
                                        const updatedQuestions = [...sage.sampleQuestions];
                                        updatedQuestions.splice(index, 1);
                                        setSage({...sage, sampleQuestions: updatedQuestions});
                                    }}
                                >
                                    Remove
                                </button>

                                </div>
                            ))}
                            </div>
                            <button
                                className="w-36 bg-gray-200 hover:bg-gray-400 text-black hover:text-white font-bold py-2 px-4 rounded"
                                onClick={() => setSage({...sage, sampleQuestions: [...sage.sampleQuestions, ""]})}
                            >
                                Add Question
                            </button>
                        </>   
                    )}

                </div>
            </div>
        </div>
    );
}
export default SageConfiguration;