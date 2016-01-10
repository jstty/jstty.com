var rootPath = " / home / jsutton / ";

var debug = false;

var globalVarInit = false;
var bkgInit = false;

var bkg_time = 120; // in seconds

var loading = null;
var main_body = null;

var body_menu = null;
var body_menu_content = null;
var adjustedMenuHeight = false;

var debugData = null;

var menu_width = null;
var body_width = null;

var body_bkg = null;
var body_page = null;
var body_page_frame = null;

var page = null;
var loading = null;
var bkg_imgs = null;

var bkg = new Array();
var body_bkg_layer   = new Array();
var body_bkg_img     = new Array();
var body_bkg_overlay = new Array();
var body_page_footer = new Array();
InitLoadBkgImages();

var maxBkgImageWidth = 1024;

function onLoad()
{
   debugData = document.getElementById("debugData");
      
   //
   page = document.getElementById("page");
   loading = document.getElementById("loading");
   main_body = document.getElementById("main-body");
   
   body_menu = document.getElementById("body-menu");
   body_menu_content = document.getElementById("body-menu-content");
   
   menu_width = document.getElementById("menu-width");
   body_width = document.getElementById("body-width");
   
   body_page = document.getElementById("body-page");
   
   body_bkg            = document.getElementById("body-bkg");
   
   body_bkg_layer[0]   = document.getElementById("body-bkg-layer0");
   body_bkg_img[0]     = document.getElementById("body-bkg-img0");
   body_bkg_overlay[0] = document.getElementById("body-bkg-overlay0");
   body_page_footer[0] = document.getElementById("body-page-footer0");
   
   body_bkg_layer[1]   = document.getElementById("body-bkg-layer1");
   body_bkg_img[1]     = document.getElementById("body-bkg-img1");
   body_bkg_overlay[1] = document.getElementById("body-bkg-overlay1");
   body_page_footer[1] = document.getElementById("body-page-footer1");
   
   globalVarInit = true;
   
   InitMediumView();
     
   window.onresize = function()
   {
      UpdateBkg();
      UpdateMenu();
   };
   
   StartChangeBkg();

   //
   MenuShowHide('My Files');
   MenuShowHide('My Files_Photos');
      
   if(startPage == "files")
   {
      ShowDirPage(startSub, '');
   }
   else
   {
      ShowPage(startPage, startSub);
   }
}

function InitLoadBkgImages()
{
   ajaxPostTextRequest("ajax.php?p=bkg_list", "", LoadBkgImages);
}

function LoadBkgImages(json, args)
{
   try
   {
      bkg_imgs = eval("("+json+")");
      
      if(bkg_imgs)
      {
         i = 0;
         item = bkg_imgs[0];
         while(item != null)
         {
            //alert(bkg_imgs[i]);
            bkg[i] = new Image();
            //bkg[i].src = "bkgs/"+bkg_imgs[i];
            
            //
            i++;
            item = bkg_imgs[i];
         }
      }
   }
   catch(e)
   {
      alert("Error in LoadBkgImages\n"+e);   
   }
   
   bkgInit = true;
}

function UpdateMenu()
{
   if(page)
   {
      wH = window.innerHeight - 75;
      mH = body_menu_content.offsetHeight - 10;
      
      if(wH < mH)
      {         
         body_menu_content.style.height = wH + "px";
         adjustedMenuHeight = true;
      } else {
         if(adjustedMenuHeight)
         {
            body_menu_content.style.height = "";
            adjustedMenuHeight = false;
         }
         
      }
   }
}

function UpdateBkg()
{
   if(page)
   {  
      // Adjust the hight if image larger then window
      // alert(page.offsetHeight);
      body_bkg.style.clip = "rect(0, auto, "+page.offsetHeight+", 0)";
      
      body_bkg_layer[0].style.width    = page.offsetWidth;
      body_bkg_layer[0].style.height   = page.offsetHeight;
      body_page_footer[0].style.height = page.offsetHeight;
      
      body_bkg_layer[1].style.width    = page.offsetWidth;
      body_bkg_layer[1].style.height   = page.offsetHeight;
      body_page_footer[1].style.height = page.offsetHeight;
      
      body_bkg.style.height = page.offsetHeight;
   }
}

function StartChangeBkg()
{
   if(bkgInit)
   {
      if(globalVarInit)
      {
         var rand_no = Math.random();
         rand_no = rand_no * (bkg.length) - 1;
         rand_no = Math.ceil(rand_no);
         
         // load image
         bkg[rand_no].src = "bkgs/"+bkg_imgs[rand_no];
         
         // on load, crossfade, bkg
         bkg[rand_no].onload = CrossFadeBkg(rand_no);
      }
   }
}

function CrossFadeBkg(rand_no)
{
   if(bkg[rand_no].complete)
   {
      // replace current top as image
            
      body_bkg_img[0].src        = body_bkg_img[1].src;
      body_bkg_img[0].width      = body_bkg_img[1].width;
      body_bkg_img[0].height     = body_bkg_img[1].height;
      body_bkg_overlay[0].width  = body_bkg_overlay[1].width;
      body_bkg_overlay[0].height = body_bkg_overlay[1].height;
      
      body_page_footer[0].innerHTML = body_page_footer[1].innerHTML;
      body_page_footer[0].style.height = page.offsetHeight;
      
      body_bkg_layer[0].style.opacity = "1.0";    
      new Effect.Opacity('body-bkg-layer0',     { from: 1.0, to: 0.0, duration: 4.0 });
      /*      
      body_bkg_img[0].style.opacity = "1.0";
      body_bkg_overlay[0].style.opacity = "1.0";
      new Effect.Opacity('body-bkg-img0',     { from: 1.0, to: 0.0, duration: 4.0 });
      new Effect.Opacity('body-bkg-overlay0', { from: 1.0, to: 0.0, duration: 4.0 });
      */
      //
      
      //
      ratio = (bkg[rand_no].width)/(bkg[rand_no].height);
      
      body_bkg_img[1].src    = bkg[rand_no].src;
      body_bkg_img[1].width  = maxBkgImageWidth;
      body_bkg_img[1].height = maxBkgImageWidth/ratio;
      
      body_bkg_overlay[1].width  = body_bkg_img[1].width;
      body_bkg_overlay[1].height = body_bkg_img[1].height;
      
      body_page_footer[1].innerHTML = getFileName(bkg[rand_no].src);
      body_page_footer[1].style.height = page.offsetHeight;
      
      body_bkg.style.height = page.offsetHeight;
      
      setTimeout('StartChangeBkg()', bkg_time*1000);
   } else {
      setTimeout('CrossFadeBkg('+rand_no+')', 500);
   }
}

function getFileName(str)
{
   // remove path
   str = str.replace(/^.*\//g, "");
   
   // remove extention
   str = str.replace(/\..*/g, "");
   
   // remove underscores
   str = str.replace(/_/g, " ");
   
   return str;
}

function ShowPage(page, sub, update)
{
   ShowLoading();
   url = "ajax.php?";
   
   if(page)
   {
      url += "p="+page+"&";
   }
   
   if(sub && (sub.length > 1))
   {
      url += "s="+sub+"&";
   }
   
   if(update)
   {
      UpdateFunc = update;
   } else {
      UpdateFunc = UpdatePageBody;
   }
   
   //alert(url);
   ajaxPostTextRequest(url, "", UpdateFunc);
}


function UpdatePageBody(json, args)
{
   page_body = null;
   try
   {      
      page_body = eval("("+json+")");
    
      if(page_body)
      {
         title = document.getElementById("title-t");
         title_shadow = document.getElementById("title-s");
         title.innerHTML = rootPath + page_body.title_link;
         
         title_shadow.innerHTML = rootPath + stripHTML(page_body.title_link);
         
         document.title = rootPath + page_body.title_txt;
         
         bp = document.getElementById("body-page");
         bp.innerHTML = page_body.body;
      }
      
      UpdateBkg();
      UpdateMenu();
   }
   catch(e)
   {
      alert("Error in UpdatePageBody\n"+e);   
   }

   HideLoading();
}

function ShowLoading()
{
   if(loading)
   {
      loading.style.visibility = 'visible';
   }
}

function HideLoading()
{
   if(loading)
   {
      loading.style.visibility = 'hidden';
   }
}


function stripHTML(html)
{   
   re = /(<([^>]+)>)/gi;
   return html.replace(re, "");
}

function dump(arr, level)
{
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}


function debugMsg(msg)
{
   if(debug)
   {
      if(debugData != null)
      {
         debugData.innerHTML = msg;
      }
   }
}

/*
   function void(msg)
   {
      if(debug)
      {
         alert(msg);
      }
   }
*/

