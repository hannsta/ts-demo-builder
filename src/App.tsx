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
import { AuthStatus, AuthType, HostEvent, LogLevel, RuntimeFilter, RuntimeFilterOp, init } from '@thoughtspot/visual-embed-sdk';
import { LiveboardEmbed, PreRenderedLiveboardEmbed, PreRenderedSageEmbed, SageEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';
import AskSage from './Views/AskSage';
import MyReports from './Views/RestReportsList';
import RestReportsList from './Views/RestReportsList';
import SageQuestionPrompt from './Views/SageQuestionPrompt';

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
  homePage: true,
  favorites: true,
  myReports: true
}
function App() {
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [selectedThoughtSpotObject, setSelectedThoughtSpotObject] = useState<ThoughtSpotObject | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showSage, setShowSage] = useState<boolean>(false);
  const [sagePrompt, setSagePrompt] = useState<string>('');

  const liveboardEmbedRef = useEmbedRef<typeof LiveboardEmbed>();
  const sageEmbedRef = useEmbedRef<typeof SageEmbed>();
  useEffect(() => {
    let sageEmbed = document.getElementById("tsEmbed-pre-render-wrapper-sageEmbed");
    if (!sageEmbed) return;
    if (showSage){
        setTimeout(() => {
            if (sageEmbed){
                sageEmbed.style.zIndex = "20";
            }
        }, 500);
    }else{
        sageEmbed.style.zIndex = "0";
    }
  }, [showSage])
  useEffect(() => {
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
            customCSS: {
                variables: {
                    "--ts-var-root-background": 'none',
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
  const updateFilters = (runtimeFilters: RuntimeFilter[]) =>{
    if (sageEmbedRef.current){
       var element: any = document.querySelector("#tsEmbed-pre-render-wrapper-liveboardEmbed")
       if (element && element.__tsEmbed){
        element.__tsEmbed.trigger(HostEvent.UpdateRuntimeFilters, runtimeFilters);
      }
    }
  }
  return (
    <>
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
            <AskSage isLoggedIn={isLoggedIn} settings={settings} subMenu={selectedPage?.subMenu ? selectedPage.subMenu : null} setShowSage={setShowSage}/>
            {showSage && (
                <div className="absolute bg-white top-0 right-0 flex flex-col p-2 z-20 overflow-auto" style={{height:'calc(100vh - 4rem)',marginTop:'4rem',width:'600px',borderLeft:'1px solid #cccccc'}}>
                    {/* close button */}
                    <div className="flex flex-row ">
                        <button onClick={()=>setShowSage(false)}>X</button>
                    </div>
                    <SageQuestionPrompt setSagePrompt={setSagePrompt} subMenu={selectedPage?.subMenu ? selectedPage.subMenu : null}/>
                    <SageEmbed
                        preRenderId="sageEmbed"   
                        dataSource={selectedPage?.subMenu ? selectedPage.subMenu.worksheet : ''}
                        frameParams={{width: '100%', height: '100%'}}
                        searchOptions={{
                            searchQuery: sagePrompt,
                            executeSearch: true
                          }}
                        
                        />
                </div>                
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowSettings(!showSettings)}
            >
              Settings
            </button>
          </div>
          {showSettings && (
              <>
                <div className="absolute bg-white right-0 flex p-2 z-70 overflow-auto" style={{top:'4rem',height:'calc(100vh - 4rem)',borderLeft:'1px solid #cccccc'}}>
                  <SettingsConfiguration settings={settings} setSettings={setSettings} />
                </div>
              </>
            )}
        </div>
      </header>
      <div className="absolute flex flex-row" style={{height:'calc(100vh - 4rem)', width:'100vw', top:'4rem'}}>
          
          <LeftNav settings={settings} setSelectedPage={setSelectedPage}/>
          <div className='absolute' style={{left:'4rem', width:'calc(100vw - 4rem)', height: 'calc(100vh - 4rem)'}}>
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
              {selectedThoughtSpotObject && (
                <ThoughtSpotObjectView setShowSage={setShowSage} updateFilters={updateFilters} settings={settings} type={selectedPage?.type ? selectedPage.type : null} subMenu={selectedPage?.subMenu ? selectedPage.subMenu : null} thoughtSpotObject={selectedThoughtSpotObject}/>
              )}
            </div>
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

                  
    </>
  );
}

export default App;
