import React, { useEffect, useState } from 'react';
import './App.css';
import SettingsConfiguration, { Settings } from './Settings/SettingsConfiguration';
import useLocalStorage from './LocalStorage';
import { SubMenu } from './Settings/SubMenuConfiguration';
import LeftNav from './Views/LeftNav';
import SubMenuView from './Views/SubMenuView';
import { ThoughtSpotObject } from './Settings/ThoughtSpotObjectConfiguration';
import ThoughtSpotObjectView from './Views/ThoughtSpotObjectView';
import { Action, AuthStatus, AuthType, EmbedEvent, HostEvent, LogLevel, RuntimeFilter, init } from '@thoughtspot/visual-embed-sdk';
import { LiveboardEmbed, PreRenderedLiveboardEmbed, PreRenderedSageEmbed, SageEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';
import RestReportsList from './Views/RestReportsList';
import SageQuestionPrompt from './Views/SageQuestionPrompt';
import LoginPopup from './Views/Popups/LoginPopup';
import { createClientWithoutAuth } from './Util';
import { HiUser, HiXMark } from 'react-icons/hi2';
import HomePageView from './Views/HomePage';
import { CSSOverrides, defaultSettings } from './Types';
import SageView from './Views/SageView';
import KPIChartView from './Views/KPIChart';
import SubMenuDetailsView from './Views/SubMenuDetailsView';
export enum PageType {
  HOME,
  FAVORITES,
  MYREPORTS,
  SUBMENU
}

export interface Page {
  type: PageType,
  subMenu?: SubMenu
}

export const TSLoginContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {}
});
export const SettingsContext = React.createContext({
  settings: {} as Settings,
  setSettings: (settings: Settings) => {}
});

function App() {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [selectedThoughtSpotObject, setSelectedThoughtSpotObject] = useState<ThoughtSpotObject | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showSage, setShowSage] = useState<boolean>(false);
  const [sagePrompt, setSagePrompt] = useState<string>('');
  const [loginPopupVisible, setLoginPopupVisible] = useState<boolean>(false);
  const liveboardEmbedRef = useEmbedRef<typeof LiveboardEmbed>();
  const sageEmbedRef = useEmbedRef<typeof SageEmbed>();
  

  const updateSageVisibility = () => {
    let sageEmbed: any = document.getElementById("tsEmbed-pre-render-wrapper-sageEmbed");
    if (!sageEmbed) return;
    if (showSage){
      setTimeout(() => {
          sageEmbed.style.zIndex = 20;
      }, 500);
    }else{
      sageEmbed.style.zIndex = 0;
    }
  }  

  useEffect(() => {
    let sageEmbed: any = document.getElementById("tsEmbed-pre-render-wrapper-sageEmbed");
    if (!sageEmbed) return;

    updateSageVisibility();
    if (sageEmbed.__tsEmbed){
        sageEmbed.__tsEmbed.on(EmbedEvent.Pin, (data: any) => {
          let liveboardId = data.data.liveboardId
          let liveboardEmbed: any = document.getElementById("tsEmbed-pre-render-wrapper-liveboardEmbed");
          liveboardEmbed.__tsEmbed.navigateToLiveboard("")
          liveboardEmbed.__tsEmbed.navigateToLiveboard(liveboardId)
        })
    }
  }, [showSage])
  useEffect(() => {
    updateSageVisibility();
    let sageEmbed: any = document.getElementById("tsEmbed-pre-render-wrapper-sageEmbed");
    if (!sageEmbed) return;
    setTimeout(() => {
      sageEmbed.__tsEmbed.syncPreRenderStyle();
    }, 500);
  },[selectedPage])
  useEffect(() => {
    updateSageVisibility();
      if (sagePrompt != ''){
          setShowSage(true);
      }
      if (sagePrompt != '' && showSage && sageEmbedRef.current){
        sageEmbedRef.current.trigger(HostEvent.UpdateSageQuery, {
              queryString: sagePrompt,
              executeSearch: true,
          })
      }

  }, [sagePrompt])
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
      logLevel: LogLevel.ERROR,
      customizations:{
        style: {
            customCSS: CSSOverrides
        }
    }

    }).on(AuthStatus.SUCCESS, () => {
      setLoginPopupVisible(false);
      setIsLoggedIn(true);
    })
    .on(AuthStatus.FAILURE, (error) => {
      console.error('Error logging in', error);
    });
    //test existing login with rest API call
    let client =  createClientWithoutAuth(settings.TSURL);
    client.getSystemInformation().then((data: any) => {
      setIsLoggedIn(true);
    }).catch((error: any) => {
      console.log("Not logged in yet");
    })
  }, [settings])
  if (!settings || !settings.style || !settings.style.headerColor){
    return <div>Loading...</div>
  }

  const pinViz = async () => {
    if (sageEmbedRef.current){
      var element: any = document.querySelector("#tsEmbed-pre-render-wrapper-liveboardEmbed")
      if (element && element.__tsEmbed){
        element.__tsEmbed.trigger(HostEvent.Pin);
      }
    }
    
  }
  const updateFilters = (runtimeFilters: RuntimeFilter[]) =>{
    if (sageEmbedRef.current){
       var element: any = document.querySelector("#tsEmbed-pre-render-wrapper-liveboardEmbed")
       if (element && element.__tsEmbed){
        element.__tsEmbed.trigger(HostEvent.UpdateRuntimeFilters, runtimeFilters);
      }
    }
  }
  return (
    <TSLoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <SettingsContext.Provider value={{settings, setSettings}}>
    <div className="App">
      <header className="fixed z-20 flex w-full h-16" style={{backgroundColor:settings.style.headerColor, borderBottom: (settings.style.headerColor == "#ffffff") ? '1px solid #cccccc' : "none"}}>
        <div className="flex flex-row justify-between w-full px-4 py-2 h-16">
          <div className="flex flex-row space-x-4">
            <img src={settings.logo} alt="logo" />
            <div className="text-2xl font-bold flex items-center">
              {settings.name}
            </div>
          </div>
          <div className='flex flex-row space-x-4'>

            <button onClick={()=>setShowSage(true)} className="flex flex-row items-center p-2 rounded-lg hover:bg-gray-200"> Ask Sage </button>

            {showSage && (
              <SageView setShowSage={setShowSage} setSagePrompt={setSagePrompt} selectedPage={selectedPage} sagePrompt={sagePrompt} />
            )}
            <div className='w-12 h-12 p-2 flex bg-white border-2 text-3xl items-center justify-center' style={{borderRadius:'25px'}}>
              <HiUser style={{color:settings.style.iconColor}}/>
            </div>
          </div>
          {showSettings && (
              <>
                <div className="absolute bg-white right-0 flex p-2 z-70 overflow-auto" style={{top:'4rem',height:'calc(100vh - 4rem)',borderLeft:'1px solid #cccccc'}}>
                  <SettingsConfiguration 
                  key={JSON.stringify(settings)}
                  setShowSettings={setShowSettings}
                  settings={settings} setSettings={setSettings} setLoginPopupVisible={setLoginPopupVisible} />
                </div>
              </>
            )}
        </div>
      </header>
      <div className="absolute flex flex-row" style={{height:'calc(100vh - 4rem)', width:'100vw', top:'4rem'}}>
          
          <LeftNav settings={settings} setSelectedPage={setSelectedPage} showSettings={showSettings} setShowSettings={setShowSettings} setThoughtSpotObject={setSelectedThoughtSpotObject}/>
          <div className='absolute' style={{left:'4rem', width:'calc(100vw - 4rem)', height: 'calc(100vh - 4rem)'}}>
            {selectedPage && selectedPage.type == PageType.HOME && isLoggedIn ?
              <HomePageView
              setSagePrompt={setSagePrompt}
              setShowSage={setShowSage}
              setSelectedPage={setSelectedPage}
              setThoughtSpotObject={setSelectedThoughtSpotObject}/>
              : 
              <>
                {selectedPage && selectedPage.subMenu && (
                  <SubMenuView settings={settings}  subMenu={selectedPage.subMenu} setThoughtSpotObject={setSelectedThoughtSpotObject}/>
                )}
                {selectedPage && selectedPage.type == PageType.MYREPORTS && (
                  <RestReportsList settings={settings} isMyReports={true} setThoughtSpotObject={setSelectedThoughtSpotObject}/>
                )}
                {selectedPage && selectedPage.type == PageType.FAVORITES && (
                  <RestReportsList settings={settings} isMyReports={false} setThoughtSpotObject={setSelectedThoughtSpotObject}/>
                )}
                <div className='absolute flex flex-col' style={{overflow:'auto',left:'15rem', width:'calc(100vw - 19rem)', height:'calc(100vh - 4rem)'}}>
                  {selectedThoughtSpotObject && isLoggedIn && (
                    <ThoughtSpotObjectView setShowSage={setShowSage} updateFilters={updateFilters} settings={settings} type={selectedPage?.type ? selectedPage.type : null} subMenu={selectedPage?.subMenu ? selectedPage.subMenu : null} thoughtSpotObject={selectedThoughtSpotObject}/>
                  )}
                  {!selectedThoughtSpotObject && isLoggedIn && selectedPage?.subMenu && (
                    <div className='p-8'>
                      <KPIChartView
                      subMenu={selectedPage?.subMenu} 
                      setSagePrompt={setSagePrompt}
                      setShowSage={setShowSage}
                      setSelectedPage={setSelectedPage}
                      setThoughtSpotObject={setSelectedThoughtSpotObject}
                      />
                      <SubMenuDetailsView subMenu={selectedPage.subMenu}/>
                      </div>
                  )}
                  {!isLoggedIn && (
                    <div className="flex flex-col items-center space-y-4 justify-center w-full h-full">
                      <div className="text-2xl font-bold">Please login to your ThoughtSpot environment to view content.</div>
                      {settings.TSURL ? (
                        <>
                        <div className="text-lg">{settings.TSURL}</div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setLoginPopupVisible(true)}>Login</button>
                        </>
                      )
                      : (
                        <>
                        <div className="text-lg">No URL Configured. Open "Settings" to configure the application.</div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowSettings(true)}>Settings</button>
                        </>
                      )}
                      {loginPopupVisible && (
                        <LoginPopup setLoginPopupVisible={setLoginPopupVisible}/>
                      )}
                    </div>
                  )           
                  
                  }
                </div>
              </>
            }
          </div>

      </div>
      </div>
      {isLoggedIn && (
        <div className='z-0'>
        <PreRenderedLiveboardEmbed
          ref={liveboardEmbedRef}
          preRenderId="liveboardEmbed"
          liveboardId="" />
        <PreRenderedSageEmbed
          visibleActions={[Action.Save, Action.Pin]}
          hideSageAnswerHeader={true}
          hideWorksheetSelector={true}
          dataSource={selectedPage?.subMenu ? selectedPage.subMenu.worksheet : ''}
          ref={sageEmbedRef}
          preRenderId="sageEmbed"
          frameParams={{width: '100%', height: '100%'}}
          searchOptions={{
              searchQuery: "what are the top products?",
              executeSearch: true
            }}
          />
        </div>
      )}
    </SettingsContext.Provider>      
    </TSLoginContext.Provider>
  );
}

export default App;
