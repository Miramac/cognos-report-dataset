/*jshint curly: false, eqeqeq: true, laxcomma: true, node: true, indent: 4*/
'using strict';
var Metadata = require('./metadata')
, Data = require('./data')
;

function Dataset(dataset, options) {
    if (!dataset.metadata) throw new Error('missing metadata');
    if (!dataset.data) throw new Error('missing data');

    options = options || {};
    var header = new Metadata(dataset.metadata[0], options.metadata);
   	var data = {rows:[]};
    //has data?
    if(typeof dataset.data[0] === 'object') {
        options.columns = (typeof options.columns !== 'undefined') ? options.columns : header.columns; 
        data = new Data(dataset.data[0], options);
    }

	return {
        'metadata': header
        , 'data': data
    };
}

module.exports = Dataset;
