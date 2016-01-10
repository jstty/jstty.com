<?php
define('MAIN', 1);
$page_name = "index.php";

require('page_properties.php');
require('global.php');

$page_properties = new PageProperties();
$page_properties->CmdParser($_GET);

$title_txt = '';
$title_link = '';
$body = '';
$extra = array();

switch( $page_properties->page_type ) {
   case 'home':
   {
      $title_txt = 'Home Page';
      $title_link = 'Home Page';

      $body = file_get_contents($gTmplDir.'home.htm');
      break;
   }
   
   case 'portfolio':
   {
      $title_txt = 'Portfolio';
      $title_link = 'Portfolio';

      $body = file_get_contents($gTmplDir.'portfolio.htm');
      
      $extra = array();
      $extra["sub"] = $page_properties->page_sub;
      break;
   }
   
   case 'My Files':
   {
      $title_txt = '';
      $title_link = '';
      
      require('photo.php');
      GetPhotoDirList(
                  $page_properties->page_sub,
                  file_get_contents($gTmplDir.'photo_list.htm'),
                  $title_txt,
                  $title_link,
                  $body
              );
      
      $extra = GetDirList($page_properties->page_sub);
      
      break;
   }
   
   
   case 'bkg_list':
   {
      require('photo.php');
      echo GetPhotoDirStr('bkgs', 'json', false);
      exit();
   }
     
   default:
   {
      $title_txt = 'Error';
      $title_link = 'Error';
      
      $body = file_get_contents($gTmplDir.'error.htm');
      break;
   }
}

$out = array();
$out['body'] = $body;
$out['title_txt'] = $title_txt;
$out['title_link'] = $title_link;
$out = array_merge($out, $extra);

//print_r($out);

echo json_encode($out);

?>