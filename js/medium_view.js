
var CacheDirName = '_._cache';

var medium_view = null;
var medium_view_title = null;
var medium_view_img   = null;
var medium_view_loading   = null;
var medium_view_img_link = null;
var medium_view_slideshow_button = null;
var medium_view_img_current_index = 0;

var slideshow = false;
var medium_view_img_array = new Object();

function InitMediumView()
{
   medium_view          = document.getElementById("medium-view");
   medium_view_title    = document.getElementById("medium-view-title");
   medium_view_img      = document.getElementById("medium-view-img");
   medium_view_loading  = document.getElementById("medium-view-loading");
   medium_view_img_link = document.getElementById("medium-view-img-link");
   medium_view_slideshow_button = document.getElementById("slideshow-button");
}

function ShowMediumView(name)
{
   if(medium_view != null)
   {
      MediumViewChangeImage(name);
      medium_view.style.display = 'table';
   }
}


function HideMediumView()
{
   if(medium_view != null)
   {
      MediumViewStopSlideShow();
      medium_view.style.display = 'none';
   }
}

function MediumViewChangeImageIndex(index)
{
   if(index != -1)
   {
      medium_view_img.style.display = 'none';
      medium_view_loading.style.display = 'inline';
      medium_view_img.onload = MediumViewImageDone;
      
      path = medium_view_img_array.path;
      medium_view_img_current_index = index;
            
      name = medium_view_img_array.list[index][0];
      size = medium_view_img_array.list[index][1];
      width = medium_view_img_array.list[index][2];
      
      mfile = path + "/"+CacheDirName+"/m_" + name + ".jpg";
      lfile = path + "/" + name;
   
      medium_view_title.innerHTML = lfile + " ("+size+")";
      medium_view_img.src = mfile;
      medium_view_img.width = width;
      medium_view_img_link.href = lfile;
   }
}

function MediumViewImageDone()
{
   medium_view_loading.style.display = 'none';
   medium_view_img.style.display = 'inline';
}

function MediumViewChangeImage(name)
{
   if(medium_view)
   {
      index = MediumViewFindIndex(name);
      
      MediumViewChangeImageIndex(index);
   }
}


function MediumViewFindIndex(name)
{
   for(i = 0; i < medium_view_img_array.size; i++)
   {
      if(medium_view_img_array.list[i][0] == name)
      {
         return i;
      }
   }
   
   return -1;
}


function MediumViewToggleSlideShow()
{
   if(slideshow)
   {
      MediumViewStopSlideShow();
      
   } else {
      MediumViewStartSlideShow();
   }
}


function MediumViewStartSlideShow()
{
   medium_view_slideshow_button.innerHTML = "Stop";
   slideshow = true;
   
   setTimeout('MediumViewSlideShow()', 2000);
}


function MediumViewStopSlideShow()
{
   medium_view_slideshow_button.innerHTML = "SlideShow";
   slideshow = false;
}


function MediumViewSlideShow()
{
   if(slideshow)
   {
      MediumViewNext();
      setTimeout('MediumViewSlideShow()', 2000);
   }
}


function MediumViewNext()
{
   index = medium_view_img_current_index;
   
   index++;
   if(index >= medium_view_img_array.size)
   {
      index = 0;
   }
   
   MediumViewChangeImageIndex(index);
}


function MediumViewPrev()
{
   index = medium_view_img_current_index;
   
   index--;
   if(index < 0)
   {
      index = medium_view_img_array.size - 1;
   }
   
   MediumViewChangeImageIndex(index);
}


function ShowDirPage(file, id)
{
   //alert(file);
   ShowPage('My Files', file, UpdatePageDirBody);
   MenuShow(id);
}

function UpdatePageDirBody(json, args)
{
   page_body = null;
   try
   {
      //alert(json);
      page_body = eval("("+json+")");
      
      if(page_body)
      {
         title = document.getElementById("title-t");
         title_shadow = document.getElementById("title-s");
         title.innerHTML = rootPath + page_body.title_link;
         
         // load all images to array
         medium_view_img_array.path = page_body.path;
         medium_view_img_array.size = page_body.size;
         medium_view_img_array.list = new Array();
         for(i = 0; i < medium_view_img_array.size; i++)
         {
            medium_view_img_array.list[i] = page_body[i];
         }
         
         if(medium_view_img_array.size > 0)
         {
            MediumViewChangeImage(medium_view_img_array.list[0][0]);
         } else {
            // no images
            HideMediumView();
         }
         
         // update title
         title_shadow.innerHTML = rootPath + stripHTML(page_body.title_link);
         document.title = rootPath + page_body.title_txt;
         
         bp = document.getElementById("body-page");
         bp.innerHTML = page_body.body;
      }
      
      UpdateBkg();
   }
   catch(e)
   {
      alert("Error in UpdatePageDirBody\n"+e);   
   }
   
   HideLoading();
}
