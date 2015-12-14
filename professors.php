<html>
	<head>
	<title>Reading from text files</title>

	</head>
	<body>
		<h1> Reading from text files</h1>
		<?php
			$file = fopen("professors.txt", "r");
			$members = array();

			while (!feof($file)) {
   				$members[] = fgets($file);
			}
			fclose($file);

			var_dump($members);
		
			$a = array(1, 2, array("a", "b", "c"));
			var_dump($a);

			echo "Hello world!<br>";
			echo "I'm about to learn PHP!<br>";
		?>

	</body>
</html>