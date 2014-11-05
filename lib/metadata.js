/*jshint curly: false, eqeqeq: true, laxcomma: true, node: true, indent: 4*/
'using strict';

var _ = require('lodash');


function Metadata(data, options) {
    if (!Array.isArray(data.item)) throw new Error('missing data.item');
    options = options || {};
    var metadata = {
        columns: []
    }
    , i
    , column 
    ;
    //fill columns
    for(i = 0; i < data.item.length; i++) {
        column = data.item[i].$;
        column.numeric = isNumeric(data.item[i].$.type);
        
        metadata.columns.push(column);
    }
    
    metadata.getColumn = function(name) {
        return _.find(metadata.columns, {'name': name});
    };
    return metadata;
}
function isNumeric(tpye) {
	var numbers  = ['xs:int', 'xs:short', 'xs:double'];
	return (numbers.indexOf(tpye) > -1);
}


module.exports = Metadata;
