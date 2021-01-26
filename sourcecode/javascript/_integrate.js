
const dependencies = [
	"TestClass1.js",
	"TestClass2.js"
];

function loadCerebral(path,callback) {
	// It's all comming together.
	(function (path, callback, callee) {
		callee(path, callback, callee);
	})(path, callback, function (path, callback, callee) {
		if (dependencies.length != 0) {
			var script = dependencies.shift();
			loadScript(path + script, function () {
				console.log('script : \"'+script+'\" ready');
				callee(path, callback, callee);
			});
		} else {
			if (typeof callback == "function") {
				callback();
			}
		}
	})
}