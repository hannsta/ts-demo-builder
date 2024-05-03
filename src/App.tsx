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
import { Action, AnswerService, AuthStatus, AuthType, EmbedEvent, HostEvent, LogLevel, RuntimeFilter, RuntimeFilterOp, init } from '@thoughtspot/visual-embed-sdk';
import { LiveboardEmbed, PreRenderedLiveboardEmbed, PreRenderedSageEmbed, SageEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';
import AskSageButton from './Views/AskSageButton';
import RestReportsList from './Views/RestReportsList';
import SageQuestionPrompt from './Views/SageQuestionPrompt';
import LoginPopup from './Views/LoginPopup';
import { createConfiguration, ServerConfiguration, ThoughtSpotRestApi } from '@thoughtspot/rest-api-sdk';
import { createClientWithoutAuth } from './Util';
import { HomePage } from './Settings/HomePageConfig';
import { MyReports } from './Settings/MyReportsConfig';
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
  homePage: {enabled: true, name: 'Home', icon: 'HiHome'} as HomePage,
  favorites: true,
  myReports: {enabled: true, name: 'My Reports', icon: 'HiDocumentReport', selfService: true} as MyReports
}
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
  useEffect(() => {
    let sageEmbed: any = document.getElementById("tsEmbed-pre-render-wrapper-sageEmbed");
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
    if (sageEmbed.__tsEmbed){
        sageEmbed.__tsEmbed.on(EmbedEvent.ALL, (data: any) => {
            console.log(data);
        })
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
                    //@ts-ignore
                    "--ts-var-sage-bar-header-background-color": "#ffffff",

                },
                rules_UNSTABLE: {
                  '[data-testid="verifiedBannerId"]' : {
                    display: "none"
                  },
                  ".eureka-search-box-module__eurekaSearchBar": {
                    borderRadius: "5px",
                    border: "1px solid #cccccc",
                  },
                  ".eureka-search-bar-module__withoutSage": {
                    padding: '1rem'
                  },
                  ".eureka-ai-answer-module__aiAnswerContainer":{
                    margin: '1rem'
                  },
                  ".eureka-ai-answer-title-description-module__aiAnswerSummary":{
                    padding: '0rem'
                  },
                  ".eureka-ai-answer-module__aiExpandedAnswerWrapper":{
                    margin: '0rem'
                  },
                  ".eureka-ai-answer-module__aiExpandedAnswerWrapper > .flex-layout-module__vertical":{
                    height:"500px !important"
                  },
                  ".eureka-ai-answer-module__aiAnswerFooter":{
                    display: "none !important"
                  }
                  
                  // ".pinboard-content-module__tile ":{
                  //   border: "2px solid #cccccc"
                  // }
                }
            }
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
        console.log('pinning viz');
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
                <div className="absolute bg-white top-0 right-0 flex flex-col p-2 z-20 overflow-auto" style={{height:'calc(100vh - 4rem)',marginTop:'4rem',width:'600px',borderLeft:'1px solid #cccccc'}}>
                    {/* close button */}
                    <div className="flex flex-row ">
                        <button onClick={()=>setShowSage(false)}>X</button>
                    </div>
                    <SageQuestionPrompt setSagePrompt={setSagePrompt} subMenu={selectedPage?.subMenu ? selectedPage.subMenu : null}/>
                    <SageEmbed
                              onData={(data) => {
                                console.log('data', data);
                              }}
                              //all actions in the Actions enum
                        preRenderId="sageEmbed"   
                        dataSource={selectedPage?.subMenu ? selectedPage.subMenu.worksheet : ''}
                        frameParams={{width: '100%', height: '100%'}}
                        searchOptions={{
                            searchQuery: sagePrompt,
                            executeSearch: true
                          }}
                        />
                    <button onClick={()=>pinViz()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pin Viz</button>
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
                  <SettingsConfiguration settings={settings} setSettings={setSettings} setLoginPopupVisible={setLoginPopupVisible} />
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
              {selectedThoughtSpotObject && isLoggedIn && (
                <ThoughtSpotObjectView setShowSage={setShowSage} updateFilters={updateFilters} settings={settings} type={selectedPage?.type ? selectedPage.type : null} subMenu={selectedPage?.subMenu ? selectedPage.subMenu : null} thoughtSpotObject={selectedThoughtSpotObject}/>
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
