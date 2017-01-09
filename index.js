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


setInterval(function() {
    console.log('sync staq to local every 10s')
    Store.getManager('local').sync('test', appInst.staq().toJSON())
}, 10000)

//initialize
var appInst = m.mount(document.getElementById('app'), appDefinition);
