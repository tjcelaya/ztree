var app = {
    controller: AppController,
    view: AppView
};

//initialize
var appInst = m.mount(document.getElementById('app'), app);


function GSignin2Handler(googleUser) {
  appInst.googleUser(googleUser)
  m.redraw()
}
