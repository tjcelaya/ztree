function AppController() {
    var staq = new Staq()
    staq.push('main')
    var vm = new ViewModel()
    var googleUser = m.prop(null)
    var gapiInst = m.prop(null)

    Store.registerManager('local', new LocalStore(Util.APP_VERSION))
    Store.registerManagerBuilder('drive', GDriveStore)
    Store.registerManagerBuilder('calendar', GCalStore)

    Store.getManager('local').sync('test', staq)

    var cachedStaq = Store.getManager('local').load('test')
    if (cachedStaq) {
        staq = Staq.fromJSON(cachedStaq)
    }
    Store.getManager('local').sync('test', staq)

    function handleSignInWithGoogleUser(gUser) {
        console.log('handleSignInWithGoogleUser')
        if (!gapiInst()) {
            vm.lastMessage('initialization issue!?')
            return
        }

        googleUser(gUser)
        var profile = gUser.getBasicProfile()
        if (profile) {
            vm.lastMessage('hello, ' + profile.getName())
        } else {
            vm.lastMessage('hello, stranger')
        }

        m.redraw()
    }

    return {
        staq: staq,
        gapiInst: gapiInst,
        vm: vm,
        saveEnabled: function () {
            return Store.ready()
        },
        isSignedIn: function () {
            return googleUser() !== null
        },
        handleSignInWithGoogleUser: handleSignInWithGoogleUser,
        handleSaveClick: function () {
            if (Store.ready()) {
                Store.getManager('local').sync('test', this.staq.toJSON())
            }
            //GCalStore.save(gapiInst(), this.staq.toJSON())
        },
        handleClearClick: function () {
            this.staq = new Staq()
            this.staq.push('main')
            Store.getManager('local').sync('test', this.staq.toJSON())
            m.redraw()
            //GCalStore.save(gapiInst(), this.staq.toJSON())
        },
        handlePushClick: function (e) {
            try {
                this.staq.push(vm.newFrame())
                vm.newFrame('')
            } catch (e) {
                this.staq.error(e)
                vm.lastMessage(e)
            }
        },
        handlePopClick: function (e) {
            try {
                this.staq.pop()
            } catch (e) {
                this.staq.error(e)
                vm.lastMessage(e)
            }
        },
        handleShowClosedToggle: function (e) {
            vm.showClosed(!vm.showClosed())
        },
        handleShowDebugToggle: function (e) {
            vm.showDebug(!vm.showDebug())
        },
        handleSigninClick: function (e, immediate) {
            if (immediate) {
                gapiInst().signin2.render('signin', {
                    'scope': [
                        'profile',
                        'email',
                        'https://www.googleapis.com/auth/drive.metadata.readonly',
                        'https://www.googleapis.com/auth/drive.file',
                    ].join(' '),
                    'theme': 'dark',
                    'onsuccess': function () {
                        googleUser(gapiInst().auth2.getAuthInstance().currentUser.get())
                        vm.lastMessage('trying to load drive api')
                        m.redraw()
                    },
                    'onfailure': function () {
                        console.log('onfailure', arguments)
                        vm.lastMessage('problem loading user')
                    },
                })
            }
        },
        handleSignoutClick: function (e) {
            vm.lastMessage('trying to sign out...')
            var auth = gapiInst()
                .auth2
                .getAuthInstance();

            auth.signOut()
                .then(function () {
                    vm.lastMessage('goodbye!')
                    googleUser(null)
                    m.redraw()
                });
        },
        handleSubmit: function (e) {
            if (vm.altHeld()) {
                console.log('single push since detect alt')
                this.handlePushClick()
                return false
            }

            if (vm.shiftHeld()) {
                this.handlePopClick()
                console.log('popping current since detect shift')
                return false
            }

            if (!vm.shiftHeld() && 0 != this.staq.depth()) {
                this.handlePopClick()
            }

            this.handlePushClick()
            return false
        }
    }
}