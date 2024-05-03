import { AppEmbed } from "@thoughtspot/visual-embed-sdk/react"

interface LoginPopupProps {
    setLoginPopupVisible: (visible: boolean) => void,
}
const LoginPopup: React.FC<LoginPopupProps> = ({setLoginPopupVisible}) => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg">
                <button onClick={() => setLoginPopupVisible(false)}>Close</button>
                <AppEmbed
                    frameParams={{width: '400px', height: '400px'}}
                />
            </div>
        </div>
    )

}
export default LoginPopup;
