const Base = require('./base.js');

module.exports = class extends Base {

    async loginAction() {
        let vb = {
            'loginName': '',
            'loginPwd': ''
        };
        let user = await this.session('user');
        if(!think.isEmpty(user)){
            vb.loginName = user.c_login_name;
            vb.loginPwd = '';
        }
        this.assign('vb', vb);
        return this.display();
    }

    async loginPostAction() {

    }



    async indexAction() {

        return this.display();
    }
};
