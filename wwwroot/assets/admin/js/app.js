var app = angular.module('myApp', []);

app.run(async function ($rootScope, AuthService) {
    const user = sessionStorage.getItem('user');
    const currentPath = window.location.pathname;
    if (user) {
        $rootScope.currentUser = JSON.parse(user);
    }
    if (user && currentPath.toLowerCase() === '/management/login') {
        window.location.href = '/Management';
    }

    if (!user && currentPath != '/Management/Login') {
        await AuthService.doLogout()
            .then(function (response) {
                if (response.data.status) {
                    toastr.options = {
                        closeButton: true,
                        progressBar: true,
                        showMethod: 'slideDown',
                        timeOut: 1000,
                        positionClass: 'toast-bottom-right'
                    };
                    toastr.error('Admin Portal', 'Session expired, please login...!!');
                    setTimeout(function () {
                        window.location.href = "/Management/Login";
                    }, 1000);
                }
            })
            .catch(function (error) {
                console.error('Login Error', error.response.data);
            });
    }

});