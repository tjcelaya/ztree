var appDefinition = {
    controller: AppController,
    view: AppView
};

function GSignin2OnLoadHandler() {
    ['drive', 'calendar'].map(function(lib) {
            gapi.client.load(lib, 'v3', function() {
                console.log('loaded', lib)
                Store.registerManager(
                    lib,
                    new (Store.getManagerBuilder(lib))(Util.APP_VERSION, gapi.client[lib]))
            })
        })

    console.log('auth loaded')
    appInst.gapiInst(gapi)
    appInst.handleSigninClick(null, true)
}

setInterval(function() {
    m.redraw()
}, 1000)

// setTimeout(function() {
//     appInst.handleSaveClick
// })

//initialize
var appInst = m.mount(document.getElementById('app'), appDefinition);
