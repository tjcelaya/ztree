function AppView(ctrl) {

    return m('form.container', {
        onsubmit: function () {
            ctrl.handlePop()
            ctrl.handlePush()
            return false
        }
    }, [
        m('.le-input.row', [
            m('.column.one-quarter', [
                m('button.button-primary.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handlePop
                }, 'pop'),
            ]),
            m('.column.one-half', [
                m('input.u-full-width', {
                    type: 'text',
                    oninput: m.withAttr('value', ctrl.newFrame),
                    value: ctrl.newFrame()
                }),
            ]),
            m('.column.one-quarter', [
                m('button.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handlePush
                }, 'push'),
            ]),
        ]),
        m('.le-extras.row', [
            m('.column.one-quarter', [
                m('label', [
                    m("input", {
                        key: 1,
                        type: "checkbox",
                        onclick: ctrl.handleShowClosedToggle,
                        checked: ctrl.showClosed()
                    }),
                    m('span.label-body', 'Show Closed'),
                ]),
            ]),
            m('.column.one-quarter.u-hide', [
                m('label', [
                    m("input", {
                        key: 1,
                        type: "checkbox",
                        onclick: ctrl.handleShowDebugToggle,
                        checked: ctrl.showDebug()
                    }),
                    m('span.label-body', 'Show Debug'),
                ]),
            ]),
            m('.column.one-quarter.u-hide', [
                m('span', ctrl.lastMessage()),
            ]),
            m('.column.u-hide', {
                'class': (ctrl.isSignedIn() ? 'three' : 'u-hide'),
            },[
                m('button', {
                    type: 'button',
                    'class': (ctrl.driveEnabled() ? 'u-pull-left' : 'u-hide'),
                    onclick: ctrl.handleSaveClick
                }, 'Save'),
                m('button.u-pull-right', {
                    type: 'button',
                    onclick: ctrl.handleSignoutClick
                }, 'Sign Out'),
            ]),
            m('.column.three.u-hide', {
                'class': (ctrl.isSignedIn() ? 'u-hide' : ''),
            },[
                m('#signin.u-pull-right')
            ]),
        ]),
        m('.le-output.row', [
            m('.column', {
                class: ctrl.showDebug() ? 'one-half' : 'u-full-width'
            },[
                ctrl.staq.toMithril(ctrl.showClosed()),
            ]),
            m('.column', {
                class: ctrl.showDebug() ? 'one-half' : 'u-hide'
            },[
                m('pre', JSON.stringify(ctrl.staq, null, 4))
            ]),
        ]),
    ]);
}
