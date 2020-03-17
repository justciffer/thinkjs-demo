'use strict';

const Sequelize = require('sequelize');


//sudo npm install -g sequelize-auto
//sudo npm install -g mysql
//sequelize-auto -o "./src/models" -d shiro -h 192.168.16.2 -u root -p 3306 -x P@44w0rd -e mysql
module.exports = class extends think.Service {
    constructor() {
        super();
        this.config = think.config('model')['admin'];
        if(!this.pool){
            this.pool = new Sequelize(this.config.database, this.config.user, this.config.password, {
                host: this.config.host || "127.0.0.1",
                port: this.config.port || 3306,
                dialect: this.config.type || 'mysql',
                benchmark: true,
                define: {
                    timestamps: false
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

        this.user = this.pool.import("../models/t_user");
    }

    toUser(){
        return this.user;
    }

    async query(sql, options) {
        let list = await this.pool.query(sql, options);
        if (list.length > 0) return list[0];
        return [];
    }

}