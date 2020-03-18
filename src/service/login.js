'use strict';

const BaseService = require('./base.js');
module.exports = class extends BaseService {

    async addLogin(user) {
        //先保存t_login
        let login = {
            id : think.uuid('v1'),
            c_user: user.id,
            c_ip: user.ip,
            c_time_login: think.datetime(),
            c_time_last: think.datetime(),
            c_url_last: user.urlLast
        };
        await this.AGENT.toLogin().destroy({ where:{
            c_user: user.id
        }});
        await this.AGENT.toLogin().create(login);
        let id = login.id;
        login.id = think.uuid('v1');
        login.c_login = id;
        await this.AGENT.toLogin_his().create(login);

        return id;
    }

    async exitLogin(user) {
        let login = await this.AGENT.toLogin().findOne({ where:{
            c_user: user.id
        }});
        if (login) {
            let login_his = this.AGENT.toLogin_his().build(
                await this.AGENT.toLogin_his().findOne({ where:{
                    c_login: login.id
                }})
            );
            login_his.update({
                c_time_last: think.datetime(),
                c_url_last: user.urlLast
            });
        }
        this.AGENT.toLogin().destroy({ where:{
            c_user: user.id
        }});
    }

}