'use strict';

module.exports = class extends think.Service {
    constructor() {
        super();
        this.agent = think.service('sqlAgent');
    }

    async getUserByLogin(loginName, loginPwd ) {
        let sql = "select * from t_user where c_login_name=:name and c_login_pwd=:pwd";

        let user = await this.agent.query(sql,{replacements : {
                name : loginName,pwd: think.md5(loginPwd).toLowerCase()
            }});

        return user;
    }


    async getUser(loginName, loginPwd) {

        let user = await this.agent.toUser().findOne({ where:{
                c_login_name : loginName,c_login_pwd: think.md5(loginPwd).toLowerCase()
            }});

        return user ? user.dataValues : null;
    }
}