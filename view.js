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
            m('.column.one-half', [
                m('label', [
                    m("input", {
                        key: 1,
                        type: "checkbox",
                        onclick: ctrl.handleShowCompletedToggle,
                        checked: ctrl.showClosed()
                    }),
                    m('span.label-body', 'Show Closed'),
                ]),
                ctrl.staq.toMithril(ctrl.showClosed()),
            ]),
            m('.column.one-half', [
                m('pre', JSON.stringify(ctrl.staq, null, 4))
            ]),
        ]),
    ]);
}
