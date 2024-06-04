import React from "react";
import { useEffect } from "react";
import { Settings } from "../SettingsConfiguration";
import { AddButton } from "../Inputs/InputMenus";

const gitUrl = process.env.REACT_APP_GIT_URL;
const user = "hannsta"
const repo = "demo-builder-demos"
const branch = "main"

interface GitSettingsProps {
    setSettings: (settings: Settings) => void;
}
const GitSettings: React.FC<GitSettingsProps> = ({setSettings}) => {
    const [availableDemos, setAvailableDemos] = React.useState<any[]>([]);
    //{process.env.REACT_APP_NOT_SECRET_CODE} 



    useEffect(() => {
        GetAvailableDemos().then(data => {
            setAvailableDemos(data);
        });
    }
    ,[])
    return (
        <div className='flex flex-col space-y-2 rounded-lg p-2 bg-white'>
            <div className='flex flex-row space-x-4'>
                <div className='w-2/5 font-bold'>Demo Name</div>
                <div className='w-2/5 font-bold'>URL Path</div>
                <div className='w-1/5'></div>
            </div>
            {availableDemos && availableDemos.map((demo, index) => (
                <div key={index} className='flex flex-row space-x-4 items-center'>
                    <div className='w-2/5 hover:text-blue-500 hover:cursor-pointer' onClick={() => {
                            GetDemo(demo.path).then(data => {
                                setSettings(data);
                            });
                        }}>{demo.path.replace(".txt","")}</div>
                    <div className='w-2/5 hover:text-blue-500  hover:cursor-pointer'><a href={"/"+CleanPath(demo.path)}>/{CleanPath(demo.path)}</a></div>
                    <div className='w-1/5 justify-end flex'>
                        <AddButton label="Load" onClick={() => {
                            GetDemo(demo.path).then(data => {
                                setSettings(data);
                            });
                        }}></AddButton>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default GitSettings;

export const CleanPath = (path: string) => {
    return path.replaceAll(/[^\w\s]/gi, "").replaceAll(" ", "").replace("txt","").toLowerCase();
}

export const GetDemo =  async (demo: string) => {
    return await fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${demo}`).then(response => response.text()).then(data => JSON.parse(data));
}

export const GetAvailableDemos = async () => {
    return await fetch(`https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`, {
    }).then(response => response.json()).then(data => data.tree);
}