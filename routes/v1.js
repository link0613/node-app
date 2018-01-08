var express = require('express')
, cors = require('cors')
, app = express();

//var express = require('express');
var router = express.Router();
var sql = require('mssql');

app.use(cors());

var config = {
  user: '',  // sql username
  password: '', //sql password
  server: 'localhost\\casa', // You can use 'localhost\\instance' to connect to named instance 
  database: 'casa',
}

router.get('/:id', function (req, res, next) {

  var proc = 'api.' + req.params.id + '_Select';
  var query = JSON.stringify(req.query);
  query = query.substring(1, query.length - 1);
  
  sql.connect(config, function (err) {

    var qInputs = query.split(',');
    var request = new sql.Request();
    if (query != '') {

      var key = '', val = '';
      for (var i = 0; i < qInputs.length; i++) {
        key = JSON.parse(qInputs[i].split(':')[0]);
        val = JSON.parse(qInputs[i].split(':')[1].trim("\""));
        request.input(key, sql.VarChar, val);
      }

    }

    request.execute(proc, function (err, recordsets) {
      // ... error checks 
      if (err) {
        //console.log('Invalid procedure or query from GET');
         console.log(err);
        res.status(500).send({ message: "Invalid select" });
      } else

        res.json(recordsets);
    });

  });
});

/* Insert operations for existing table */
router.post('/:id', function (req, res, next) {
  var proc = 'api.' + req.params.id + '_Insert';

  var query = JSON.stringify(req.query);
  query = query.substring(1, query.length - 1);

  sql.connect(config, function (err) {
    var qInputs = query.split(',');

    var request = new sql.Request();
    if (query != '') {
      var key = '', val = '';
      //if(req.query.id)
      //  request.input('id', sql.Int, req.query.id)
      for (var i = 0; i < qInputs.length; i++) {
        key = JSON.parse(qInputs[i].split(':')[0]);
        val = JSON.parse(qInputs[i].split(':')[1].trim("\""));
        // if(key.toLowerCase()!='id')
        request.input(key, sql.VarChar, val);
      }

    }

    request.execute(proc, function (err, recordsets) {
      // ... error checks 
      if (err) {
        console.log('Invalid query from POST');
        console.log(err);
        res.status(500).send({ message: "Invalid post" });
      } else

        res.json(recordsets);
    });

  });
});

/* Insert operations for existing table */
router.put('/:id', function (req, res, next) {
  var proc = 'api.' + req.params.id + '_update';

  var query = JSON.stringify(req.query);
  query = query.substring(1, query.length - 1);

  sql.connect(config, function (err) {
    var qInputs = query.split(',');

    var request = new sql.Request();
    if (query != '') {
      var key = '', val = '';
      //if(req.query.id)
      //  request.input('id', sql.Int, req.query.id)
      for (var i = 0; i < qInputs.length; i++) {
        key = JSON.parse(qInputs[i].split(':')[0]);
        val = JSON.parse(qInputs[i].split(':')[1].trim("\""));
        // if(key.toLowerCase()!='id')
        request.input(key, sql.VarChar, val);
      }

    }

    request.execute(proc, function (err, recordsets) {
      // ... error checks 
      if (err) {
        console.log('Invalid query from PUT');
        console.log(err);
        res.status(500).send({ message: "Invalid Query" });
      } else

        res.json(recordsets);
    });

  });
});


/*Delete operation based on query input */
router.delete('/:id', function (req, res, next) {
  var proc = 'api.' + req.params.id + '_Delete';

  var query = JSON.stringify(req.query);
  query = query.substring(1, query.length - 1);

  sql.connect(config, function (err) {
    var qInputs = query.split(',');

    var request = new sql.Request();
    if (query != '') {
      var key = '', val = '';
      //if(req.query.id)
      //  request.input('id', sql.Int, req.query.id)
      for (var i = 0; i < qInputs.length; i++) {
        key = JSON.parse(qInputs[i].split(':')[0]);
        val = JSON.parse(qInputs[i].split(':')[1].trim("\""));
        //  if(key.toLowerCase()!='id')
        request.input(key, sql.VarChar, val);
      }

    }

    request.execute(proc, function (err, recordsets) {
      // ... error checks 
      if (err) {
        console.log('Invalid procedure or query from DELETE');
        // console.log(err);
        res.status(500).send({ message: "Invalid Query" });
      } else

        res.json(recordsets);
    });

  });
});

module.exports = router;
