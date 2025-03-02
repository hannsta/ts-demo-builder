import { Settings } from "../Settings/SettingsConfiguration";
import { Favorites } from "../Settings/StandardMenus/FavoritesConfig";
import { MyReports } from "../Settings/StandardMenus/MyReportsConfig";
import { SubMenu } from "../Settings/SubMenuConfiguration";
import { HomePage } from "../Settings/StandardMenus/HomePageConfig";
import { DefaultUserRoles } from "../Settings/UserConfiguration";
import { StyleOptionList, StyleOptions } from "./PreBuiltStyles";
import { customCssInterface } from "@thoughtspot/visual-embed-sdk/lib/src/types";
import { SimpleSage } from "../Settings/StandardMenus/SimpleSageConfig";
import { SimpleSearch } from "../Settings/StandardMenus/SimpleSearchConfig";
import { SimpleFullApp } from "../Settings/StandardMenus/SimpleFullAppConfig";

export const defaultSettings: Settings = {
    name: 'ThoughtSpot Demo Builder',
    TSURL: '',
    logo: '',
    homeImage: '',
    subMenus: [] as SubMenu[],
    style: {
      fontFamily: "Lato",
      headerColor: "#4A90E2",
      showHeaderName: true,
      leftNavColor: "#ffffff",
      backgroundColor:  "#ffffff",
      subMenuColor:  "#f3f3f3",
      subMenuTextColor:  "#000000",
      headerTextColor:  "#000000",
      iconColor:  "#4A90E2",
      userIconColor: "#4A90E2",
      textColor: "#000000",
      tileColor: "#ffffff",
      preBuiltStyle: StyleOptionList.None
    },
    homePage: {enabled: true, name: 'Home', icon: 'HiHome'} as HomePage,
    favorites: {enabled: true, name: 'Favorites', icon: 'HiStar'} as Favorites,
    myReports: {enabled: true, name: 'My Reports', icon: 'HiDocumentText', selfService: true, liveboardId: ''} as MyReports,
    simpleSage: {enabled: false, name: 'Natural Language', icon: 'HiSearchCircle', worksheet: ''} as SimpleSage,
    simpleSearch: {enabled: false, name: 'Search', icon: 'HiSearch', worksheet:''} as SimpleSearch,
    simpleFullApp: {enabled: false, name: 'Full App', icon: 'HiViewGrid', worksheet:''} as SimpleFullApp,
    users: [
      {
        name: 'Admin',
        userRole: DefaultUserRoles.find(role => role.name === 'Read Only') || DefaultUserRoles[0],
        selfService: false
      },
      {
        name: 'Analyst',
        userRole: DefaultUserRoles.find(role => role.name === 'Analyst') || DefaultUserRoles[0],
        selfService: true
      },
      {
        name: 'Power User',
        userRole: DefaultUserRoles.find(role => role.name === 'Power User') || DefaultUserRoles[0],
        selfService: true
      }
    ],
    otherSettings: {tabSwitchFrequency: 30, bodyLessSpotterName: 'Spotter', spotterName: 'Spotter'}
  }
  export const FontFamilies = [
    "Fjalla One",
    "Roboto",
    "Lato",
    "Open Sans",
    "Space Grotesk",
    "Seymour One",
    "IBM Plex Sans"
]
export const CSSOverrides = (settings: Settings) => {
  
  if (settings.style.preBuiltStyle !== StyleOptionList.None){
    let styles = StyleOptions.find(style => style.name === settings.style.preBuiltStyle)?.customCSS
    if (styles && styles.variables){
      console.log("found custom styles,", styles)
      styles.variables["--ts-var-root-font-family"] = '"'+settings.style.fontFamily+'", sans-serif' || "Arial, sans-serif"
      return styles
    }

  }
  return {
    variables: {
        "--ts-var-root-font-family": '"'+settings.style.fontFamily+'", sans-serif' || "Arial, sans-serif",
        "--ts-var-root-background": 'none',
        "--ts-var-viz-border-radius": "5px",
        "--ts-var-viz-box-shadow": "0 0 5px #efefef",
        //@ts-ignore
        "--ts-var-sage-bar-header-background-color": "#ffffff",
        "--ts-var-chip-border-radius":"5px",
        "--ts-var-button-border-radius": '5px'

    },
    rules_UNSTABLE: {
      '.answer-module__searchCurtain': {
        "background-color": 'transparent !important'
      },
      '.bk-embed-powered-by-ts-ribbon':{
        display: "none !important"
      },
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
        margin: '1rem',
        "box-shadow":"none !important"

      },
      ".eureka-ai-answer-title-description-module__aiAnswerSummary":{
        padding: '0rem'
      },
      ".eureka-ai-answer-module__aiExpandedAnswerWrapper":{
        margin: '0rem',
        "border-bottom": "none !important"
      },
      ".eureka-ai-answer-module__aiExpandedAnswerWrapper > .flex-layout-module__vertical":{
        height:"600px !important",

      },
      ".eureka-ai-answer-module__aiAnswerFooter":{
        display: "none !important"
      },
      ".answer-content-module__answerContentDivider":{
        display: "none !important"
      },
      ".ReactModal__Overlay":{
        'background':"none !important",
        'background-color': 'none !important'
      },
      '.ReactModalPortal .ReactModal__Overlay':{
        "background-color": "rgba(0, 0, 0, 0) !important"
      },
      '.ReactModal__Content':{
        "box-shadow": "0 0 55px #ddd !important",
      }

      
    }
} as customCssInterface 
}
