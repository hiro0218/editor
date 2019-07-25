import electron from 'electron';
const { remote } = electron;
const { Menu, shell } = remote;
import { name } from '../../package.json';
// const isMac = process.platform === 'darwin';
// const WIN = process.platform === 'win32';
const isDevelopment = process.env.NODE_ENV !== 'production';

import AppMenuController from '@/service/app-menu-controller';

export default {
  init() {
    Menu.setApplicationMenu(null);
    const menu = Menu.buildFromTemplate(this.menubar);
    Menu.setApplicationMenu(menu);
  },
  menubar: [
    {
      label: name,
      submenu: [{ role: 'quit' }],
    },
    {
      id: 'file',
      label: 'File',
      submenu: [
        {
          id: 'new',
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
        },
        {
          id: 'open',
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
        },
        {
          id: 'save',
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
        },
        {
          id: 'save_as',
          label: 'Save as',
          accelerator: 'CmdOrCtrl+Shift+S',
        },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'CmdOrCtrl+Y', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { type: 'separator' },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:',
        },
      ],
    },
    {
      id: 'view',
      label: 'View',
      submenu: [
        {
          id: 'toggle_preview_panel',
          label: 'Toggle Preview Panel',
          type: 'checkbox',
          checked: AppMenuController.isOpenPreview(),
          click() {
            AppMenuController.togglePreview();
          },
        },
        {
          id: 'toggle_toolbar',
          label: 'Toggle Toolbar',
          type: 'checkbox',
          checked: AppMenuController.isOpenToolbar(),
          click() {
            AppMenuController.toggleToolbar();
          },
        },
        {
          label: 'Toggle Full Screen',
          role: 'togglefullscreen',
        },
        { type: 'separator' },
        {
          label: 'Zoom',
          submenu: [
            {
              label: 'Zoom In',
              role: 'zoomIn',
            },
            {
              label: 'Zoom Out',
              role: 'zoomOut',
            },
            { type: 'separator' },
            {
              label: 'Actual Size',
              role: 'resetZoom',
            },
          ],
        },
        { type: 'separator' },
        {
          label: 'Always on Top',
          accelerator: 'CmdOrCtrl+Shift+T',
          type: 'checkbox',
          checked: false,
          click: (item, focusedWindow) => {
            focusedWindow.setAlwaysOnTop(!focusedWindow.isAlwaysOnTop());
          },
        },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Website',
          click: () => {
            shell.openExternal('https://github.com/hiro0218/miikun/');
          },
        },
      ],
    },
    ...(isDevelopment
      ? [
          {
            id: 'develop',
            label: 'Development',
            submenu: [{ role: 'reload' }, { role: 'forcereload' }, { role: 'toggledevtools' }],
          },
        ]
      : []),
  ],
  registerMenuItemFunc: (menuList, id, func) => {
    if (!Array.isArray(menuList)) return;

    Array.from(menuList, item => {
      if (item.id === id) {
        Object.assign(item, func);
      }
    });
  },
};
