function AppController() {
    var staq = new Staq()
    var newFrame = m.prop('');
    var showClosed = m.prop(false)
    var showDebug = m.prop(false)
    var lastMessage = m.prop('yo')
    var googleUser = m.prop(null)
    var gapiStore = m.prop(null)
    var driveEnabled = m.prop(false)
    var shiftHeld = m.prop(false)

    staq.push('main')

    // var store = new Store()
    function handleSignInWithGoogleUser(gUser) {
        console.log('handleSignInWithGoogleUser')
        if (!gapiStore()) {
            lastMessage('initialization issue!?')
            return
        }

        googleUser(gUser)
        var profile = gUser.getBasicProfile()
        if (profile) {
            lastMessage('hello, ' + profile.getName())
        } else {
            lastMessage('hello, stranger')
        }

        m.redraw()
    }

    return {
        staq: staq,
        newFrame: newFrame,
        showClosed: showClosed,
        showDebug: showDebug,
        lastMessage: lastMessage,
        gapiStore: gapiStore,
        driveEnabled: driveEnabled,
        shiftHeld: shiftHeld,
        isSignedIn: function () {
            return googleUser() !== null
        },
        enableSync: function () {
            lastMessage('GDrive integration enabled')
            m.redraw()
            driveEnabled(true)
        },
        handleSignInWithGoogleUser: handleSignInWithGoogleUser,
        handleSaveClick: function () {
            lastMessage('nyi')
        },
        handlePushClick: function (e) {
            try {
                staq.push(newFrame())
                newFrame('')
            } catch (e) {
                staq.error(e)
                lastMessage(e)
            }
        },
        handlePopClick: function (e) {
            try {
                staq.pop()
            } catch (e) {
                staq.error(e)
                lastMessage(e)
            }
        },
        handleShowClosedToggle: function (e) {
            showClosed(!showClosed())
        },
        handleShowDebugToggle: function (e) {
            showDebug(!showDebug())
        },
        handleSigninClick: function (e, immediate) {
            if (immediate) {
                gapiStore().signin2.render('signin', {
                    'scope': [
                        'profile',
                        'email',
                        'https://www.googleapis.com/auth/drive.metadata.readonly',
                        'https://www.googleapis.com/auth/drive.file',
                    ].join(' '),
                    'theme': 'dark',
                    'onsuccess': function () {
                        handleSignInWithGoogleUser(gapiStore().auth2.getAuthInstance().currentUser.get())
                        lastMessage('trying to load drive api')
                        m.redraw()
                        gapiStore().client.load('drive', 'v3', function () {
                            lastMessage('loaded drive api')
                            m.redraw()
                            appInst.enableSync()
                        });
                    },
                    'onfailure': function () {
                        console.log('onfailure', arguments)
                        lastMessage('problem loading user')
                    },
                })
            }
        },
        handleSignoutClick: function (e) {
            lastMessage('trying to sign out...')
            var auth = gapiStore()
                .auth2
                .getAuthInstance();

            auth.signOut()
                .then(function () {
                    lastMessage('goodbye!')
                    googleUser(null)
                    m.redraw()
                });
        },


    }
}