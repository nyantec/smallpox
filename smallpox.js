function smallpox(id, url, done) {
	(function (document, clean, state, head, tail, script, buffer, char) {
		document.spx = document.spx || '';

		document.write = function(chunk) {
			document.spx += chunk;
		};

		script = document.createElement('script');
		script.type = 'application/javascript';
		script.src = url;
		script.async = true;
		script.onload = function() {
			buffer = document.spx;
			document.spx = '';

			while (tail < buffer.length) {
				char = buffer[tail];

				if (state == 0) {
					if (char == '<')
						state = 1;
				}

				else if (state == 1) {
					if (char == '>')
						state = 0;
					else if (char == '=')
						state = 2;
				}

				else if (state == 2) {
					if (char == '"')
						state = 3;
					else if (char == '\'')
						state = 4;
					else {
						state = 5;
						clean += buffer.substring(head, tail) + '"';
						head = tail;
					}
				}

				else if (state == 3) {
					if (char == '"')
						state = 1;
				}

				else if (state == 4) {
					if (char == '\'')
						state = 1;
				}

				else if (state == 5) {
					if (char == ' ') {
						state = 1;
						clean += buffer.substring(head, tail) + '"';
						head = tail;
					}
				}

				++tail;
			}

			clean += buffer.substring(head, tail);

			document.getElementById(id).innerHTML += clean;

			if (done)
				done();
		};

		document.getElementsByTagName('head')[0].appendChild(script);
	})(document, '', 0, 0, 0);
}
