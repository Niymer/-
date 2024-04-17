const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { DBHOST, DBPORT, DBNAME,secret } = require('./config/config');

const indexRouter = require('./routes/web/index');
const accountRouter = require('./routes/api/account');
const authRouter = require('./routes/web/auth');
const authApiRouter = require('./routes/api/auth');

const app = express();

// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 日志、解析和会话管理中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'sid',
  secret: secret,
  saveUninitialized: false,
  resave: true,
  store: MongoStore.create({ mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}` }),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

// 路由设置
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/api', accountRouter);
app.use('/api', authApiRouter);

// 404错误处理
app.use((req, res, next) => {
  res.status(404).render('404');
});

// 通用错误处理
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).render('error');
});

module.exports = app;
