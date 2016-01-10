
$.views.helpers({
	getFields: function( object ) {
		var key, value, count,
			fieldsArray = [];
	
	   count = 0;
	   for( key in object ) { count++; }
	   
		for ( key in object ) {
			if ( object.hasOwnProperty( key )) {
				value = object[ key ];
				// For each property/field add an object to the array, with key and value
				fieldsArray.push({
					key: key,
					value: value,
					count: count
				});
			}
		}
		// Return the array, to be rendered using {{for ~fields(object)}}
		return fieldsArray;
	}
});


function selectPortfolio(json, args)
{
   page_body = null;
   try
   {      
      page_body = eval("("+json+")");
      //console.log(json);
    
      if(page_body)
      {
         title = document.getElementById("title-t");
         title_shadow = document.getElementById("title-s");
         title.innerHTML = rootPath + page_body.title_link;
         
         title_shadow.innerHTML = rootPath + stripHTML(page_body.title_link);
         
         document.title = rootPath + page_body.title_txt;
         
         bp = document.getElementById("body-page");
         bp.innerHTML = page_body.body;
         
         // page_body.sub
         
         if(page_body.sub == "company")
         {
            //console.log(companyNameList);
            //console.log(companyList);
            nList = companyNameList;
            list = companyList;
            
            filterTemplate = jQuery( "#filterCompanyTemplate" );
            bodyTemplate   = jQuery( "#bodyTemplate" );
         }
         else if(page_body.sub == "category")
         {
            //console.log(categoryNameList);
            //console.log(categoryList);
            nList = categoryNameList;
            list = categoryList;
            
            filterTemplate = jQuery( "#filterCategoryTemplate" );
            bodyTemplate   = jQuery( "#categoryBodyTemplate" );
         }
         else if(page_body.sub == "textcompany")
         {
            nList = companyNameList;
            list = companyList;
            
            filterTemplate = jQuery( "#filterCompanyTemplate" );
            bodyTemplate   = jQuery( "#textCompanyBodyTemplate" );
         }
         else if(page_body.sub == "textcategory")
         {
            nList = categoryNameList;
            list = categoryList;
            
            filterTemplate = jQuery( "#filterCategoryTemplate" );
            bodyTemplate   = jQuery( "#textCategoryBodyTemplate" );
         }
         
         filter = filterTemplate.render( nList );
         jQuery( ".portfolioFilter" ).html(filter);
         
         body = bodyTemplate.render( list );
         jQuery( ".portfolioBody" ).html(body);
      }
      
      UpdateBkg();
      UpdateMenu();
   }
   catch(e)
   {
      console.log("Error in selectPortfolio\n"+e);   
   }
   
   HideLoading();
}

// -------------------------------------
function buildListOfCompanyNames(list)
{
   clist = [];
   tlist = {};
   for(var i = 0; i < list.length; i++)
   {
      if( list[i]["Company"] )
      {
         cname = list[i]["Company"];
         clist.push(cname);
         tlist[cname] = i;
      }
   }
   
   clist.sort();
   return clist;
}

function sortProjects(plist)
{
   //console.log("plist:", plist);
   var now = (new Date()).toString();  
   var olist = [];
   var sdList = [];
   var sdMap = {};
   var sd = "";
   var title = "";

   // sort by date
   for(var i = 0; i < plist.length; i++)
   {
      title = plist[i]["Title"];
      
      if(plist[i]["StartDate"])
      {
         sdate = plist[i]["StartDate"].split("/");
         sd = (new Date(sdate[0]+"/1/"+sdate[1])).toString();
      } else {
         sd = now;
      }
      
      if(!sdList.member(sd))
      {
         sdList.push(sd);
      }
      
      if(!sdMap[sd])
      {
         sdMap[sd] = {"index":{}, "title":[]};
      }
      
      sdMap[sd]["index"][ title ] = i;
      sdMap[sd]["title"].push( title );
   }
   
   sdList.sort(dateSort);
   //console.log("sdList:", sdList);
   //console.log("sdMap:", sdMap);
   
   // for each same date sort by title
   for(sd in sdMap)
   {
      sdMap[sd]["title"].sort();
   }
   
   // generate sorted list
   var j = 0;
   for(sd = 0; sd < sdList.length; sd++)
   {
      sdate = sdList[sd];
      
      for(var i = 0; i < sdMap[sdate]["title"].length; i++)
      {
         title = sdMap[sdate]["title"][i];
         sIndex = sdMap[sdate]["index"][ title ];
         
         //console.log(title, "-", sIndex);
         olist[j] = plist[sIndex];
         j++;
      }
      
   }
   
   //console.log("olist:", olist);
   return olist;
}

function sortCompaniesByStartDate(ilist)
{
   //console.log(ilist);
   var olist = [];   
   var clist = [];
   var tlist = {};
   
   for(var i = 0; i < ilist.length; i++)
   {
      sdate = ilist[i]["StartDate"].split("/");
      sd = new Date(sdate[0]+"/1/"+sdate[1]);
      clist.push(sd);
      tlist[sd] = i;
   }
   
   clist.sort(dateSort);
   //console.log(clist);
   
   for(var i = 0; i < clist.length; i++)
   {
      olist[i] = ilist[ tlist[ clist[i] ] ];
   }
   
   //console.log(olist);
   return olist;
}

function buildListOfCompanies(list)
{
   var olist = [];
   var ilist = [];
   
   for(var i = 0; i < list.length; i++)
   {
      if( list[i]["Company"] )
      {
         ilist.push(list[i]);
      }
   }
   
   olist = sortCompaniesByStartDate(ilist);
   //console.log("buildListOfCompanies olist:", olist);
   
   for(var i = 0; i < olist.length; i++)
   {
      if(olist[i]["Projects"])
      {
         olist[i]["Projects"] = sortProjects(olist[i]["Projects"]);
      }
   }
   
   //console.log("buildListOfCompanies olist:", olist);
   return olist;
}
// -------------------------------------


// -------------------------------------
function buildListOfCategoryNames(list)
{
   clist = [];
   tlist = {};
   for(var i = 0; i < list.length; i++)
   {
      if( list[i]["Category"] )
      {
         cname = list[i]["Category"];
         if(jQuery.inArray(cname, clist) == -1)
         {
            clist.push(cname);
         }
      }
   }
   
   clist.sort();
   return clist;
}


function sortItemsByStartDate(ilist)
{
   // build map of dates and indexs for dates
   clist = [];
   slist = {};
   for(var j = 0; j < ilist.length; j++)
   {
      if(ilist[j]["StartDate"])
      {
         sdate = ilist[j]["StartDate"].split("/");
         sd = new Date(sdate[0]+"/1/"+sdate[1]);
      } else {
         sd = new Date();
      }
      
      clist.push(sd);
      slist[sd] = j;
   }
   clist.sort(dateSort);

   olist = [];
   for(var j = 0; j < clist.length; j++)
   {
      olist[j] = ilist[ slist[ clist[j] ] ];

      if(olist[j]["Projects"])
      {
         olist[j]["Projects"] = sortProjects(olist[j]["Projects"]);
      }
   }
   
   //console.log(olist); 
   return olist;
   //
}



function buildListOfCategories(list, nlist)
{
   tlist = {};
   
   for(var i = 0; i < list.length; i++)
   {
      if( list[i]["Category"] )
      {
         tname = list[i]["Category"];
         if(tlist[tname])
         {
            tlist[tname].push(list[i]);
         } else {
            tlist[tname] = [list[i]];
         }
      }
   }
   
   //console.log(nlist);
   //console.log(tlist);
   // sort items
   for(var i = 0; i < nlist.length; i++)
   {      
      tlist[ nlist[i] ] = sortItemsByStartDate( tlist[ nlist[i] ] );
   }
   //console.log(nlist);
   //console.log(tlist);
   
   for(var i in nlist)
   {
      clist[ i ] = {
         "Catagory":nlist[i],
         "Items": tlist[ nlist[i] ]
      };
   }
   
   return clist;
}
// -------------------------------------


companyList = {};
companyNameList = [];

categoryList = {};
categoryNameList = [];

jQuery.ajax({ url:"json/projects.json" })
 .done(
   function ( data ) {
      
      if(typeof(data) != "object")
      {
         data = jQuery.parseJSON(data);
      }
      
      companyNameList = [ { Names : buildListOfCompanyNames(data.List) } ];
      companyList  = buildListOfCompanies(data.List);
      
      categoryNameListTmp = buildListOfCategoryNames(data.List);
      categoryList = buildListOfCategories(data.List, categoryNameListTmp);
      categoryNameList = [ { Names : categoryNameListTmp } ];
   }
);

var dateSort = function (d1, d2)
{
   if(d1 < d2) return 1;
   if(d1 > d2) return -1;
   return 0;
}