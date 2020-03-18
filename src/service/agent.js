'use strict';

//sudo npm install -g sequelize-auto
//sudo npm install -g mysql
//sequelize-auto -o "./src/models" -d shiro -h 192.168.16.2 -u root -p 3306 -x P@44w0rd -e mysql

//sequelize-auto -o "./src/models" -d ebs-admin -h 127.0.0.1 -u root -p 3306 -x 123456 -e mysql

const Sequelize = require('sequelize');

class Agent {
    static getInstance() {
        if (!Agent.instance) {
            Agent.instance = new Agent();
        }
        return Agent.instance;
    }
    constructor() {
        this.config = think.config('model')['admin'];
        if(!this.pool){
            this.pool = new Sequelize(this.config.database, this.config.user, this.config.password, {
                host: this.config.host || "127.0.0.1",
                port: this.config.port || 3306,
                dialect: this.config.type || 'mysql',
                benchmark: true,
                define: {
                    timestamps: false,
                    raw: true
                },
                logging: this.log,
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                }
            });
            console.log("init database pool");
        }

        this.t_code = this.pool.import("../models/t_code");
        this.t_file = this.pool.import("../models/t_file");
        this.t_log = this.pool.import("../models/t_log");
        this.t_login = this.pool.import("../models/t_login");
        this.t_login_his = this.pool.import("../models/t_login_his");
        this.t_role_privilege = this.pool.import("../models/t_role_privilege");
        this.t_role_user = this.pool.import("../models/t_role_user");
        this.t_user = this.pool.import("../models/t_user");
        this.t_user_privilege = this.pool.import("../models/t_user_privilege");
    }

    log(msg) {
        if (think.env === 'development') {
            think.logger.debug(msg);
        }
    }

    toCode(){ return this.t_code;   }
    toFile(){ return this.t_file;   }
    toLog(){ return this.t_log;   }
    toLogin(){ return this.t_login;   }
    toLogin_his(){ return this.t_login_his;   }
    toRole_privilege(){ return this.t_role_privilege;   }
    toRole_user(){ return this.t_role_user;   }
    toUser(){ return this.t_user;   }
    toUser_privilege(){ return this.t_user_privilege;   }

    async query(sql, options) {
        let list = await this.pool.query(sql, options);
        if (list.length > 0) return list;
        return [];
    }
}
module.exports = Agent;