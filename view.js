function AppView(ctrl) {

    var kitchenSinkHelper = function (visibleSinkClass, hiddenSinkClass) {
        return ctrl.vm.metaHeld() ? visibleSinkClass : hiddenSinkClass
    }

    return m('form.container', {
        config: function (el, skipBinding, cxt) {
            if (skipBinding) return;

            function handleKeyEvent(e) {
                console.log('keyevent')
                ctrl.vm.altHeld(e.altKey)
                ctrl.vm.metaHeld(e.metaKey)
                ctrl.vm.shiftHeld(e.shiftKey)
                m.redraw()
            }

            el.addEventListener('keydown', handleKeyEvent)
            el.addEventListener('keyup', handleKeyEvent)
        },
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
                        if (skipBinding) return
                        el.focus()
                        ctrl.inputEl(el)
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
            m('.input-check-showclosed.columns.' + kitchenSinkHelper('two', 'u-hide'), [
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
            m('.input-check-showdebug.columns.' + kitchenSinkHelper('two', 'u-hide'), [
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
            m('.output-check-lastmessage.columns.' + kitchenSinkHelper('four', 'u-hide'), [
                m('span', ctrl.vm.lastMessage()),
            ]),
            m('.input-btn-authbutton.columns.' + kitchenSinkHelper('two', 'u-hide'), [
                m('button.u-full-width', {
                    'class': ctrl.isSignedIn() || 'u-hide' || '',
                    type: 'button',
                    onclick: ctrl.handleSignoutClick
                }, 'Sign Out'),
                m('#signin', {
                    'class': ctrl.isSignedIn() && 'u-hide' || 'u-pull-right'
                }, null)
            ]),
            m('.input-btn-save.tiny.column.' + kitchenSinkHelper('one', 'one-half'), {
                'class': ctrl.saveEnabled() ? '' : 'u-hide'
            },[
                m('button.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handleSaveClick
                }, 'Save'),
            ]),
            m('.input-btn-save.tiny.column.' + kitchenSinkHelper('one', 'one-half'), {
                'class': ctrl.saveEnabled() ? '' : 'u-hide'
            },[
                m('button.u-full-width', {
                    type: 'button',
                    onclick: ctrl.handleClearClick
                }, 'Clear'),
            ]),
        ]),
        m('.le-output.row', [
            m('.le-output-scroller.u-full-width', [
                m('.column', {
                    'class': ctrl.vm.showDebug() ? 'one-half' : 'u-full-width',
                },[
                    ctrl.staq().toMithril(ctrl.vm.showClosed() || ctrl.vm.metaHeld()),
                ]),
                m('.column', {
                    class: ctrl.vm.showDebug() ? 'one-half' : 'u-hide'
                },[
                    m('pre', JSON.stringify(ctrl.staq(), null, 4))
                ]),
            ])
        ]),
    ]);
}
