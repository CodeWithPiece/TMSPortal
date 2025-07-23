app.controller('AuthController', function ($scope, AuthService) {

    $scope.loginData = {
        UserName: '',
        UserPassword: ''
    }

    $scope.doLogin = async function () {
        console.log($scope.loginData);
        if ($scope.loginData) {
            await AuthService.doLogin($scope.loginData)
                .then(function (response) {
                    if (response.data.status && response.data.data.roleId === 1) {
                        sessionStorage.setItem('user', JSON.stringify(response.data.data));
                        toastr.options = {
                            closeButton: true,
                            progressBar: true,
                            showMethod: 'slideDown',
                            timeOut: 1000,
                            positionClass: 'toast-bottom-right'
                        };
                        toastr.success('Admin Portal', `Welcome back ${response.data.data.userName}.`);
                        setTimeout(function () {
                            window.location.href = "/Management";
                        }, 1000);
                    } else {
                        toastr.options = {
                            closeButton: true,
                            progressBar: true,
                            showMethod: 'slideDown',
                            timeOut: 1000,
                            positionClass: 'toast-bottom-right'
                        };
                        toastr.error('Admin Portal', response.data.message);
                    }
                })
                .catch(function (error) {
                    console.error('Login Error', error.response.data);
                });
        } else {
            toastr.options = {
                closeButton: true,
                progressBar: true,
                showMethod: 'slideDown',
                timeOut: 1000,
                positionClass: 'toast-bottom-right'
            };
            toastr.error('Admin Portal', 'Invalid login credentials...!!');
        }
    }

    $scope.doLogout = async function () {
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
                    toastr.success('Admin Portal', response.data.message);
                    setTimeout(function () {
                        sessionStorage.removeItem('user');
                        window.location.href = "/Management/Login";
                    }, 1000);
                } else {
                    toastr.options = {
                        closeButton: true,
                        progressBar: true,
                        showMethod: 'slideDown',
                        timeOut: 1000,
                        positionClass: 'toast-bottom-right'
                    };
                    toastr.error('Admin Portal', response.data.message);
                }
            })
            .catch(function (error) {
                console.error('Login Error', error.response.data);
            });
    }

});