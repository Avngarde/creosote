const electronInstaller = require('electron-winstaller');

async function install(){
    try {
        await electronInstaller.createWindowsInstaller({
            appDirectory: './creosote-win32-x64/',
            outputDirectory: '/installers/windows',
            iconUrl: "./bitmap.ico",
            noMsi: true,
            authors: 'Kamil Paczkowski Avngarde',
            exe: 'creosote.exe'
        });
        console.log('It worked!');
    } catch (e) {
        console.log(`No dice: ${e.message}`);
    }
}

(async () => {
    await install();
})();