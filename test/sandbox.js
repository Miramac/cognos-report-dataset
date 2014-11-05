/*jshint curly: false, eqeqeq: true, laxcomma: true, node: true, indent: 4*/
var fs = require('fs')
, xml2js = require('xml2js')
, util = require('util')
, DataSet = require('../')
;




var parser = new xml2js.Parser();
fs.readFile(__dirname + '/data/report.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
  //      console.log(util.inspect(result.dataset.metadata[0],{ showHidden: true, depth: null }));
        var report =  new DataSet (result.dataset, { sortBy: ['Split_SortOrder', 'Wave_SortOrder']});
        console.log(util.inspect(report.metadata, {depth:3}));
    });
});



