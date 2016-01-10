<?php
////////////////////////////////////////////////////////////////////////
//	Program Name:   page_properties.php
//	Programmer:     Joseph E. Sutton, Casey Langen
//	Description:    PageProperties Class
//	Creation date:  12/16/2006
//	Last Updated:   
//	Version:        1.00
////////////////////////////////////////////////////////////////////////

if( !defined('__PAGEPROPERTIES__') )
{
   define('__PAGEPROPERTIES__', 1);
   
   class PageProperties
   {
      private $mPageFile;
      private $mPageType;
      private $mPageSub;
      private $mPageTitle;
      private $mLogout;
      
      public function PageProperties()
      {
         $this->Reset();
      }
      
      // getter function
      public function __get($name)
      {
         switch($name)
         {               
            // page layout and style sheet
            case 'style':
               return $this->mStyleNum;
               break;
               
            case 'page_type':
               return $this->mPageType;
               break;
               
            case 'page_sub':
               return $this->mPageSub;
               break;
            
            case 'page_title':
               return $this->mPageTitle;
               break;
            
               
            // build a link based on properties
            case 'page_link':
               $pl = $this->mPageFile.'?';
               $pl .= 'page='.$this->mPageType;
               
               return $pl;
               break;
               
           case 'logout':
               return $this->mLogout;
               break;
         }
         
         return false;         
      }
      
      // setter function
      public function __set($name, $value)
      {
         switch($name)
         {
            case 'page_title':
               $this->mPageTitle = $value;
               break;
               
            case 'page_file':
               $this->mPageFile = $value;
               break;
         }
         
         return false;
      }
      
      public function Reset()
      {
         $this->mPageTitle = '';
         $this->mPrint = false;
         
         $this->mPageFile = 'index.php';
         $this->mPageType = 'home';
         $this->mPageSub  = '';
         
         $this->mLogout = false;
      }
      
      public function CmdParser($args)
      {
         if(isset($args['p']))
         {
            $this->mPageType = $args['p'];
         }
         
         if(isset($args['s']))
         {
            $this->mPageSub = $args['s'];
         }
                  
         if(isset($args['logout']))
         {
            $this->mLogout = true;
         }
      } 
      
   } // end class

} // end if def __PAGEPROPERTIES__

?>
