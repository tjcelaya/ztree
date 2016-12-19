var appDefinition = {
    controller: AppController,
    view: AppView
};

//initialize
var appInst = m.mount(document.getElementById('app'), appDefinition);

function GSignin2OnLoadHandler() {
    console.log('auth loaded')
    appInst.gapiStore(gapi)
    appInst.handleSigninClick(null, true)
}
