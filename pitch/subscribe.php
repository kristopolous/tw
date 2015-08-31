<?php
$line = date(DATE_RFC2822) . ' | ' . $_POST['email'] . "\n";
file_put_contents('email-list.txt', $line, FILE_APPEND);
echo "OK";
