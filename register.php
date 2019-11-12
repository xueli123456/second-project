<?php
    header("Content-type:text/html;charset=utf-8");
    //连接数据库
    $conn = mysql_connect("localhost","root","root");
    //打开数据库
    if($conn){
    	mysql_select_db("users");
    }
//  if($conn){
//      echo "连接成功"."</br>";
//      //选择数据库
//      mysql_select_db("xa1901");
//  }else{
//      echo "连接成功"."</br>";
//  }
    $name = $_POST["username"];
    $pwd = $_POST["password"];
//  echo $name.$pwd;
    $result = mysql_query("select * from users where username='$name'",$conn);
    if(mysql_num_rows($result) == 1){
    	echo 0;
    }else{
    	echo 1;
    	//不存在就把这个数据写入数据库
		mysql_query("insert into users values('$name','$pwd')",$conn);
    }
    mysql_close($conn);
?>