// DONT TOUCH
window.fbAsyncInit = function () {
    FB.init({
        appId: '1706262639498621',
        cookie: true,
        xfbml: true,
        version: 'v5.0'
    });
    FB.AppEvents.logPageView();
};

// DONT TOUCH
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



// these 2 functions store the user's name so that we can use it for other webpages and check if they are logged in
function googleLogin(googleUser) {
    let profile = googleUser.getBasicProfile();
    localStorage.setItem('name', profile.getName());
    window.location.replace("feed.html"); 
  }

function facebookLogin() {
    FB.api(
      '/me',
      'GET',
      {"fields":"id,name,birthday,email"},
      function(response) { 
          localStorage.setItem('name', response.name);     
      }
    );
    window.location.replace("feed.html");
}