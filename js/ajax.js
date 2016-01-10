/* -----------------------------------------------------
Ajax Functions
----------------------------------------------------- */
function ajaxGetXMLRequest(page, callback, args)
{
   ajax = getAjaxObject();
   ajax.overrideMimeType('text/xml');
   
   ajax.onreadystatechange = function()
   {
      if(ajax.readyState == 4)
      {
         if(ajax.status == 200)
         {
            callback(ajax.responseXML, args, ajax.responseText);
         } else {
            alert('There was a problem with the request. Err. Code('+ajax.status+')');
         }
      }
   }
   
   ajax.open('GET', page, true);
   ajax.send(null);
}

function ajaxGetTextRequest(page, callback, args)
{
   ajax = getAjaxObject();
   ajax.overrideMimeType('text/html');
   
   ajax.onreadystatechange = new function()
   {
      if(ajax.readyState == 4)
      {
         if(ajax.status == 200)
         {
            callback(ajax.responseText, args, ajax.responseXML);
         } else {
            alert('There was a problem with the request. Err. Code('+ajax.status+')');
         }
      }
   }
   
   ajax.open('GET', page, true);
   ajax.send(null);
}

function ajaxPostTextRequest(page, postString, callback, args)
{
   ajax = getAjaxObject();
   ajax.overrideMimeType('text/html');
   
   ajax.onreadystatechange = function()
   {
      if(ajax.readyState == 4)
      {
         if(ajax.status == 200)
         {
            callback(ajax.responseText, args, ajax.responseXML);
         } else {
            alert('There was a problem with the request. Err. Code('+ajax.status+')');
         }
      }
   }
   
   ajax.open('POST', page, true);
   ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   //ajax.setRequestHeader("Content-length", postString.length);
   //ajax.setRequestHeader("Connection", "close");
   ajax.send(postString);
}

function arrayToPostRequestString(data)
{
   out = "";
   
   for(key in data)
   {
      out += key+"=" + encodeURI(data[key]) + "&";
   }

   return out;
}

function getAjaxObject()
{
   hr = null;
   try
   {
      // Mozilla(firefox,...), Opera, Safari,...
      hr = new XMLHttpRequest();
   }
   catch(e)
   {
      // Internet Explorer
      try
      {
         hr = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch(e)
      {
         try
         {
            hr = new ActiveXObject("Microsoft.XMLHTTP");
         }
         catch(e)
         {
            alert("Your browser does not support AJAX!");
            return null;
         }
      }
   }
   
   return hr;
}

function Redirect(page)
{
   document.location = page;
}

