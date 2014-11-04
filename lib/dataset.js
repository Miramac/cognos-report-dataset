/*jshint curly: false, eqeqeq: true, laxcomma: true, node: true, indent: 4*/
'using strict';
var _ = require('lodash')
, MetaData = require('./metadata')
, Data = require('./data')
;

function Dataset(dataset, options) {
    if (!dataset.metadata) throw new Error('missing metadata');
    if (!dataset.data) throw new Error('missing data');

    options = options || {};
    var header = new MetaData(dataset.metadata[0], options.metadata);
   	var data = new Data(dataset.data[0], _.defaults(options, { columns: _.map(header.columns, 'name')}));

	return {
        'metadata': header
        , 'data': data
    };
}

module.exports = Dataset;
