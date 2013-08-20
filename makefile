smallpox.min.js: smallpox.js
	uglifyjs --compress --mangle --output '$@' '$<'
