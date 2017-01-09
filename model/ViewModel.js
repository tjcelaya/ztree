class ViewModel {
    constructor() {
        this.newFrame = m.prop('')
        this.showClosed = m.prop(false)
        this.showDebug = m.prop(false)
        this.lastMessage = m.prop('yo')
        this.shiftHeld = m.prop(false)
        this.altHeld = m.prop(false)
        this.metaHeld = m.prop(false)
    }
}