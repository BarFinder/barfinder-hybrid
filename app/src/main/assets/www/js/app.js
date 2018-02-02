// Export DOM7 to local variable to make it easy accessable
let $$ = Dom7;

// Framework7 App main instance
let app  = new Framework7({
  root: '#app', // App root element
  id: 'kth.barfinder.testapp', // App bundle ID
  name: 'Bar Finder', // App name
  theme: 'auto', // Automatic theme detection
});

// Init/Create main view
let mainView = app.views.create('.view-main', {
  url: '/'
});

// Login Screen Demo
$$('#my-location').on('click', function () {

  // Alert
  //app.dialog.alert('Hello');
  //myTest.goodbye();
});
