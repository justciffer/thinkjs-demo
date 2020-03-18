'use strict';


const BaseService = require('./base.js');
module.exports = class extends BaseService {
    constructor() {
        super();
        this.service_code = think.service('code');
    }

    async roleGetPrivilegeTree(roleID, rootID) {
        rootID = think.isEmpty(rootID) ? 1 : rootID;
        let list = await this.service_code.getTreeList(rootID, true);
        const rps = await this.getRolePrivilegesByID(roleID);
        //debug(rps);
        for (let privi of list) {
            privi.isAllow = true;
            for (let rp of rps) {
                if (rp.c_privilege == privi.id) {
                    privi.isAllow = false;
                    break;
                }
            }
        }
        return list;
    }

    async userGetPrivilegeTree(userID, roleID, rootID) {
        rootID = think.isEmpty(rootID) ? 1 : rootID;
        const rps = await this.getUserPrivilegesByID(userID);
        if (rps.length > 0) {
            let list = await this.service_code.getTreeList(rootID, true);
            for (let privi of list) {
                privi.isAllow = true;
                for (let rp of rps) {
                    if (rp.c_privilege == privi.id) {
                        privi.isAllow = false;
                        break;
                    }
                }
            }
            return list;
        } else {
            return await this.roleGetPrivilegeTree(roleID, rootID);
        }
    }

    async getRolePrivilegesByID(roleID) {
        const list = await this.getRolePrivileges();
        let ret = [];
        for (const md of list) {
            if (md.c_role == roleID) {
                ret.push(md);
            }
        }
        return ret;
    }

    async getUserPrivilegesByID(userID) {
        const list = await this.getUserPrivileges();
        let ret = [];
        for (const md of list) {
            if (md.c_user == userID) {
                ret.push(md);
            }
        }
        return ret;
    }


    async getUserPrivileges() {
        return await think.cache("userPrivileges", () => {
            return this.AGENT.toUser_privilege().findAll({
                where:{   c_deny: true}
            });
        });
    }

    async getRolePrivileges() {
        return await think.cache("rolePrivileges", () => {
            return this.AGENT.toRole_privilege().findAll({
                where:{   c_deny: true}
            });
        });
    }
}