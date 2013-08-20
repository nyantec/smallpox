# Overview

Smallpox is a quick hack to emulate `document.write` and capture the output inside an arbitrary DOM node.

This allows asynchronous loading of legacy JavaScript code, as well as usage in XHTML documents, which [do not support](http://www.w3.org/MarkUp/2004/xhtml-faq#docwrite) `document.write`.

## Approach

Smallpox overrides the `document.write` method, gathering the output in a buffer and then appending it to the `innerHTML` property of the DOM node.
Before that, the output is processed with a minimal parser to allow inclusion in an XHTML document.

# Usage

Include the script and call the `smallpox` function as follows:

    smallpox(id, url, done)

* `id`: The ID of the element to capture the output in.
* `url`: The URL of the script to include.
* `done`: An optional function to be called when the script has finished.

## Example

The following code shows how to use Google Adsense in an XHTML document:

    <div id="ads">
    	<script type="application/javascript" src="smallpox.min.js"></script>
    	<script type="application/javascript">
    		google_ad_client = "ca-pub-XXXXXXXXXXXXXXXX";
    		google_ad_slot = "XXXXXXXXXX";
    		google_ad_width = 160;
    		google_ad_height = 600;
    
    		smallpox('ads', 'http://pagead2.googlesyndication.com/pagead/show_ads.js');
    	</script>
    </div>

In this naïve example, loading the Smallpox script blocks the parser, but in a real‐world scenario it should be embedded directly or loaded asynchronously.
