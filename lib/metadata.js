/*jshint curly: false, eqeqeq: true, laxcomma: true, node: true, indent: 4*/

'using strict';

// [ { item:
//     [ { '$': { name: 'Report_ID', type: 'xs:int', precision: '1' } },

function MetaData(data, options) {
    if (!Array.isArray(data.item)) throw new Error('missing data.item');
    options = options || {};
    var self = this
    , metadata = {
        columns: []
    }
    , i
    ;
    //fill columns
    for(i = 0; i < data.item.length; i++) {
        metadata.columns.push(data.item[i].$);
		//get type
        metadata.columns[metadata.columns.length-1].isNumber = isNumber(metadata.columns[metadata.columns.length-1].type);
    }
    return metadata;
}
function isNumber(tpye) {
	var numbers  = ['xs:int', 'xs:short', 'xs:double'];
	return (numbers.indexOf(tpye) > -1);
}


module.exports = MetaData;
