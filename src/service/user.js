'use strict';


module.exports = class extends think.Service {
    constructor() {
        super();
    }

    async getUserByLogin(loginName, loginPwd, isMd5) {
        let users = await this.getUsers();
        let pwd = isMd5 ? loginPwd.toLowerCase() : think.md5(loginPwd).toLowerCase()
        cmpage.debug(users, 'cache - users');
        for (let user of users) {
            if (user.c_login_name == loginName && user.c_login_pwd == pwd) {
                return user;
            }
        }
        return {};
    }
}