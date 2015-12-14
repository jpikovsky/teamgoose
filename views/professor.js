var fs = require('fs');

		function readLines(input, func) {
  			var remaining = '';

  			input.on('data', function(data) {
    			remaining += data;
    			var index = remaining.indexOf('\n');
    			var last  = 0;
    			while (index > -1) {
      				var line = remaining.substring(last, index);
      				last = index + 1;
      				func(line);
      				index = remaining.indexOf('\n', last);
    			}

    			remaining = remaining.substring(last);
  			});

  			input.on('end', function() {
    			if (remaining.length > 0) {
      				func(remaining);
    			}
  			});
		}

    	function profSearch() {
    		var profName = document.getElementById("search").value;
    		
		}