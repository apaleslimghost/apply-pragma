var pragma = require('fn-pragma');

function applyPragma(fn, decorators) {
	return pragma(fn).reduce(function(fn, p) {
		if(decorators[p.name]) {
			return decorators[p.name].apply(fn, [fn].concat(p.args)) || fn;
		}

		return fn;
	}, fn);
}

module.exports = applyPragma;