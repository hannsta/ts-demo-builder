import { Settings } from "./Settings/SettingsConfiguration";
import { Favorites } from "./Settings/StandardMenus/FavoritesConfig";
import { MyReports } from "./Settings/StandardMenus/MyReportsConfig";
import { SubMenu } from "./Settings/SubMenuConfiguration";
import { HomePage } from "./Settings/StandardMenus/HomePageConfig";

export const defaultSettings: Settings = {
    name: 'ThoughtSpot Demo Builder',
    TSURL: 'https://se-thoughtspot-cloud.thoughtspot.cloud/',
    logo: '',
    subMenus: [] as SubMenu[],
    style: {
      headerColor: "#4A90E2",
      leftNavColor: "#ffffff",
      leftNavHoverColor: "#ffffff",
      backgroundColor:  "#ffffff",
      subMenuColor:  "#f3f3f3",
      subMenuTextColor:  "#000000",
      textColor:  "#000000",
      iconColor:  "#4A90E2",
    },
    homePage: {enabled: true, name: 'Home', icon: 'HiHome'} as HomePage,
    favorites: {enabled: true, name: 'Favorites', icon: 'HiStar'} as Favorites,
    myReports: {enabled: true, name: 'My Reports', icon: 'HiDocumentText', selfService: true} as MyReports
  }

export const CSSOverrides = {
    variables: {
        "--ts-var-root-background": 'none',
        "--ts-var-viz-border-radius": "5px",
        "--ts-var-viz-box-shadow": "0 0 5px #efefef",
        //@ts-ignore
        "--ts-var-sage-bar-header-background-color": "#ffffff",
        "--ts-var-chip-border-radius":"5px",
        "--ts-var-button-border-radius": '5px'

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
      }
      
    }
}