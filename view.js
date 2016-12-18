function AppView(ctrl) {
    return m('form.container', [
        m('.row', [
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
        m('.row', [
            m('label.column.one-half', [
                m("input", {
                    key: 1,
                    type: "checkbox",
                    onclick: ctrl.handleShowClosedToggle,
                    checked: ctrl.showClosed()
                }),
                m('span.label-body', 'Show Closed'),
            ]),
            m('label.column.one-half', [
                m("input", {
                    key: 1,
                    type: "checkbox",
                    onclick: ctrl.handleShowDebugToggle,
                    checked: ctrl.showDebug()
                }),
                m('span.label-body', 'Show Debug'),
            ]),
        ]),
        m('.row', [
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
