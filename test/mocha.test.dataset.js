/*jshint curly: false, eqeqeq: true, laxcomma: true, node: true, indent: 4*/
/*global describe, it*/
var fs = require('fs')
, xml2js = require('xml2js')
, assert = require('assert')
, DataSet = require('../lib/dataset')
, xmlDataFile = __dirname + '/data/report.xml'
;



describe('Dataset', function(){
    describe('#metadata', function(){

        it('should hava a columns array', function(done){
            parseXmlreport(function(err, result){
                if (err) throw err;
                assert.ok(Array.isArray(result.metadata.columns));
                done();
            });
        });
        
        it('should have 18 columns', function(done){
            parseXmlreport(function(err, result){
                if (err) throw err;
                assert.equal(result.metadata.columns.length, 18);
                done();
            });
        });

        
        it('should have Report_ID as first column', function(done){
            parseXmlreport(function(err, result){
                if (err) throw err;
                assert.deepEqual(result.metadata.columns[0], {
                   name: 'Report_ID',
                   type: 'xs:int',
                   precision: '1',
                   numeric: true
                });
                done();
            });
        });
        
        it('should find Report_ID column', function(done){
            parseXmlreport(function(err, result){
                if (err) throw err;
                assert.deepEqual(result.metadata.getColumn('Report_ID'), {
                   name: 'Report_ID',
                   type: 'xs:int',
                   precision: '1',
                   numeric: true
                });
                done();
            });
        });

        it('should have this columns data', function(done){
            parseXmlreport(function(err, result){
                if (err) throw err;
                assert.deepEqual(result.metadata.columns, [
                            { name: 'Report_ID', type: 'xs:int', precision: '1', numeric: true },
                            { name: 'ReportType05_ID', type: 'xs:short', precision: '1', numeric: true },
                            { name: 'Split_ID', type: 'xs:int', precision: '1', numeric: true },
                            { name: 'Split_Label', type: 'xs:string', length: '514', numeric: false },
                            { name: 'Split_SortOrder', type: 'xs:string', length: '22', numeric: false },
                            { name: 'Wave_ID', type: 'xs:int', precision: '1', numeric: true },
                            { name: 'Wave_SortOrder', type: 'xs:string', length: '22', numeric: false },
                            { name: 'Wave_LabelShort', type: 'xs:string', length: '512', numeric: false },
                            { name: 'N', type: 'xs:int', precision: '1', numeric: true },
                            { name: 'Result_Count_Weighted', type: 'xs:double', precision: '2', numeric: true },
                            { name: 'Result_Value_Weighted', type: 'xs:double', precision: '2', numeric: true },
                            { name: 'SplitResultState_Hide_Result', type: 'xs:int', precision: '1', numeric: true },
                            { name: 'delete-slide', type: 'xs:string', length: '40', numeric: false },
                            { name: 'Result_Value_Weighted_Max', type: 'xs:double', precision: '2', numeric: true },
                            { name: 'Result_Value_Weighted_Min', type: 'xs:double', precision: '2', numeric: true },
                            { name: 'VarText_Label01', type: 'xs:string', length: '512', numeric: false },
                            { name: 'VarText_EmptyLabel', type: 'xs:string', length: '26', numeric: false },
                            { name: 'Footer', type: 'xs:string', length: '512', numeric: false }
                       ]);
                done();
            });
        });
    });

    describe('#data', function(){
        it('should have a rows array', function(done){
            parseXmlreport(function(err, result){
                if (err) throw err;
                assert.ok(Array.isArray(result.data.rows));
                done();
            });
        });

        it('should have 6 rows', function(done){
            parseXmlreport(function(err, result){
                if (err) throw err;
                assert.equal(result.data.rows.length, 6);
                done();
            });
        });

        it('should have Result_Value_Weighted_Max = 75.98941368', function(done){
            parseXmlreport(function(err, result){
                if (err) throw err;
                assert.strictEqual(result.data.rows[0].Result_Value_Weighted_Max, 75.98941368);
                done();
            });
        });

        it('should have without OrderBy Split_SortOrder = "aax"', function(done){
            parseXmlreport(function(err, result){
                if (err) throw err;
                assert.strictEqual(result.data.rows[0].Split_SortOrder, 'aax');
                done();
            });
        });

        it('should have with OrderBy Split_SortOrder = "aa"', function(done){
            parseXmlreport({ sortBy: ['Split_SortOrder', 'Wave_SortOrder']}, function(err, result){
                if (err) throw err;
                assert.strictEqual(result.data.rows[0].Split_SortOrder, 'aa');
                done();
            });
        });

    });


});


//helpfunction to parse the XML Report
function parseXmlreport(options, callback) {
    callback = (typeof options === 'function') ? options : callback;
    options =  (typeof options === 'object') ? options : {};
    var parser = new xml2js.Parser();
    fs.readFile(xmlDataFile, function(err, data) {
        if(err) throw err;
        parser.parseString(data, function (err, result) {
            if(err)throw err;
            var report =  new DataSet (result.dataset, options);
            return callback(null, report);
        });
    });
}



