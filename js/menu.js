
function MenuInitItem(name, state)
{
   item = "menu_"+name;
   itemImg = "menu_img_"+name;
   
   item = document.getElementById(item);
   itemImg = document.getElementById(itemImg);
   
   if(item) item._state = !state;
   MenuShowHide(name);

   //alert(item);
}

function MenuShowHide(name, url)
{
   item = "menu_"+name;
   itemImg = "menu_img_"+name;
   
   item = document.getElementById(item);
   itemImg = document.getElementById(itemImg);
   
   if(item)
   {
      if(item._state)
      {
         item.style.display = 'none';
         itemImg.src = "pics/arrow_r.png";
         item._state = 0;
      }
      else
      {
         item.style.display = 'block';
         itemImg.src = "pics/arrow_d.png";
         item._state = 1;
      }
   }
   
   if(url)
   {
      //document.location = url;
   }
   
   UpdateMenu();
}

function MenuShow(name, url)
{  
   item = "menu_"+name;
   itemImg = "menu_img_"+name;
   
   item = document.getElementById(item);
   itemImg = document.getElementById(itemImg);
   
   if(item)
   {
      item.style.display = 'block';
      itemImg.src = "pics/arrow_d.png";
      item._state = 1;
   }
   
   UpdateMenu();
}

function MenuHide(name, url)
{  
   item = "menu_"+name;
   itemImg = "menu_img_"+name;
   
   item = document.getElementById(item);
   itemImg = document.getElementById(itemImg);
   
   if(item)
   {
      item.style.display = 'none';
      itemImg.src = "pics/arrow_r.png";
      item._state = 0;
   }
   
   UpdateMenu();
}