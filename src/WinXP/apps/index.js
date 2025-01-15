/* eslint-disable prettier/prettier */
import React from 'react';
import InternetExplorer from './InternetExplorer';
import Minesweeper from './Minesweeper';
import ErrorBox from './ErrorBox';
import MyComputer from './MyComputer';
import MyChart from './MyChart'
import Notepad from './Notepad';
import Winamp from './Winamp';
import Paint from './Paint';
import ie from 'assets/windowsIcons/ie.png';
import mine from 'assets/minesweeper/mine-icon.png';
import error from 'assets/windowsIcons/897(16x16).png';
import computer from 'assets/windowsIcons/676(16x16).png';
import computerLarge from 'assets/windowsIcons/676(32x32).png';
import notepad from 'assets/windowsIcons/327(16x16).png';
import notepadLarge from 'assets/windowsIcons/327(32x32).png';
import winamp from 'assets/windowsIcons/winamp.png';
import paintLarge from 'assets/windowsIcons/680(32x32).png';
import paint from 'assets/windowsIcons/680(16x16).png';
import telegram from 'assets/windowsIcons/telegram.webp';
import dexscreener from 'assets/windowsIcons/dexscreener.png';
import discord from 'assets/windowsIcons/discord.png';
import twitter from 'assets/windowsIcons/twitter.png';

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};

const genId = gen();
const genIndex = gen();

export const defaultAppState = [
  {
    component: MyComputer,
    header: {
      title: 'My Computer',
      icon: computer,
    },
    defaultSize: {
      width: 430,
      height: 500,
    },
    defaultOffset: {
      x: 250,
      y: 110,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
  {
    component: MyChart,
    header: {
      title: 'My Chart',
      icon: computer,
    },
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 660,
      y: 180,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    id: genId(),
    zIndex: genIndex(),
  },
];

export const defaultIconState = [
  {
    id: 0,
    icon: ie,
    title: 'Eliza Finance',
    isExternalLink: true,
    externalLink: 'https://my.eliza.finance/',
    isFocus: false,
  },
  {
    id: 1,
    icon: mine,
    title: 'Minesweeper',
    component: Minesweeper,
    isFocus: false,
  },
  {
    id: 2,
    icon: computerLarge,
    title: 'My Computer',
    component: MyComputer,
    isFocus: false,
  },
  {
    id: 3,
    icon: notepadLarge,
    title: 'Notepad',
    component: Notepad,
    isFocus: false,
  },
  {
    id: 4,
    icon: winamp,
    title: 'Winamp',
    component: Winamp,
    isFocus: false,
  },
  {
    id: 5,
    icon: paintLarge,
    title: 'Paint',
    component: Paint,
    isFocus: false,
  },
  {
    id: 6,
    icon: telegram,
    title: 'Telegram',
    isExternalLink: true,
    externalLink: 'https://t.me/DeFAI_Portal',
    isFocus: false,
  },
  {
    id: 7,
    icon: dexscreener,
    title: 'DexScreener',
    isExternalLink: true,
    externalLink: 'https://dexscreener.com/solana/3jiwexdwzxjva2yd8aherfsrn7a97qbwmdz8i4q6mh7y',
    isFocus: false,
  },
  {
    id: 8,
    icon: discord,
    title: 'Discord',
    isExternalLink: true,
    externalLink: 'https://discord.com/invite/defai',
    isFocus: false,
  },
  {
    id: 9,
    icon: twitter,
    title: 'twitter',
    isExternalLink: true,
    externalLink: 'https://x.com/ElizadotFinance',
    isFocus: false,
  },
  {
    id: 10,
    icon: computerLarge,
    title: 'Chart',
    component: MyChart,
    isFocus: false,
  },
];

export const appSettings = {
  Minesweeper: {
    header: {
      icon: mine,
      title: 'Minesweeper',
    },
    component: Minesweeper,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 190,
      y: 180,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  Error: {
    header: {
      icon: error,
      title: 'C:\\',
      buttons: ['close'],
      noFooterWindow: true,
    },
    component: ErrorBox,
    defaultSize: {
      width: 380,
      height: 0,
    },
    defaultOffset: {
      x: window.innerWidth / 2 - 190,
      y: window.innerHeight / 2 - 60,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  'My Computer': {
    header: {
      icon: computer,
      title: 'My Computer',
    },
    component: MyComputer,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 260,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  'My Chart': {
    header: {
      icon: computer,
      title: 'My Chart',
    },
    component: MyChart,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 560,
      y: 250,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  Notepad: {
    header: {
      icon: notepad,
      title: 'Untitled - Notepad',
    },
    component: Notepad,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 270,
      y: 60,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Winamp: {
    header: {
      icon: winamp,
      title: 'Winamp',
      invisible: true,
    },
    component: Winamp,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 0,
      y: 0,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  Paint: {
    header: {
      icon: paint,
      title: 'Untitled - Paint',
    },
    component: Paint,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 280,
      y: 70,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_APP':
    case 'OPEN_APP': {
      // Get the icon ID from either action structure
      const iconId = action.id || (action.payload && action.payload.id);
      if (!iconId && !action.payload) return state;

      // Find the specific icon by ID
      const icon = defaultIconState.find(i => i.id === iconId);
      if (!icon) return state;

      // Handle external links
      if (icon.isExternalLink) {
        window.open(icon.externalLink, '_blank', 'noopener,noreferrer');
        return state;
      }

      // Handle regular apps
      const appSetting = appSettings[icon.title] || {
        component: icon.component,
        header: {
          title: icon.title,
          icon: icon.icon,
        },
        defaultSize: {
          width: 700,
          height: 500,
        },
        defaultOffset: {
          x: 140,
          y: 30,
        },
        resizable: true,
        minimized: false,
        maximized: window.innerWidth < 800,
        multiInstance: true,
      };

      // Check for existing instance
      const existingApp = state.apps.find(app => app.component === icon.component);
      if (existingApp && !appSetting.multiInstance) {
        return {
          ...state,
          apps: state.apps.map(app =>
            app.id === existingApp.id
              ? { ...app, minimized: false, zIndex: state.nextZIndex }
              : app
          ),
          nextZIndex: state.nextZIndex + 1,
        };
      }

      // Create new app instance
      return {
        ...state,
        apps: [
          ...state.apps,
          {
            ...appSetting,
            id: state.nextAppID,
            zIndex: state.nextZIndex,
          },
        ],
        nextAppID: state.nextAppID + 1,
        nextZIndex: state.nextZIndex + 1,
      };
    }

    case 'MINIMIZE_APP': {
      const appId = action.id || (action.payload && action.payload.id);
      if (!appId) return state;

      return {
        ...state,
        apps: state.apps.map(app =>
          app.id === appId ? { ...app, minimized: true } : app
        ),
      };
    }

    case 'CLOSE_APP': {
      const appId = action.id || (action.payload && action.payload.id);
      if (!appId) return state;

      return {
        ...state,
        apps: state.apps.filter(app => app.id !== appId),
      };
    }

    case 'FOCUS_APP': {
      const appId = action.id || (action.payload && action.payload.id);
      if (!appId) return state;

      return {
        ...state,
        apps: state.apps.map(app =>
          app.id === appId
            ? { ...app, zIndex: state.nextZIndex, minimized: false }
            : app
        ),
        nextZIndex: state.nextZIndex + 1,
      };
    }

    default:
      return state;
  }
};

export const DesktopIcon = React.memo(
  ({ id, icon, title, isExternalLink, externalLink, isFocus, onMouseDown, onDoubleClick }) => {
    const handleDoubleClick = (e) => {
      e.preventDefault();
      if (isExternalLink) {
        window.open(externalLink, '_blank', 'noopener,noreferrer');
      } else if (onDoubleClick) {
        onDoubleClick(id);
      }
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
      if (onMouseDown) {
        onMouseDown(id);
      }
    };

    return (
      <div
        className={`desktop-icon ${isFocus ? 'focused' : ''}`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <img src={icon} alt={title} className="icon-img" />
        <span className="icon-title">{title}</span>
      </div>
    );
  }
);

DesktopIcon.displayName = 'DesktopIcon';

export {
  InternetExplorer,
  Minesweeper,
  ErrorBox,
  MyComputer,
  Notepad,
  Winamp,
  Paint,
  MyChart
};