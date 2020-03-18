const Base = require('./base.js');

const service_user = think.service('user');
const service_code = think.service('code');
const service_privilege = think.service('privilege');
const service_login = think.service('login');

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
            let user = await service_user.getUser4Login(this.post('loginName'), this.post('loginPwd'));
            if (!think.isEmpty(user)) {
                user.ip = this.ip;
                user.urlLast = '/index/index';
                await service_login.addLogin(user);

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
        let user = await this.session('user');
        let vb = {
            groupName: "",
            version: "EBS V1.0",
            title: '后台管理系统'
        };
        user.roleName = await service_code.getNameById(user.c_role);
        vb.userName = `${user.c_login_name} [${user.roleName}]`;
        let menus = await service_privilege.userGetPrivilegeTree(user.id, user.c_role);

        //取主菜单
        let menuHtml = [];
        let firstMenu = true;
        for (let menu of menus) {
            if (menu.c_type === 'N' && menu.c_pid === 1 && menu.isAllow) {
                menuHtml.push(`<li ${firstMenu ? 'class="active"':''}><a href="/index/get_menu?root_id=${menu.id}" data-toggle="sidenav"
                     data-tree-options="{onClick:MainMenuClick}" data-id-key="targetid" >${menu.c_name}</a></li>`)
                firstMenu = false;
            }
        }
        vb.menuHtml = menuHtml;
        vb.msgCount = 0;

        this.assign('vb', vb);
        return this.display();
    }

    async exit_loginAction() {
        await service_login.exitLogin(await this.session('user'));
        await this.session('user', null);
        return this.redirect('/index/login');
    }

    async get_menuAction() {
        let user = await this.session('user');
        let rootID = this.get('root_id');
        let menus = await service_privilege.userGetPrivilegeTree(user.id, user.c_role, rootID);
        //debug(menus,'admin.index.getMenuAction - menus');
        let ret = [];
        let nav = [];
        for (let menu of menus) {
            if (menu.c_pid === rootID && menu.c_type === 'M' && menu.isAllow) {
                menu.external = (menu.c_object === 'Module') || (menu.c_desc.indexOf('http') == 0);
                nav.push({
                    id: `page${menu.c_object.split('.').join('')}`,
                    name: menu.c_name,
                    target: 'navtab',
                    url: menu.c_desc,
                    external: menu.external
                });
            }
        }
        if (nav.length > 0) {
            ret.push({
                name: await service_code.getNameById(rootID),
                children: nav
            });
        }
        let navs = [];
        for (let menu of menus) {
            if (menu.c_type === 'N') {
                navs.push(menu);
            }
        }
        for (let n of navs) {
            nav = [];
            for (let menu of menus) {
                if (menu.c_pid === n.id && menu.c_type === 'M' && menu.isAllow) {
                    menu.external = (menu.c_object === 'Module') || (menu.c_desc.indexOf('http') == 0);
                    nav.push({
                        id: `page${menu.c_object.split('.').join('')}`,
                        name: menu.c_name,
                        target: 'navtab',
                        url: menu.c_desc,
                        external: menu.external
                    });
                }
            }
            if (nav.length > 0) {
                ret.push({
                    name: n.c_name,
                    children: nav
                });
            }
        }

        return this.json(ret);
    }


    homeAction() {
        return this.display();
    }
};
