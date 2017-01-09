function AppController() {
    var staq = m.prop(new Staq())
    staq().push('main')
    var vm = new ViewModel()
    var googleUser = m.prop(null)
    var gapiInst = m.prop(null)
    var inputEl = m.prop()

    Store.registerManager('local', new LocalStore(Util.APP_VERSION))
    Store.registerManagerBuilder('drive', GDriveStore)
    Store.registerManagerBuilder('calendar', GCalStore)

    var cachedStaq = Store.getManager('local').load('test')
    if (cachedStaq) {
        staq(Staq.fromJSON(cachedStaq))
    }

    Store.getManager('local').sync('test', staq())

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
        inputEl: inputEl,
        saveEnabled: function () {
            return Store.ready()
        },
        isSignedIn: function () {
            return googleUser() !== null
        },
        handleSignInWithGoogleUser: handleSignInWithGoogleUser,
        handleSaveClick: function () {
            if (Store.ready()) {
                Store.getManager('local').sync('test', staq().toJSON())
            }
            //GCalStore.save(gapiInst(), staq().toJSON())
        },
        handleClearClick: function () {
            console.log('attempting to clear')
            var s = new Staq()

            s.push('main')
            Store.getManager('local').sync('test', s.toJSON())
            staq(s)
            inputEl() && inputEl().focus()
            m.redraw()
            //GCalStore.save(gapiInst(), staq().toJSON())
        },
        handlePushClick: function (e) {
            try {
                staq().push(vm.newFrame())
                vm.newFrame('')
            } catch (e) {
                staq().error(e)
                vm.lastMessage(e)
            }
            inputEl() && inputEl().focus()
        },
        handlePopClick: function (e) {
            try {
                staq().pop()
            } catch (e) {
                staq().error(e)
                vm.lastMessage(e)
            }
            inputEl() && inputEl().focus()
        },
        handleShowClosedToggle: function (e) {
            vm.showClosed(!vm.showClosed())
            inputEl() && inputEl().focus()
        },
        handleShowDebugToggle: function (e) {
            vm.showDebug(!vm.showDebug())
            inputEl() && inputEl().focus()
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
            inputEl() && inputEl().focus()
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
            inputEl() && inputEl().focus()
        },
        handleSubmit: function (e) {
            if (vm.altHeld()) {
                console.log('single push since detect alt')
                this.handlePushClick()
                return false
            }

            if (vm.shiftHeld()) {
                this.handlePopClick()
                this.handlePopClick()
                this.handlePushClick()
                console.log('popping current since detect shift')
                return false
            }

            if (!vm.shiftHeld() && 0 != staq().depth()) {
                this.handlePopClick()
            }

            this.handlePushClick()
            return false
        }
    }
}