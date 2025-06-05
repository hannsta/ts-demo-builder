import { customCssInterface } from "@thoughtspot/visual-embed-sdk/lib/src/types"

const DarkModeColors = {
    primary: "#343434",
    secondary: '#efefef'
  }
  const PurpleGreenColors = {
    primary: "#304286",
    secondary: "#ffffff",
    button: "#86BDBB",
    backgound: "#EDF2F7"
  
  }
  export enum StyleOptionList {
    None = 'None',
    DarkMode =  'DarkMode',
    PurpleGreen = 'PurpleGreen',
    BlueHeader = 'BlueHeader',
    OrangeWhite = 'OrangeWhite',
    Greenish = 'Greenish',
    Pinelopi0605 = 'Pinelopi0605'
  }
  interface CustomStyle {
    name: string,
    customCSS: customCssInterface 
  }
  export const StyleOptions: CustomStyle[] = [
    {
      name: StyleOptionList.DarkMode,
    customCSS: {
    variables: {
        "--ts-var-button--secondary-color": DarkModeColors.secondary,
        "--ts-var-button--secondary-background":DarkModeColors.primary+"cc",
        "--ts-var-viz-description-color":"#bbb",
        "--ts-var-viz-background":"#424242",
        "--ts-var-viz-title-color":DarkModeColors.secondary,
        "--ts-var-menu-background":DarkModeColors.primary,
        "--ts-var-root-background":DarkModeColors.primary,
        "--ts-var-axis-data-label-color":"#efefef",
    },
    rules_UNSTABLE: {
        ".kpi-module__sublabel":{
        'color': '#bbb'
        },
        ".pinboard-content-module__tile ":{
        'background': "#424242 !important"
        },
        '.menu-module__item:hover':{
        "background":DarkModeColors.primary+"ee !iimportant",
        },
        ".kpi-module__hero":{
        "color":"#ffffff"
        },
        '.highcharts-data-label':{
        'color':'#ffffff !important',
        'text-shadow':'none !important'
        },
        '.rdLoadingIndicatorLowOpacity':{
        "background":"none !important"
        },
        '[data-testid="sage-search-bar"]':{
        "background":DarkModeColors.primary,
        "color":DarkModeColors.secondary
        },
        '[data-testid="sage-completions-dropdown"]':{
        "background":DarkModeColors.primary,
        "color":DarkModeColors.secondary
        },
        '[data-testid="answer-header-action-menu"]':{
        "background":DarkModeColors.primary,
        "color":DarkModeColors.secondary+" !important"
        },
        '[data-testid="answer-config-panel"]':{
        "background":DarkModeColors.primary,
        "color":DarkModeColors.secondary
        },
        '[data-testid="answer-content-loading-indicator"]':{
        "background-color":"none"
        },
        '[class*="_measure"]':{
        "background-color":"#0dce85 !important",
        "border-bottom":"1px solid #0dce85"
        },
        '[class*="_attribute"]':{
        "background-color":"#2770ef !important",
        "border-bottom":"1px solid #2770ef"
        },
        '.axis-label-title':{
        "color":DarkModeColors.secondary+" !important"
        },
        '.highcharts-yaxis-labels text':{
        "color":DarkModeColors.secondary+" !important",
        "fill":DarkModeColors.secondary+" !important"
        },
        '.highcharts-xaxis-labels text':{
        "color":DarkModeColors.secondary+" !important",
        "fill":DarkModeColors.secondary+" !important"
        },
        '[class*="completionText"]':{
        "color":DarkModeColors.secondary+" !important"
        },
        '[class*="completionSubtext"]':{
        "color":DarkModeColors.secondary+"66 !important"
        },
        '[class*="completion"]:hover':{
        "background":DarkModeColors.primary+"66 !important"
        },
        '[class*="footerHelpContainer"]':{
        "background":DarkModeColors.primary+"66 !important"
        },
        '[class*="_selected"]':{
        "background":DarkModeColors.secondary+"11 !important"
        },
        '[class*="answerEditPane"], [class*="answerConfigPanelNav"]':{
        "border-left":"1px solid "+DarkModeColors.secondary+"11 !important"
        },
        '[class*="headerText"]':{
        "color":DarkModeColors.secondary+" !important"
        },
        '[class*="labelText"]':{
        "color":DarkModeColors.secondary+"cc !important"
        },
        '[class*="_input"]':{
        "background-color":DarkModeColors.primary+"cc !important",
        "color":DarkModeColors.secondary+" !important"
        },
        '[class*="_itemText"] p':{
        "color":DarkModeColors.secondary+" !important"
        },
        '[class*="buttonSelected"], [class*="buttonWithIcon"]:hover':{
        "background-color":DarkModeColors.secondary+"33 !important"
        },
        '[class*="undoRedoResetWrapper"]':{
        "background":DarkModeColors.primary+" !important",
        "color":DarkModeColors.secondary+" !important"
        },
        '[class*="buttonWithIcon"]':{
        "color":DarkModeColors.secondary+" !important"
        },
        '[class*="_positionable"]':{
        "background":DarkModeColors.primary+" !important"
        },
        '[class*="_container"]':{
        "background-color":"transparent !important"
        },
    },
},

},
    {
      name: StyleOptionList.PurpleGreen,
    customCSS: {
        variables: {
            "--ts-var-button--secondary-color": PurpleGreenColors.button,
            "--ts-var-root-background": PurpleGreenColors.backgound,
            "--ts-var-root-font-family":'Trebuchet MS !important',
            "--ts-var-button--secondary-background":"#d9e9ec",
            "--ts-var-viz-title-color":"#545454",
            "--ts-var-viz-description-color":"#bcbcbc",
            "--ts-var-chip-background":"#dddeed",
            "--ts-var-chip-color":"#7d7ca6"
        },
        rules_UNSTABLE: {
            ".pinboard-edit-header-module__editActionHeader": {
            "background":"white",
            "color":"black"
            },
            ".answer-title-module__titleText":{
            "font-size":"26px",
            "font-weight":"400",
            },
            ".pinboard-content-module__tile":{
            "box-shadow":"none !important"
            },
            ".kpi-module__hero":{
            "font-size":"42px !important",
            "font-weight":"400 !important"
            }
        }
    },

    },
    {
      name: StyleOptionList.BlueHeader,
        customCSS: {
            variables: {
                "--ts-var-button--secondary-color": "#454545",
                "--ts-var-root-background": "transparent",
                "--ts-var-root-font-family":'Trebuchet MS !important',
                "--ts-var-button--secondary-background":"#F8F9FA",
                "--ts-var-viz-title-color":"#3D66A4",
                "--ts-var-viz-description-color":"#BCBCBC",
                "--ts-var-chip-background":"#F8F9FA",
                "--ts-var-chip-color":"#454545",
                //@ts-ignore
                "--ts-var-sage-bar-header-background-color": "transparent",
            },
            rules_UNSTABLE: {
                ".pinboard-header-module__pinboardHeaderContainer":{
                "box-shadow":"none !important",
                "border":"2px solid #EBF3FD"
                },
                ".chip-base-module__chip.chip-base-module__sizeMedium":{
                "height":"3rem !important"
                },
                '[data-testid="filter-panel-chip"]':{
                "border":"1px solid #CCCCCC",
                },
                ".answer-actions-container-module__answerActionContainer":{
                "background":"#EBF3FD",
                "padding":"5px"
                },
                ".pinboard-edit-header-module__editActionHeader": {
                "background":"white",
                "color":"black"
                },
                ".answer-title-module__titleText":{
                "font-size":"16px",
                "font-weight":"600",
                },
                '[data-testid="description-box"]':{
                "display" : "none !important"
                },
                ".answer-content-module__answerContent":{
                "padding": ".8571428571rem 1.1428571429rem !important"
                },
                ".pinboard-content-module__tile":{
                "box-shadow":"none !important",
                "border":"2px solid #EBF3FD",
                },
                ".answer-content-module__compactVizContainer .answer-content-module__answerVizContainer":{
                "padding":"0px"
                }
            }
        }
    },{
        name: StyleOptionList.OrangeWhite,
        customCSS: {
            variables: {
            "--ts-var-button--secondary-color": "#454545",
            "--ts-var-root-background": "#FFFFFF",
            "--ts-var-root-font-family":'Trebuchet MS !important',
            "--ts-var-button--secondary-background":"#F8F9FA",
            "--ts-var-viz-title-color":"#3D66A4",
            "--ts-var-viz-description-color":"#BCBCBC",
            "--ts-var-chip-background":"none",
            "--ts-var-chip-border-radius":"5px",
            "--ts-var-chip-color":"#454545",
            //@ts-ignore
            "--ag-header-background-color":"#fff",
            "--ag-header-column-separator-color":"rgba(234,237,242,0)",
            "--ag-row-height":"45px !important"
            },
            rules_UNSTABLE: {
            ".pinboard-header-module__pinboardHeaderContainer":{
                "box-shadow":"none !important",
            },
            ".chip-base-module__chip.chip-base-module__sizeMedium":{
                "height":"3rem !important"
            },
            '[data-testid="filter-panel-chip"]':{
                "border":"1px solid #CCCCCC",
            },
            ".answer-actions-container-module__answerActionContainer":{
                "padding":"5px"
            },
            ".pinboard-edit-header-module__editActionHeader": {
                "background":"white",
                "color":"black"
            },
            ".answer-title-module__titleText":{
                "font-size":"0px !important",
                "font-weight":"600",
            },
            '[data-testid="description-box"]':{
                "display" : "none !important"
            },
            ".answer-content-module__answerContent":{
                "padding": ".8571428571rem 1.1428571429rem !important"
            },
            ".pinboard-content-module__tile":{
                "box-shadow":"none !important",
            },
            ".answer-content-module__compactVizContainer .answer-content-module__answerVizContainer":{
                "padding":"0px"
            },
            ".ag-header-viewport":{
                "border-bottom":"1px solid var(--ag-border-color,#eaedf2) !important"
            },
            ".ag-theme-alpine .ag-root-wrapper": {
                "border":"none !important"
                /* border-color: var(--ag-border-color,#eaedf2); */
            },
            ".ag-theme-alpine .ag-ltr .ag-cell":{
                "border-right":"none !important"
            },
            ".ag-header":{
                "min-height":'70px !important'
            },
            ".ag-cell":{
                "text-align":"center"
            },
            ".ag-header-cell":{
                "text-align":"center"
            }
            }
        },
        
    },
    {
        name: StyleOptionList.Pinelopi0605,
        customCSS:{
            variables: {
                "--ts-var-root-background": "#20292e",
                "--ts-var-root-color": "#20292e",
                "--ts-var-viz-background": "#e6e7e8",
                "--ts-var-viz-border-radius": "10px",
                "--ts-var-root-text-transform": "none",
                "--ts-var-menu-background": "#ffffff",
                "--ts-var-button-border-radius": "10px",
                "--ts-var-button--primary-background": "#76afdc",
                "--ts-var-button--primary--active-background": "#ffffff",
                "--ts-var-button--primary--hover-background": "#ffffff",
                "--ts-var-button--primary-color": "#20292e",
                "--ts-var-button--secondary--active-background": "#76afdc",
                "--ts-var-button--secondary-background": "#ffffff",
                "--ts-var-button--secondary-color": "#20292e",
                "--ts-var-button--secondary--hover-background": "#76afdc",
                "--ts-var-button--tertiary-color": "#20292e",
                "--ts-var-button--tertiary--hover-background": "#76afdc",
                "--ts-var-button--tertiary--active-background": "#76afdc",
                "--ts-var-button--tertiary-background": "#ffffff",
                "--ts-var-menu--hover-background": "#e6e7e8",
                "--ts-var-menu-color": "#20292e",
                "--ts-var-root-font-family": "IBM Plex Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
                "--ts-var-viz-title-font-family": "IBM Plex Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
                "--ts-var-chip-background": "#76afdc",
                "--ts-var-chip-border-radius": "10px",
                "--ts-var-chip-color": "#20292e",
                "--ts-var-chip--active-background": "#ffffff",
                "--ts-var-chip--active-color": "#20292e",
                "--ts-var-chip--hover-color": "#20292e",
                "--ts-var-chip--hover-background": "#ffffff",
                "--ts-var-dialog-body-background": "#ffffff",
                "--ts-var-dialog-body-color": "#20292e",
                "--ts-var-dialog-header-background": "#76afdc",
                "--ts-var-dialog-header-color": "#20292e",
                //@ts-ignore
                "--ts-var-liveboard-tile-border-radius": "10px",
                "--var-temp-viz-radius": "10px",
                                //@ts-ignore
                "--ts-var-viz-border-radius": "10px",
                "--ts-var-application-color": "#20292e",
                "--ts-var-checkbox-hover-border": "#20292e",
                "--ts-var-checkbox-active-color": "#20292e",
                "--ts-var-checkbox-checked-color": "#20292e"
              },
              
              
              rules_UNSTABLE: {
                
                "@font-face": {
                    "font-family": "IBM Plex Sans",
                    "src": "url('https://fonts.gstatic.com/s/ibmplexsans/v22/zYXGKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1swZSAXcomDVmadSD6llDCqg4poY.woff2')"
                },
              
               ".button-module__button[data-testid='highlights-button']": {
                   "background" : "url(data:image/png;base64,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)",
                   "background-size" : "91px 32px",
                   "border-radius" : "0",
                   "height": "32px",
                   "width" : "91px",
                   "padding": "0",
                },
              
                ".button-module__button[data-testid='highlights-button']:hover": {
                  "border-radius": "6px",
                },
              
                ".button-module__button[data-testid='highlights-button'] svg": {
                  "display": "none",
                },
              
                ".button-module__button[data-testid='highlights-button'] p": {
                  "display": "none",
                },
              
                ".button-module__button[aria-label='Spotter']": {
                   "background" : "url(data:image/png;base64,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)",
                  "background-size" : "91px 32px",
                   "border-radius" : "0",
                   "height": "32px",
                   "width" : "91px",
                   "padding": "0",
                },
              
                ".button-module__button[data-testid='ask-ai'] svg": {
                  "display": "none",
                },
              
                ".button-module__button[data-testid='ask-ai'] p": {
                  "display": "none",
                },
              
                ".button-module__button[data-testid='ask-ai']:hover": {
                  "border-radius": "6px",
                },
              
                ".button-module__button[data-testid='ask-ai'].button-module__buttonWithIcon:not(.button-module__buttonWithText)":{
                   "background" : "url(data:image/png;base64,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)",
                   "background-size" : "35px 32px",
                   "border-radius" : "0",
                   "height": "32px",
                   "width" : "35px",
                   "padding": "0",
                },
              
                ".pinboard-viz-module__tileContent": {
                    "border-radius": "10px",
                },
              
                ".chat-module__chatContainerWrapper": {
                  "background": "#ffffff",
                },
              
                ".chat-module__chatHeader": {
                  "background": "#76afdc",
                },
              
                ".chat-module__chatHeader h4": {
                  "color": "#20292e",  
                },
              
                ".conv-assist-answer-module__sageTokensBar": {
                  "background": "#e6e7e8",
                },
              
                ".wizard-modal-module__header .wizard-modal-module__headerTitle" : {
                  "color": "#20292e",
                },
              
                ".answer-content-module__answerVizContainer" : {
                  "border-radius": "0",
                },
              
                ".chat-module__spotterIconContainer svg.chat-module__spotterIcon" : {
                  "display": "none",
                },
              
                ".chat-module__spotterIconContainer" : {
                  "background" : "url(data:image/png;base64,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)",
                  "background-size" : "35px 32px",
                  "border-radius" : "0",
                  "height": "32px",
                  "width" : "35px",
                  "padding": "0",
                },
              
                ".chat-module__titleContainer svg" : {
                  "display": "none",
                },
              
                ".chat-module__titleContainer h4" : {
                  "display": "none",
                },
              
                ".chat-module__titleContainer" : {
                  "background" : "url(data:image/png;base64,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)",
                  "background-size" : "35px 32px",
                  "border-radius" : "0",
                  "height": "32px",
                  "width" : "35px",
                  "padding": "0",
                }
              },
        }
    },
    {
      name: StyleOptionList.Greenish,
        customCSS: {
            variables: {
                "--ts-var-button--secondary-color": "#454545",
                "--ts-var-root-background": "#f6f7f7",
                "--ts-var-viz-border-radius": "0px",
                "--ts-var-root-font-family":"font-family: 'Crimson Text', serif;",
                "--ts-var-button--secondary-background":"#F8F9FA",
                "--ts-var-viz-description-color":"#BCBCBC",
                "--ts-var-chip-background":"#FFFFFF",
                "--ts-var-chip-border-radius":"0",
                "--ts-var-chip-color":"#454545"
            },
            rules_UNSTABLE: {
                
                ".answer-content-module__compactVizContainer .answer-content-module__answerVizContainer":{
                "padding":"20px"
                },
                ".verified-label-module__verifiedLabel":{
                "display":"none !important"
                },
                ".answer-title-module__titleText":{
                "font-size": "22px",
                "font-weight": "400"
                },
                ".tile-size-s .kpi-module__hero, .tile-small .kpi-module__hero, .kpi-module__hero":{
                "font-size": "22px !important"
                },
                ".chip-base-module__filter":{
                "border": "1px solid #cccccc"
                },
                ".chip-base-module__chip.chip-base-module__sizeMedium":{
                "height":"3rem !important"
                },
            }
        },
    }
    
  ]
  