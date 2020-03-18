'use strict';


const Agent = require('./agent.js');
 module.exports = class extends think.Service {
    constructor() {
        super();
        this.AGENT =  Agent.getInstance();
    }

}