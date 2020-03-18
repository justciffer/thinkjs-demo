'use strict';

const BaseService = require('./base.js');
module.exports = class extends BaseService {

    async getUserByLogin(loginName, loginPwd ) {
        let sql = "select * from t_user where c_login_name=:name and c_login_pwd=:pwd";
        let user = await this.AGENT.query(sql,{replacements : {
                name : loginName,pwd: think.md5(loginPwd).toLowerCase()
            }});
        return user;
    }

    async getUser4Login(loginName, loginPwd) {
        let user = await this.AGENT.toUser().findOne({ where:{
                c_login_name : loginName,c_login_pwd: think.md5(loginPwd).toLowerCase()
            }});

        return user;
    }
}