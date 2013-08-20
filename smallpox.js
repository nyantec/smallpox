/*!
 * Copyright © MMXIII
 *   Mikael Voss <mvs at nyantec dot com>
 *
 * Provided that these terms and disclaimer and all copyright notices
 * are retained or reproduced in an accompanying document, permission
 * is granted to deal in this work without restriction, including un-
 * limited rights to use, publicly perform, distribute, sell, modify,
 * merge, give away, or sublicence.
 *
 * This work is provided “̲a̲s̲ ̲i̲s̲”̲ and w̲i̲t̲h̲o̲u̲t̲ ̲w̲a̲r̲r̲a̲n̲t̲̲y̲ of any kind, to
 * the utmost extent permitted by applicable law, neither express nor
 * implied; without malicious intent or gross negligence. In no event
 * may a licensor, author or contributor be held liable for indirect,
 * direct, other damage, loss, or other issues arising in any way out
 * of dealing in the work, even if advised of the possibility of such
 * damage or existence of a defect, except proven that it results out
 * of said person's immediate fault when using the work as intended.
 */

function smallpox(id, url, done) {
	(function (document, clean, state, head, tail, script, buffer, char) {
		document.spx = document.spx || '';

		document.write = function(chunk) {
			document.spx += chunk;
		};

		script = document.createElement('script');
		script.type = 'application/javascript';
		script.src = url;
		script.defer = true;
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

				if (state == 1) {
					if (char == '>')
						state = 0;
					else if (char == '=')
						state = 2;
				}

				if (state == 2) {
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

				if (state == 3) {
					if (char == '"')
						state = 1;
				}

				if (state == 4) {
					if (char == '\'')
						state = 1;
				}

				if (state == 5) {
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
