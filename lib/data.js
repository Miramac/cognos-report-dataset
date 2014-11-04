/*jshint curly: false, eqeqeq: true, laxcomma: true, node: true, indent: 4*/
'using strict';

var _ = require('lodash');

function Data(data, options) {
    if(!Array.isArray(data.row)) throw new Error('missing data.row');
    options = options || {};
	options.columns = options.columns || false;

    var self = this
    , reportdata = {
        rows: []
    }
    , i
    , j
    , row
	, column
    ;
    //fill rows
    for(i = 0; i < data.row.length; i++) {
        row = [];
        for(j = 0; j <   data.row[i].value.length; j++) {
            if(typeof data.row[i].value[j].$ === 'object') {
                column = {};
				if(data.row[i].value[j].$['xs:nil']){
                    row.push('NULL');
                }
            } else {
                row.push(data.row[i].value[j]);
            }
        }
		if(options.columns) {
        	reportdata.rows.push(_.zipObject(options.columns, row));
		} else {
			reportdata.rows.push(row);
		}
    }

	if(options.sortBy && options.columns) {
		reportdata.rows = _.sortBy(reportdata.rows, options.sortBy);
	}
    return reportdata;
}

module.exports = Data;
