class ViewModel {
    constructor() {
        this.newFrame = m.prop('')
        this.showClosed = m.prop(1)
        this.showDebug = m.prop(1)
        this.lastMessage = m.prop('yo')
        this.shiftHeld = m.prop(false)
        this.altHeld = m.prop(false)
    }
}