<?php
    header("Content-type:text/html;charset=utf-8");
    $name = $_POST["username"];
    $pwd = $_POST["password"];
    $conn = mysql_connect("localhost","root","root");
    if($conn){
//  	echo "连接成功"."<br/>";
    	mysql_select_db("users");
    }
    $result = mysql_query("select * from users where username='$name' AND password = '$pwd'",$conn);
    //$obj = mysql_fetch_assoc($result);
    $rows = mysql_num_rows($result);
    if( $rows == 1){
    	echo 1;
    }else{
    	echo 0;
    }
?>