# jQuery Orderpath

This is a bundle of jquery plugins for RealPlayer orderpath usage.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/deanyan/jquery-orderpath/master/dist/jquery-orderpath.min.js
[max]: https://raw.github.com/deanyan/jquery-orderpath/master/dist/jquery-orderpath.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery-orderpath.min.js"></script>
<script>
jQuery(function($) {
	$('form').orderpath('validate', {callback: function(input) {
			var errorMessage = input.data('required');
			data = $('<span class="message" />').text(errorMessage);
			input.data('message', data);
			input.parent('p').append(data);
		},
	});
});
</script>
```

## Documentation
_(Coming soon)_

## Examples
The custom error display function, you should define when you call the validate function:
```html
$('form').orderpath('validate', { callback: function(input) {
		var errorMessage = input.data('required');
		data = $('<span class="message" />').text(errorMessage);
		input.data('message', data);
		input.parent('p').append(data);
	},
});
```

In this way, the error message show within parent p element, given you have following HTML structures:
```html
	<p>
                <input data-required="required text" />
	</p>
	<p>
		<textarea data-required="required textarea without value"></textarea>
	</p>


$('form').orderpath('validate', { callback: function(input) {
                input.css('border', '1px solid red');
	        }
	  });
});
```
## Release History
_(Nothing yet)_
