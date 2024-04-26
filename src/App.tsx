import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SettingsConfiguration, { Settings } from './Settings/SettingsConfiguration';
import useLocalStorage from './LocalStorage';
import { SubMenu } from './Settings/SubMenuConfiguration';
import LeftNav from './Views/LeftNav';
import SubMenuView from './Views/SubMenuView';
import { ThoughtSpotObject } from './Settings/ThoughtSpotObjectConfiguration';
import ThoughtSpotObjectView from './Views/ThoughtSpotObjectView';
import { AuthStatus, AuthType, init } from '@thoughtspot/visual-embed-sdk';
import { PreRenderedLiveboardEmbed, PreRenderedSageEmbed } from '@thoughtspot/visual-embed-sdk/react';
import AskSage from './Views/AskSage';


const defaultSettings: Settings = {
  name: 'ThoughtSpot',
  TSURL: 'https://se-thoughtspot-cloud.thoughtspot.cloud/',
  logo: '',
  subMenus: [] as SubMenu[],
  style: {
    headerColor: "#000000",
    leftNavColor: "gray",
    leftNavHoverColor: "#ffffff",
    backgroundColor:  "#ffffff",
    subMenuColor:  "#ffffff",
    subMenuTextColor:  "#000000",
    textColor:  "#000000",
    iconColor:  "#000000",
  },
}
function App() {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [selectedSubMenu, setSelectedSubMenu] = useState<SubMenu | null>(null);
  const [selectedThoughtSpotObject, setSelectedThoughtSpotObject] = useState<ThoughtSpotObject | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    if (!settings || !settings.style || !settings.style.headerColor){
      setSettings(defaultSettings);
    }
  },[])
  useEffect(() => {
    if (!settings || !settings.TSURL){
      return;
    }
    init({ 
      thoughtSpotHost: settings.TSURL, 
      authType: AuthType.None,
      customizations:{
        style: {
            customCSS: {
                variables: {
                    "--ts-var-root-background": settings.style.backgroundColor,
                    "--ts-var-viz-border-radius": "5px",
                    "--ts-var-viz-box-shadow": "0 0 5px #efefef",
                },
                rules_UNSTABLE: {
                  '[data-testid="verifiedBannerId"]' : {
                    display: "none"
                  },
                  // ".pinboard-content-module__tile ":{
                  //   border: "2px solid #cccccc"
                  // }
                }
            }
        }
    }
    }).on(AuthStatus.SUCCESS, () => {
      setIsLoggedIn(true);
    }).on(AuthStatus.FAILURE, (error) => {
      console.error('Error logging in', error);
    });
  }, [settings])
  if (!settings || !settings.style || !settings.style.headerColor){
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <header className="flex h-16" style={{backgroundColor:settings.style.headerColor, borderBottom: (settings.style.headerColor == "#ffffff") ? '1px solid #cccccc' : "none"}}>
        <div className="flex flex-row justify-between w-full px-4 py-2 h-16">
          <div className="flex flex-row space-x-4">
            <img src={settings.logo} alt="logo" />
            <div className="text-2xl font-bold">
              {settings.name}
            </div>
          </div>
          <div className='flex flex-row space-x-4'>
            <AskSage settings={settings} subMenu={selectedSubMenu}/>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowSettings(!showSettings)}
            >
              Settings
            </button>
          </div>
        </div>
      </header>
      <div className="flex w-full flex-row" style={{backgroundColor:settings.style.backgroundColor,height:'calc(100vh - 4rem)'}}>
          
          <LeftNav settings={settings} selectSubMenu={setSelectedSubMenu}/>
          {selectedSubMenu && (
            <SubMenuView settings={settings}  subMenu={selectedSubMenu} setThoughtSpotObject={setSelectedThoughtSpotObject}/>
          )}
          <div className='flex flex-col w-full' style={{overflow:'auto'}}>
            {selectedThoughtSpotObject && (
              <ThoughtSpotObjectView settings={settings} thoughtSpotObject={selectedThoughtSpotObject}/>
            )}
          </div>

          {showSettings && (
            <>
              <div className="absolute bg-white top-0 right-0 flex p-2 z-50 overflow-auto" style={{height:'calc(100vh - 4rem)',marginTop:'4rem',borderLeft:'1px solid #cccccc'}}>
                <SettingsConfiguration settings={settings} setSettings={setSettings} />
              </div>
            </>
          )}
      </div>
      {isLoggedIn && (
        <>
        <PreRenderedLiveboardEmbed
        preRenderId="liveboardEmbed"
        liveboardId="" />
        <PreRenderedSageEmbed
        preRenderId="sageEmbed"
        />
        </>
      )}

                    
    </div>
  );
}

export default App;
