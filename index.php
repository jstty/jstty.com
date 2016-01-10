<?php
/*

index.php?p=files&s=My+Files%2FPhotos%2F2009%2F2009_03_29

*/
define('MAIN', 1);
$page_name = "index.php";

require('page_properties.php');
require('global.php');

$page_properties = new PageProperties();
$page_properties->CmdParser($_GET);


$main = new HtmlTmpl();
$menu = '';
$photo_menu = '';


$main->Load($gTmplDir.'main.htm');
$menu = file_get_contents($gTmplDir.'menu.htm');

require('photo.php');
$photo_menu = GetPhotoDirStr('My Files', 'html');

$main->Replace('%menu%',  $menu);
$main->Replace('%photo_menu%',  $photo_menu);
$main->Replace('%page%',  'index.php');
$main->Replace('%URL%',   'bigod6.com');
$main->Replace('%page_link%',  sprintf('index.php?p=%s', $page_properties->page_type) );

$main->Replace('%start_page%',  $page_properties->page_type);
$main->Replace('%start_sub%',  $page_properties->page_sub);

$main->RReplaceClip(array("EmailProcessor", "HashEmail"), "<email>", "</email>");

$main->PrintTmpl();
?>
