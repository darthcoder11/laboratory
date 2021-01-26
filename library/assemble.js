function loadScript(url,callback){
	var script = document.createElement( "script" );
	script.type = "text/javascript";
	script.setAttribute('referrerpolicy', 'unsafe-url');// unsafe-url
	if(script.readyState) {
		script.onreadystatechange = function() {
			if ( script.readyState === "loaded" || script.readyState === "complete" ) {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {
		script.onload = function(){
			callback();
		};
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild( script );
}

function assemble(pathToRoot, callback) {
	pathToRoot += "sourcecode/javascript/";
	console.log("initiating cerebral ...");
	loadScript(pathToRoot+'_integrate.js', function() {
		loadCerebral(pathToRoot, callback);
	});
}

function autoload(callback) {
	const PROJECT = "laboratory";
	let dirs = location.href.split("/").reverse();
	let path = null;
	var dir;
	while (dir = dirs.shift()) {
		if (path == null) {
			path = "";
			continue;
		}
		if (dir == PROJECT) {
			path = "./" + path;
			break;
		} else {
			path += "../";
		}
	}
	
	assemble(path, callback);
}
