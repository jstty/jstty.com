
var activeID = null;
var minSize = 150;
var maxSize = 400;

document.onmousemove = null;
document.onmouseup   = mouseClickUp;


function UpdateMenuBodyWidth(sliderpos)
{
   //alert(sliderpos);
   //alert(menu_width.clientWidth);
   //alert(body_width.clientWidth);
   
   body_menu.width = sliderpos - 13;
   //body_width.width = page.offsetWidth - sliderpos;
}

function mouseClickDown(target)
{
   debugMsg("mouseClickDown");

   activeID = target.id;
   document.onmousemove = mouseMove;
   
   // need to return false otherwise will stop events
   return false;
}


function mouseMove(event)
{
   if(activeID != null)
   {
      xpos = event.clientX;
      debugMsg("mouseMove: " + xpos);
   
      if( (xpos > minSize) &&
          (xpos < maxSize)
         )
      {
         UpdateMenuBodyWidth(xpos);
      }
   }
}

function mouseClickUp(event)
{
   debugMsg("mouseClickUp");
   
   activeID = null;
   document.onmousemove = null;
}
