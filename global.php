<?php   
   global $gWebDir;
   global $gTmplDir;
   
   $gWebDir = getcwd().'/';
   $gTmplDir = $gWebDir.'tmpl/';
      
   // show variables
   global $gShowTesting;
   global $gShowDebugging;
   $gShowTesting = false;
   $gShowDebugging = false;
   
   // global variables
   global $gClassDir;
   global $gDBDir;

   $gClassDir = $gWebDir.'../php-classes/';
     
   // include classes used
   require($gClassDir.'html_tmpl.php');
   require($gClassDir.'error.php');
   require($gClassDir.'email.php');
   require($gClassDir.'browser.php');
?>
