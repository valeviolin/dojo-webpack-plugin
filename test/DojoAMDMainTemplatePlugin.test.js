/*
 * Tests to provide complete test coverage for DojoAMDMainTemplatePlugin.  These Tests
 * exercise code paths that are difficult or impossible to invoke from within
 * webpack.  As such, they provide only enough scafoliding to support
 * execution of the targeted paths.  Code changes to the module under
 * test may require additional scafolding in this file, even if the code
 * changes are not related to the paths being tested.
 */
const DojoAMDMainTemplatePlugin = require("../lib/DojoAMDMainTemplatePlugin");
const {reg, Tapable} = require("../lib/pluginHelper");
const plugin = new DojoAMDMainTemplatePlugin({});

describe("DojoAMDMainTemplatePlugin tests", function() {
	var mainTemplate = new Tapable;
	const compilation = new Tapable();
	compilation.mainTemplate = mainTemplate;
	compilation.chunkTemplate = new Tapable();
	compilation.modules = {
		find: function() { return null; }
	};
	reg(compilation.chunkTemplate, {"renderAbsMids" : ["SyncWaterfall", "source", "chunk"]});
	compilation.mainTemplate = {
		requireFn:  "__webpack_require__",
		outputOptions: {
			jsonpFunction: "webpackJsonpFunction",
			globalObject: "window"
		}
	};
	reg(compilation.mainTemplate, {
		"dojoGlobalRequire" : ["SyncWaterfall", "source"]
	});
	const chunk = {
		groupsIterable: []
	};
	plugin.indent = (string) => string,

	plugin.compilation = compilation;
	describe("dojo-require-extensions test", function() {
		it("Should throw if dojo loader is not available", function(done) {
			try {
				plugin.dojoRequireExtensions("", chunk);
				done(new Error("Shouldn't get here"));
			} catch (err) {
				err.message.should.match(/Can't locate [^\s]+ in compilation/);
				done();
			}
		});
	});
});