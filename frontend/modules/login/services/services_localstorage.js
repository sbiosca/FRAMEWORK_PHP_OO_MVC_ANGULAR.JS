app.factory('services_localstorage', function() {
    let service = {login_setToken: login_setToken, logout_remove: logout_remove, setJumpPage: setJumpPage};
    return service;

    function login_setToken(jwt) {
        localStorage.setItem('token', jwt);
    }

    function logout_remove() {
        localStorage.removeItem('token');
    }
    function setJumpPage() {
        let jumpPage = localStorage.jumpPage;
        localStorage.removeItem('jumpPage');
        return jumpPage;
    }
});