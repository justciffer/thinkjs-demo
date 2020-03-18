'use strict';

const BaseService = require('./base.js');
 module.exports = class extends BaseService {

    async getNameById(id) {
        let code = await this.AGENT.toCode().findByPk(id);
        return code ? code.c_name : '';
    }

    async getId(id) {
        let code = await this.AGENT.toCode().findByPk(id);
        return code ? code : null;
    }

    async getTreeList(rootID, selfContains) {
        let codes = await this.getCodes();
        let ret = [];
        for (let codeMd of codes) {
            if (selfContains && codeMd.id == rootID) { //加入自身
                ret.push(codeMd);
            } else if (codeMd.c_pid == rootID) {
                ret.push(codeMd);
                let childs = await this.getChildList(codeMd.id, codes, 1);
                for (let child of childs) {
                    ret.push(child);
                }
            }
        }
        return ret;
    }

    async getChildList(pid, codes, depth) {
        if ((depth++) > 20) {
            console.log('code.getChildList depth > 20 layer.');
            return [];
        }
        let ret = [];
        for (let codeMd of codes) {
            if (codeMd.c_pid == pid) {
                ret.push(codeMd);
                let childs = await this.getChildList(codeMd.id, codes, depth);
                for (let child of childs) {
                    ret.push(child);
                }
            }
        }
        return ret;
    }

    async getCodes() {
        return await think.cache("codeCodes", () => {
            return  this.AGENT.toCode().findAll({
                where:{ c_status : 0},order: [['c_pid'],['c_ucode']]
            });
        });
    }

}