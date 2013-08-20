function smallpox(id, url, done) {
	document.spx = document.spx || '';

	document.write = function(chunk) {
		document.spx += chunk;
	};

	var script = document.createElement('script');
	script.type = 'application/javascript';
	script.src = url;
	script.defer = true;
	script.async = true;
	script.onload = function() {
		var capture = document.spx;
		document.spx = '';

		var state = 0;
		var clean = '';

		for (var iter = 0; iter < capture.length; ++iter) {
			switch (state) {
			case 0:
				if (capture[iter] === '<')
					state = 1;
				break;

			case 1:
				switch (capture[iter]) {
				case '>':
					state = 0;
					break;
				case '=':
					state = 2;
					break;
				}
				break;

			case 2:
				switch (capture[iter]) {
				case '"':
					state = 3;
					break;
				case '\'':
					state = 4;
					break;
				default:
					state = 5;
					clean += '"';
					break;
				}
				break;

			case 3:
				if (capture[iter] === '"')
					state = 1;
				break;

			case 4:
				if (capture[iter] === '\'')
					state = 1;

			case 5:
				if (capture[iter] === ' ') {
					clean += '"';
					state = 1;
				}
				break;
			}

			clean += capture[iter];
		}

		document.getElementById(id).innerHTML += clean;
		delete clean;

		if (done)
			done();
	};

	document.getElementsByTagName('head')[0].appendChild(script);
}
