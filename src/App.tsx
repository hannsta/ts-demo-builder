import React, { useEffect, useState } from 'react';
import './App.css';
import SettingsConfiguration, { Settings } from './Settings/SettingsConfiguration';
import useLocalStorage from './Util/LocalStorage';
import { SubMenu } from './Settings/SubMenuConfiguration';
import LeftNav from './Views/LeftNav';
import SubMenuView from './Views/SubMenuView';
import { ThoughtSpotObject, ThoughtSpotObjectType } from './Settings/ThoughtSpotObjectConfiguration';
import ThoughtSpotObjectView from './Views/ThoughtSpotObjectView';
import { Action, AuthStatus, AuthType, EmbedEvent, HostEvent, LogLevel, RuntimeFilter, customCssInterface, init } from '@thoughtspot/visual-embed-sdk';
import { LiveboardEmbed, PreRenderedLiveboardEmbed, PreRenderedSageEmbed, PreRenderedSearchEmbed, SageEmbed, SearchEmbed, useEmbedRef } from '@thoughtspot/visual-embed-sdk/react';
import RestReportsList from './Views/RestReportsList';
import LoginPopup from './Views/Popups/LoginPopup';
import { createClientWithoutAuth } from './Util/Util';
import { HiUser, HiXMark } from 'react-icons/hi2';
import HomePageView from './Views/HomePage';
import { CSSOverrides, defaultSettings } from './Util/Types';
import SageView from './Views/SageView';
import KPIChartView from './Views/KPIChart';
import SubMenuDetailsView from './Views/SubMenuDetailsView';
import { User } from './Settings/UserConfiguration';
import UserProfile from './Views/UserProfile';
import { CleanPath, GetAvailableDemos, GetDemo } from './Settings/Git/GitSettings';
import { inject } from '@vercel/analytics';
import FirstLoginWelcome from './Views/FirstLoginWelcome';

/*  Main Application Component

  This component is the main application component that controls the entire application.
  It uses the ThoughtSpot SDK to embed ThoughtSpot objects and visualizations into the application.
  The application is configured using the settings object which is stored in local storage.
  The application is styled using Tailwind CSS and custom CSS overrides.

  The application is broken down into several components:
    - LeftNav: The left navigation bar that contains the main navigation links
    - SubMenuView: The view that displays the sub menu
    - ThoughtSpotObjectView: The view that displays the ThoughtSpot object
    - RestReportsList: The view that displays the list of reports from the REST API
    - SageView: The view that displays the Sage search bar
    - HomePageView: The view that displays the home page
    - KPIChartView: The view that displays the KPI chart
    - SubMenuDetailsView: The view that displays the sub menu details
    - UserProfile: The user profile component
    - LoginPopup: The login popup component
    - SageQuestionPrompt: The Sage question prompt component

  The application uses several contexts to manage state:
    - TSLoginContext: A context to manage the ThoughtSpot login status
    - SettingsContext: A context to manage the application settings
    - UserContext: A context to manage the application user

*/
inject();
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
// Create a context for the TS login status
export const TSLoginContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {}
});
// Create a context for the application settings
export const SettingsContext = React.createContext({
  settings: {} as Settings,
  setSettings: (settings: Settings) => {}
});
// Create a context for the application user (not related to TS user)
export const UserContext = React.createContext({
  user: {} as User,
  setUser: (user: User) => {}
});
function App() {
  //Keep settings, page, user, and thoughtspot object in local storage so they dont disappear on refresh
  const [settings, setSettings] = useLocalStorage('settings', defaultSettings);
  const [selectedPage, setSelectedPage] = useLocalStorage('page', null as Page | null);
  const [user, setUser] = useLocalStorage('user', defaultSettings.users[0]);
  const [selectedThoughtSpotObject, setSelectedThoughtSpotObject] = useLocalStorage('thoughtspotObject', null as ThoughtSpotObject | null);

  // Login status for ThoughtSpot
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Visibility states for the settings and sage embed
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showSage, setShowSage] = useState<boolean>(false);
  const [loginPopupVisible, setLoginPopupVisible] = useState<boolean>(false);

  // State for the sage prompt
  const [sageLoaded, setSageLoaded] = useState<boolean>(false);
  const [sagePrompt, setSagePrompt] = useState<string>('');

  // Embed refs for the ThoughtSpot pre-rendered embeds
  const searchEmbedRef = useEmbedRef<typeof SearchEmbed>();
  const liveboardEmbedRef = useEmbedRef<typeof LiveboardEmbed>();
  const sageEmbedRef = useEmbedRef<typeof SageEmbed>();
  
  // Function to move the sage embed to the front or back of the page
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
    setSageLoaded(false);
  },[selectedPage?.subMenu])

  useEffect(() => {
    if (selectedThoughtSpotObject && selectedThoughtSpotObject.type == ThoughtSpotObjectType.ANSWER){
      let searchEmbed: any = document.getElementById("tsEmbed-pre-render-wrapper-searchEmbed");
      if (!searchEmbed) return;

      //let navigateURL = "/embed/saved-answer/d8aac0c1-a33b-43da-b68f-afecfc91d8ce";
      let navigateURL = "embed/saved-answer/"+selectedThoughtSpotObject.uuid;
      console.log(navigateURL, "switching")
      searchEmbed.__tsEmbed.trigger(HostEvent.Navigate,navigateURL);
    }
  },[selectedThoughtSpotObject])
  // Function to reload the page when the user changes
  useEffect(() => {
    if (liveboardEmbedRef.current && user){
      setSelectedPage({
        type: PageType.HOME
      })
      window.location.reload();
    }
  },[user])

  // Update visiblity and listen for pin event when sage is selected
  useEffect(() => {
    let sageEmbed: any = document.getElementById("tsEmbed-pre-render-wrapper-sageEmbed");
    if (!sageEmbed) return;
    updateSageVisibility();
    if (sageEmbed.__tsEmbed){

      // Listen for the pin event and refresh the liveboard embed
        sageEmbed.__tsEmbed.on(EmbedEvent.Pin, (data: any) => {
          let liveboardId = data.data.liveboardId
          let liveboardEmbed: any = document.getElementById("tsEmbed-pre-render-wrapper-liveboardEmbed");
          liveboardEmbed.__tsEmbed.navigateToLiveboard("")
          liveboardEmbed.__tsEmbed.navigateToLiveboard(liveboardId)
        })
    }
  }, [showSage])

  // On page change, ensure sage visibility is correct and update the pre-rendered embed
  useEffect(() => {
    updateSageVisibility();
    let sageEmbed: any = document.getElementById("tsEmbed-pre-render-wrapper-sageEmbed");
    if (!sageEmbed) return;
    setTimeout(() => {
      sageEmbed.__tsEmbed.syncPreRenderStyle();
    }, 500);
  },[selectedPage])


  // On prompt change, update the sage embed
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

  // Get the settings from the URL path if it exists
  useEffect(() => {
    //get route from url
    let path = window.location.pathname;
    path = CleanPath(path);
    if (path != ''){
      GetAvailableDemos().then((demos) => {
        for (let i = 0; i < demos.length; i++){
          if (CleanPath(demos[i].path) == path){
            GetDemo(demos[i].path).then((demo) => {
              setSettings(demo);
            })
          }
        }
      })
    }
    if (!settings || !settings.style || !settings.style.headerColor){
      setSettings(defaultSettings);
    }
  },[])


  // Initialize the ThoughtSpot SDK when the settings are loaded
  useEffect(() => {
    if (!settings || !settings.TSURL){
      return;
    }

    // Initialize the ThoughtSpot SDK
    // Current using AuthType.None for no authentication
    init({ 
      thoughtSpotHost: settings.TSURL, 
      authType: AuthType.None,
      logLevel: LogLevel.ERROR,
      customizations:{
        style: {
            customCSSUrl: 'https://cdn.jsdelivr.net/gh/hannsta/general@latest/fonts.css',
            customCSS: CSSOverrides(settings) as customCssInterface 
        }
    }
    // On successful login - note this will only be executed when the liveboard is displayed so we first have to test with API call below.
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
  
  
  // If settings are not loaded, display a loading message
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

  // Trigger the update runtime filters event on the liveboard embed
  const updateFilters = (runtimeFilters: RuntimeFilter[]) =>{
    if (sageEmbedRef.current){

      // have to do it on the __tsembed object because the ref is broken for now.
       var element: any = document.querySelector("#tsEmbed-pre-render-wrapper-liveboardEmbed")
       if (element && element.__tsEmbed){
        element.__tsEmbed.trigger(HostEvent.UpdateRuntimeFilters, runtimeFilters);
      }
    }
  }
  return (
    <TSLoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <SettingsContext.Provider value={{settings, setSettings}}>
        <UserContext.Provider value={{user, setUser}}>
        <div className="App" style={{fontFamily:settings.style ? '"'+settings.style.fontFamily+'", sans-serif' : ""}}>
          <header className="fixed z-20 flex w-full h-16" style={{backgroundColor:settings.style.headerColor, borderBottom: (settings.style.headerColor == "#ffffff") ? '1px solid #cccccc' : "none"}}>
            <div className="flex flex-row justify-between w-full px-4 py-2 h-16">
              <div className="flex flex-row space-x-4">
                <img src={settings.logo} alt="logo" />
                <div className="text-2xl font-bold flex items-center" style={{color:settings.style.headerTextColor}}>
                  {settings.style.showHeaderName ? settings.name : ''}
                </div>
              </div>
              <div className='flex flex-row space-x-4'>

                <button onClick={()=>setShowSage(true)} style={{color:settings.style.headerTextColor}} className="flex flex-row items-center p-2 rounded-lg hover:bg-gray-200"> Ask Sage </button>

                {showSage && (
                  <SageView setShowSage={setShowSage} setSagePrompt={setSagePrompt} selectedPage={selectedPage} sagePrompt={sagePrompt} sageLoaded={sageLoaded} setSageLoaded={setSageLoaded} />
                )}
                <UserProfile setUser={setUser} user={user}/>

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
              {/* Left Navigation */}
              <LeftNav settings={settings} setSelectedPage={setSelectedPage} showSettings={showSettings} setShowSettings={setShowSettings} setThoughtSpotObject={setSelectedThoughtSpotObject}/>
            
              {/* Main Content */}
              <div className='absolute' style={{left:'4rem', width:'calc(100vw - 4rem)', height: 'calc(100vh - 4rem)'}}>
                
                {/* Home Page */}
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

                    {/* My Reports and Favorites Pages */}
                    {selectedPage && selectedPage.type == PageType.MYREPORTS &&(
                      <RestReportsList settings={settings} isMyReports={true} setThoughtSpotObject={setSelectedThoughtSpotObject}/>
                    )}
                    {selectedPage && selectedPage.type == PageType.FAVORITES && (
                      <RestReportsList settings={settings} isMyReports={false} setThoughtSpotObject={setSelectedThoughtSpotObject}/>
                    )}



                    <div className='absolute flex flex-col' style={{overflow:'auto',left:'15rem', width:'calc(100vw - 19rem)', height:'calc(100vh - 4rem)'}}>
                      
                      {/* ThoughtSpot Object View */}
                      {selectedThoughtSpotObject && isLoggedIn && (
                        <ThoughtSpotObjectView user={user} setShowSage={setShowSage} updateFilters={updateFilters} settings={settings} type={selectedPage?.type ? selectedPage.type : null} subMenu={selectedPage?.subMenu ? selectedPage.subMenu : null} thoughtSpotObject={selectedThoughtSpotObject}/>
                      )}

                      {/* Sub Menu Landing Page */}
                      {!selectedThoughtSpotObject && isLoggedIn && selectedPage?.subMenu && (
                        <div style={{backgroundColor:settings.style.backgroundColor}} className='p-8 h-full'>
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

                      {/* Not Logged In Page */}
                      {!isLoggedIn && (
                        <div className="flex flex-col items-center space-y-4 justify-center w-full h-full">
                          {settings.TSURL && settings.TSURL != '' ? (
                            <>
                            <div className="text-2xl font-bold">Please login to your ThoughtSpot environment to view content.</div>
                            <div className="text-lg">{settings.TSURL}</div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setLoginPopupVisible(true)}>Login</button>
                            </>
                          )
                          : (
                            <FirstLoginWelcome setSettings={setSettings} setShowSettings={setShowSettings}/>
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

          {/*
            Generate the pre-rendered embeds for the liveboard and sage embeds
            These are hidden and only used to pre-render the embeds before they are shown 
          */}
          {isLoggedIn && (
            <div className='z-0'>
            <PreRenderedLiveboardEmbed
              key={user.name}
              ref={liveboardEmbedRef}
              hiddenActions={user.userRole.actions}
              preRenderId="liveboardEmbed"
              liveboardId={''}//selectedThoughtSpotObject?.type == ThoughtSpotObjectType.LIVEBOARD && selectedThoughtSpotObject?.uuid ? selectedThoughtSpotObject.uuid : ''
              />
            {/* <PreRenderedSearchEmbed
                answerId={''}//selectedThoughtSpotObject?.type == ThoughtSpotObjectType.ANSWER &&  selectedThoughtSpotObject?.uuid ? selectedThoughtSpotObject.uuid : ''
                ref={searchEmbedRef}
                dataSource={selectedPage?.subMenu ? selectedPage.subMenu.worksheet : ''} 
                preRenderId={'searchEmbed'}
                frameParams={{width:'100%',height:'100%'}}
            /> */}
              
            <PreRenderedSageEmbed
              visibleActions={[Action.Save, Action.Pin]}
              hideSageAnswerHeader={true}
              hideWorksheetSelector={true}
              dataSource={selectedPage?.subMenu ? selectedPage.subMenu.worksheet : ''}
              ref={sageEmbedRef}
              preRenderId="sageEmbed"
              frameParams={{width: '100%', height: '100%'}}
              />
            </div>
          )}
      </UserContext.Provider>
    </SettingsContext.Provider>      
    </TSLoginContext.Provider>
  );
}

export default App;
