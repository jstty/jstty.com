<?php
require("../php-classes/dir_parser.php");
require("../php-classes/img_thumbnail.php");
require("../php-classes/html_tmpl.php");

if( !defined('MAIN') )
{
   $p = 'My Files';
   $s = '';

   if(isset($_GET['p'])) $p = $_GET['p'];
   if(isset($_GET['s'])) $s = $_GET['s'];
   
   printf("p:%s\ns:%s", $p, $s);
   
   echo GetPhotoDirStr($p, $s);
}

function GetPhotoDirStr($path, $sub, $checkSubDir = true)
{
   $out = '';
   $tmpl = new HtmlTmpl();
   
   $dir = new DirParser();
   $dir->checkSubDir = $checkSubDir;
   $a = $dir->GetDirTree($path);
   
   //print_r($a); return '';
   
   switch($sub)
   {
      case 'xml':
      {
         $tmpl->Load("tmpl/photo_menu.xml");
         $dir_tmp = $tmpl->GetClip("<dirs>", "</dirs>");
         $file_tmp = $tmpl->GetClip("<files>", "</files>");
         
         $out = GenPhotoDirStr($a, $file_tmp, $dir_tmp, $dir_no_sub_tmp); 
         
         $tmpl->ReplaceClip($out, "<dirs>", "</dirs>");
                    
         $out = $tmpl->Get();
         break;
      }
      
      case 'json':
      {
         $out = json_encode($a);
         break;
      }
    
      case 'html':
      default:
      {
         $tmpl->Load("tmpl/photo_menu.htm");
         $dir_tmp = $tmpl->GetClip("<dirs>", "</dirs>");
         $dir_no_sub_tmp = $tmpl->GetClip("<dirs_no_sub>", "</dirs_no_sub>");
         $file_tmp = $tmpl->GetClip("<files>", "</files>");
         
         $out = GenPhotoDirStr($a, $file_tmp, $dir_tmp, $dir_no_sub_tmp); 
         
         $tmpl->ReplaceClip($out, "<dirs>", "</dirs>");
         $tmpl->ReplaceClip('', "<dirs_no_sub>", "</dirs_no_sub>");
         
         $tmpl->ShowClip("<photos>", "</photos>");
         $out = $tmpl->Get();
       } 
   }

   return $out;
}


function GenPhotoDirStr($a, $file_tmp, $dir_tmp, $dir_no_sub_tmp)
{
   $list = '';
   $dir_slash = "/";
   $num_subdir = 0;
   $num_files = 0;
   
   // print_r($a);
   
   foreach($a as $key => $value)
   {
      // is dir
      if( is_array($value) )
      {
         // ignore all CacheDirName or IgnoreDirStartingWith
         if( (strcmp($key, CacheDirName) != 0) &&
             (strpos($key, IgnoreDirStartingWith) !== 0)
           )
         {
            $dir_str = GenPhotoDirStr($value, $file_tmp, $dir_tmp, $dir_no_sub_tmp);
            // printf("a[%s] = %s :: %s<br/>\n", $key, $value, $dir_str);
            
            $list .= $dir_str;
            $num_subdir++;
         }
      } else {
         if(strcmp($key, 'name') != 0)
         {
            $tmp = new HtmlTmpl();
            $tmp->Set($file_tmp);
            $tmp->Replace("%file%", $value);
            
            $list .= $tmp->Get();
            $num_files++;
         }
      }
   }
   
   
   $list_tmp = new HtmlTmpl();  
   
   // if no sub dir
   $list_tmp->Set($dir_tmp);
   
   if($num_subdir > 0)
   {
      $list_tmp->Set($dir_tmp);
   } else {
      $list_tmp->Set($dir_no_sub_tmp);
   }
   
   
   $list_tmp->Replace("%uname%", urlencode($a['name']));
     
   $list_tmp->Replace("%name%", $a['name']);
   $list_tmp->Replace("%name_id%", str_replace($dir_slash, "_", $a['name']));
   
   $pos = strrpos($a['name'], $dir_slash);
   if($pos !==  false)
   {
      $dir_name = substr($a['name'], 1 + $pos );
   } else {
      $dir_name = $a['name'];
   }
   
   //printf("<br/>\n*** %s : %s ***<br/>\n", $dir_name, $list);
      
   $list_tmp->Replace("%dir_name%",  $dir_name);
   $list_tmp->Replace("%num_subdir%",  $num_subdir);
   $list_tmp->Replace("%num_files%",  $num_files);
   $list_tmp->ReplaceClip($list, "<files>", "</files>");
   
   return $list_tmp->Get();
}

function GetDirList($path)
{
   $out = array();
   $out["path"] = $path;
   
   $dir = new DirParser();
   $dir->checkSubDir = false;
   $a = $dir->GetDirTree($path);
   
   // print_r($a);
   
   $i = 0;
   foreach($a as $key => $value)
   {
      if( !is_array($value) &&
          (strcmp($key, "name") != 0)
        )
      {
         $file = $a["name"].'/'.$value;
                  
         // printf("%s<br/>\n", $value);
         if(!is_dir($value))
         {
            $min_width = 600;
            $med_thumb_file = $a["name"]."/".CacheDirName."/m_".$value.'.jpg';
            if(file_exists($med_thumb_file))
            {
               $height = 0;
               $width = 0;
                
               if( class_exists("Imagick") )
               {
                  //printf("%s<br/>\n", $med_thumb_file);
                  
                  $img = new Imagick($med_thumb_file);
                  $width = $img->getImageWidth();
                  $height = $img->getImageHeight();
                  $img->destroy();
               } else {
                  list($width, $height) = getimagesize($med_thumb_file);
                  //printf("org - w: %d, h: %d<br>\n", $width, $height);
               }
               
               if($width > 0)
               {
                   $height = $min_width*($height/$width);
                   
                   if($height > 500)
                      $min_width = 500*($min_width/$height);
                      
                   
                   $out[$i] = array(
                      $value,
                      GetFileSizeStr($file),
                      $min_width);
                   $i++;
               }
            }
         }
      }
   }
   
   $out["size"] = $i;
   
   //print_r($out);
   
   return $out;
}


function GetPhotoDirList($path, $tmpl, & $title_txt, & $title_link, & $body)
{
   $list_tmp = new HtmlTmpl();
   $tmp = new HtmlTmpl();
   $dir = new DirParser();
   $pn = '';
      
   $dir->checkSubDir = false;
   $a = $dir->GetDirTree($path);
   
   //print_r($a); exit();
   
   $list_tmp->Set($tmpl);
   $file_tmpl  = $list_tmp->GetClip("<file>", "</file>");
   $dir_tmpl   = $list_tmp->GetClip("<dir>", "</dir>");
   $image_tmpl = $list_tmp->GetClip("<image>", "</image>");
   $image_err_tmpl = $list_tmp->GetClip("<image_err>", "</image_err>");
   $path_tmpl  = $list_tmp->GetClip("<path>", "</path>");
   
   $path_str = $path;
   $path_list = explode('/', $path_str);
   //print_r($path_list);
   
   $path_str = '';
   $size = count($path_list);
   
   // skip last item, don't create link
   $skipLast = false;
   if($size > 1)
   {
      $skipLast = true;
      $size--;
   }
   
   for($i = 0; $i < $size; $i++)
   {
      $tp = $path_list[$i];
      $pn .= $tp;
      
      $tmp->Set($path_tmpl);
      
      $tmp->Replace("%upath%", urlencode($pn));
      $tmp->Replace("%uname%", urlencode($tp));
      
      $tmp->Replace("%path%", $pn);
      $tmp->Replace("%name%", $tp);
      
      $path_str .= $tmp->Get();
      $title_txt .= $tp;
      
      if($i+1 < $size)
      {
         $path_str .= ' / ';
         $title_txt .= ' / ';
         $pn .= '/';
      }
   }
   
   
   if($skipLast)
   {
      $tp = $path_list[$i];
      
      $sep = '';
      if($i > 0) $sep = '/';
      
      $path_str = sprintf("%s %s <a href='index.php?p=files&s=%s'>%s</a>", $path_str, $sep, urlencode($pn.$sep.$tp), $tp);
      
      $title_link .= $path_str;
      $title_txt .= ' / ' . $tp;
   } else {
      $title_link .= $path_str;
   }
   
   
   $list_tmp->HideClip("<path>", "</path>");
   $img_exts = GetPhotoExtList();
   
   $list = '';
   foreach($a as $key => $value)
   {
      $is_img = false;
      $file_ext = '';
      
      if( is_array($value) )
      {
         // ignore all CacheDirName or IgnoreDirStartingWith
         if( (strcmp($key, CacheDirName) != 0) &&
             (strpos($key, IgnoreDirStartingWith) !== 0)
           )
         {
            $tmp->Set($dir_tmpl);
            
            $dir_str = $value['name'];
            $dir_str = substr(strrchr($dir_str, '/'), 1);
            $value = $dir_str;
         } else {
            continue; // skip
         }
      } else {
         
         if(strcmp($key, 'name') == 0)
         {
            continue; // skip
         }
         
         // file
         $file_ext = strtolower( substr(strrchr($value, '.'), 1) );
         
         if( array_search($file_ext, $img_exts) !== false )
         {
            // image
            // if thumb files exist
            $file = $path."/".CacheDirName."/t_".$value.'.jpg';
            if(file_exists($file))
            {
               $tmp->Set($image_tmpl);
               $is_img = true;
            } else {
               $tmp->Set($image_err_tmpl);
            }
         } else {
            $tmp->Set($file_tmpl);
         }
      }
      
      $tmp->Replace("%path%", $path);
      $tmp->Replace("%name%", $value);
      
      $tmp->Replace("%upath%", urlencode($path));
      $tmp->Replace("%uname%", urlencode($value));
      
      $tmp->Replace("%ext%", $file_ext);
      
      $icon_name = $value;
      if(strlen($icon_name) > 16)
      {
         $icon_name = substr($icon_name, 0, 14).'...';
      }
      $tmp->Replace("%icon_name%", $icon_name);
      
      $file = $path.'/'.$value;
      
      // is image file
      if( $is_img )
      {
        $min_width = 100;
        $height = 0;
        $width = 0;
        $thumb_file = $path."/".CacheDirName."/t_".$value.'.jpg';
        
        if( class_exists("Imagick") )
        {
            //printf("%s<br/>\n", $med_thumb_file);
            
            $img = new Imagick($thumb_file);
            $width = $img->getImageWidth();
            $height = $img->getImageHeight();
            $img->destroy();
        } else {
            list($width, $height) = getimagesize($thumb_file);
            //printf("org - w: %d, h: %d<br>\n", $width, $height);
        }
        
        if($width > 0)
        {         
           $height = $min_width*($height/$width);   
        }
        
        if($height > 90)
           $min_width = 90*($min_width/$height);
         
        //printf("new - w: %d, h: %d<br>\n", $min_width, $height);
         
        $tmp->Replace("%width%", $min_width);
        //
      }
      
      $tmp->Replace("%size%", GetFileSizeStr($file));
      
      $tmp->Replace("%name_id%", 
               str_replace('/', "_", $file)
            );
      
      $list .= $tmp->Get();
   }
   
   $list_tmp->ReplaceClip($list, "<photos>", "</photos>");
   
   $body = $list_tmp->Get();
   
   return 0;
}

function GetFileSizeStr($file)
{

   $size = filesize($file);
   if($size == 0) return "---";
   
   if($size < 1024)  return sprintf("%d B", $size);
   
   $size /= 1024;
   if($size < 1024)  return sprintf("%d KB", round($size));
   
   $size /= 1024;
   if($size < 1024)  return sprintf("%d MB", round($size));
   
   $size /= 1024;
   if($size < 1024)  return sprintf("%d GB", round($size));
   
   $size /= 1024;
   if($size < 1024)  return sprintf("%d TB", round($size));

   
   return "OMG!!!";
}

function GetPhotoExtList()
{
   $a = Array(
      'jpg', 'jpeg'
      ,'png'
      ,'gif'
      , 'tif', 'tiff'
      ,'bmp'
      ,'nef', 'psd'
      );
   
   return $a;
}

?>