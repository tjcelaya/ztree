function AppView(ctrl) {

    return m('form.container', {
        onsubmit: function () {
            return ctrl.handleSubmit()
        }
    }, [
        m('.le-input.row', [
            m('.input-btn-pop.columns.two', [
                m('button.button-primary.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handlePopClick
                }, 'pop'),
            ]),
            m('.input-text-frame.columns.eight', [
                m('input.u-full-width', {
                    type: 'text',
                    oninput: m.withAttr('value', ctrl.vm.newFrame),
                    value: ctrl.vm.newFrame(),
                    config: function (el, skipBinding, cxt) {
                        if (skipBinding) return;

                        el.addEventListener('keydown', function (e) {
                            ctrl.vm.shiftHeld(e.shiftKey)
                        })
                    }
                }),
            ]),
            m('.input-btn-push.columns.two', [
                m('button.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handlePushClick
                }, 'push'),
            ]),
        ]),
        m('.le-extras.row', [
            m('.input-check-showclosed.columns.two', [
                m('label', [
                    m("input", {
                        key: 1,
                        type: "checkbox",
                        onclick: ctrl.handleShowClosedToggle,
                        checked: ctrl.vm.showClosed()
                    }),
                    m('span.label-body', 'Show Closed'),
                ]),
            ]),
            m('.input-check-showdebug.columns.two', [
                m('label', [
                    m("input", {
                        key: 1,
                        type: "checkbox",
                        onclick: ctrl.handleShowDebugToggle,
                        checked: ctrl.vm.showDebug()
                    }),
                    m('span.label-body', 'Show Debug'),
                ]),
            ]),
            m('.output-check-lastmessage.column.four', [
                m('span', ctrl.vm.lastMessage()),
            ]),
            m('.input-btn-authbutton.column.two',[
                m('button.u-full-width', {
                    'class': ctrl.isSignedIn() || 'u-hide' || '',
                    type: 'button',
                    onclick: ctrl.handleSignoutClick
                }, 'Sign Out'),
                m('#signin', {
                    'class': ctrl.isSignedIn() && 'u-hide' || 'u-pull-right'
                }, null)
            ]),
            m('.input-btn-save.column.two', {
                'class': ctrl.saveEnabled() ? '' : 'u-hide'
            },[
                m('button.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handleSaveClick
                }, 'Save'),
            ]),
        ]),
        m('.le-output.row', [
            m('.column', {
                class: ctrl.vm.showDebug() ? 'one-half' : 'u-full-width'
            },[
                ctrl.staq.toMithril(ctrl.vm.showClosed()),
            ]),
            m('.column', {
                class: ctrl.vm.showDebug() ? 'one-half' : 'u-hide'
            },[
                m('pre', JSON.stringify(ctrl.staq, null, 4))
            ]),
        ]),
    ]);
}
