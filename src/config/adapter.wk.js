const fileCache = require('think-cache-file');
const ejs = require('think-view-ejs');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');
const {
  Console,
  File,
  DateFile
} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */

exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // 单位：毫秒
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // 缓存文件存放的路径
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // 清理过期缓存定时时间
  }
}
/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'admin', // 默认使用的类型，调用时可以指定参数切换
  common: { // 通用配置
    logConnect: true, // 是否打印数据库连接信息
    logSql: true, // 是否打印 SQL 语句
    logger: msg => think.logger.info(msg) // 打印信息的 logger
},
  admin: { // 业务数据库设置
    handle: mysql,
    type: "mysql",
    database: 'shiro',
    prefix: '',
    encoding: 'utf8',
    host: '192.168.16.2',
    port: '',
    user: 'root',
    password: 'P@44w0rd',
    dateStrings: true
  }
}
/**
 * session adapter config
 * @type {Object}
 */
const mysqlSession = require('think-session-mysql');
exports.session = {
  type: 'mysql',
  common: {
    cookie: {
      name: 'admin',
      path: '/',  //a string indicating the path of the cookie
      httpOnly: true,
      autoUpdateRate:0,
      sameSite: false,
      signed: false,
      overwrite: false
    }
  },
   mysql:{
    handle:mysqlSession,
    // optional config fields,merge model.mysql if empty
    database: 'shiro',
    prefix: 'think_',
    host: '192.168.16.2',
    port: '3306',
    user: 'root',
    password: 'P@44w0rd',
    gcInterval: 3600 * 1000 //gc interval
  }
}
/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'ejs',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  // nunjucks: {
  //   handle: nunjucks
  // },
  ejs: {
    handle: ejs
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console,
    layout: {
      type: 'pattern',
      pattern: '%[[%d{MM/dd-hh.mm.ss} %p]%] %m'
    }
  },
  file: {
    level: 'ALL',
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};