var sinon = require('sinon');
var expect = require('sinon-expect').enhance(
	require('expect.js'), sinon, 'was'
);

var applyPragma = require('./');

describe('applyPragma', function() {
	it('should return original function if no pragma', function() {
		function foo() {}
		expect(applyPragma(foo)).to.be(foo);
	});

	it('should call a named thing', function() {
		function foo() {
			/* @bar */
		}

		var dec = {
			bar: sinon.spy()
		};

		applyPragma(foo, dec);

		expect(dec.bar).was.calledWith(foo);
	});

	it('should pass args', function() {
		function foo() {
			/* @bar(5, 'baz', true) */
		}

		var dec = {
			bar: sinon.spy()
		};

		applyPragma(foo, dec);

		expect(dec.bar).was.calledWith(foo, 5, 'baz', true);
	});

	it('should return a thing', function() {
		function foo() {
			/* @bar(5, 'baz', true) */
		}

		var dec = {
			bar: sinon.stub().returns(5)
		};

		expect(applyPragma(foo, dec)).to.be(5);
	});
});