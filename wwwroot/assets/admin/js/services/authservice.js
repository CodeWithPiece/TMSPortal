app.service('AuthService', function () {
    const BaseUrl = '/api';

    this.doLogin = async function (data) {
        return await axios.post(`${BaseUrl}/auth/login`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    this.doLogout = async function () {
        return await axios.post(`${BaseUrl}/auth/logout`);
    }

});