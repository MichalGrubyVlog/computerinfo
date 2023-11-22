const electron = require('electron');
const path = require('path');
const url = require('url');
const {getAllData, getDisksData, getHardwareSystemAllInfo} = require('./utils');

const {app, BrowserWindow} = electron;

const windows = {
    main: null
}

app.on('ready', async () => {
    windows.main = new BrowserWindow({
        minWidth: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false,
    });

    windows.main.removeMenu();
    windows.main.setIcon(path.join(__dirname, 'appicon.png'));
    windows.main.maximize();
    windows.main.show();

    await windows.main.loadURL(url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true
    }));

    windows.main.webContents.send('data:hardware', await getHardwareSystemAllInfo());

    windows.main.webContents.send('data:receive', await getAllData());
    windows.main.webContents.send('data:receive', await getDisksData());

    setInterval(async () => {
        windows.main.webContents.send('data:receive', await getAllData())
    }, 1000)
})
