const Base = require('./base.js');

const service_user = think.service('user');

module.exports = class extends Base {

    async loginAction() {
        let vb = {
            'loginName': '',
            'loginPwd': ''
        };
        if (this.isGet) {
            let user = await this.session('user');
            if(!think.isEmpty(user)){
                vb.loginName = user.c_login_name;
                vb.loginPwd = '';
            }
            this.assign('vb', vb);
        }else{
            let user = await service_user.getUser(this.post('loginName'), this.post('loginPwd'));
            if (!think.isEmpty(user)) {
                await this.session('user', user);
                return this.redirect('/index');
            }
            let vb = {};
            vb.loginName = this.post('loginName');
            vb.msg = '用户名或密码错误！';
            this.assign('vb', vb);
        }


        return this.display();
    }

    async indexAction() {


        return this.display();
    }
};
