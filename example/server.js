const express    = require('express'),
      path       = require('path'),
      app        = express(),
      bodyParser = require('body-parser'),
      http       = require('http'),
      cors       = require('cors'),
      testData   = require('./testData'),
      server     = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../debug')));
app.use('/', express.static(path.join(__dirname, '../libs')));


app.use('/api/profiles', function (req, res, next) {
    let id = req.body.orgid;
    switch (id) {
        case 100:
            res.send(testData.vk);
            break;
        case 101:
            setTimeout(function () {
                res.send(testData.fb);
            }, 1000);
            break;
        case 201:
            setTimeout(function () {
                res.send(testData.jopa);
            }, 300);
            break;
        case 202:
            setTimeout(function () {
                res.send(testData.slack);
            }, 500);
            break;
        case 203:
            setTimeout(function () {
                res.send(testData.empty);
            }, 1000);
            break;
        case 304:
            setTimeout(function () {
                res.send(testData.realApi)
            }, 100);
            break;
        default:
            res.sendStatus(500);
            next("отсутствует пенсона с id " + id)
    }

});

app.use('/', function (req, res, next) {
    res.sendFile('index.html', {root: __dirname});
});

app.set('port', process.env.PORT || '3000');

server.listen(app.get('port'), function () {
    console.log('Тестовое приложение запущено http://localhost:' + app.get('port'));
});