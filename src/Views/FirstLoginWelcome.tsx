import GitSettings from "../Settings/Git/GitSettings";

interface FirstLoginWelcomeProps {
    setShowSettings: (showSettings: boolean) => void,
    setSettings: (settings: any) => void
}
const FirstLoginWelcome: React.FC<FirstLoginWelcomeProps> = ({setShowSettings,setSettings}) => {
    return (
        <div className='flex flex-col align-center  justify-center items-center'>
            <div className="text-4xl font-bold mb-12">
                Welcome to the Demo Builder!
            </div>
            <div className='text-lg mb-12'>
                This is your first time logging in.
                You need to load some settings to get started.
            </div>
        
            <div className='text-lg font-bold mb-4'>
                Load a Pre-Built Configuration
            </div>
            <div style={{width:'600px'}}>
                <GitSettings showAsList={true} setSettings={setSettings}/>
            </div>    
            <div className='text-lg font-bold mt-12 mb-4'>
                Start From Scratch
            </div>
        
            <button 
                onClick={() => setShowSettings(true)}
                className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'>
                Open Settings
            </button>

        </div>
    )
}
export default FirstLoginWelcome;