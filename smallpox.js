function smallpox(id, url) {
	var write = document.write;
	var capture = '';

	document.write = function(chunk) {
		capture += chunk;
	};

	var script = document.createElement('script');
	script.type = 'application/javascript';
	script.src = url;
	script.defer = true;
	script.onload = function() {
		document.getElementById(id).innerHTML += capture;
		document.write = write;
	};

	document.getElementsByTagName('head')[0].appendChild(script);
}
