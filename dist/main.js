var Client=function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";var a,r;n.r(t),n.d(t,"performAction",(function(){return d})),n.d(t,"removeTrip",(function(){return g})),n.d(t,"countdown",(function(){}));let o=new Date,i=o.getMonth()+1+"/"+o.getDate()+"/"+o.getFullYear();function d(e){const t=document.getElementById("city").value.trim();!t||r<=new Date?y():c("http://api.geonames.org/searchJSON?q=",t,"&maxRows=01&username=i3ecca").then((function(e){document.getElementById("error").innerHTML="",0!==e.totalResultsCount?(u("/add",{date:"Date: "+i,latitude:"Latitude: "+e.geonames[0].lat,longitude:"Longitude:"+e.geonames[0].lng}),l(e.geonames[0].lat,e.geonames[0].lng,"&key=61d5d974bf03412997232040306efb56").then((function(e){a<=7?(document.getElementById("daysLeft").innerHTML=a+" days until your trip!",document.getElementById("tempDataHeader").innerHTML="Weather currently for "+e.data[0].city_name+" is: ",document.getElementById("basicWeather").innerHTML=e.data[0].weather.description+" with a current temperature of "+m(e.data[0].temp)+"°F",document.getElementById("photo").innerHTML="",s(e.data[0].city_name)):(document.getElementById("daysLeft").innerHTML=a+" days until your trip!",document.getElementById("tempDataHeader").innerHTML="Typical weather for "+e.city_name+" around this time is: ",document.getElementById("basicWeather").innerHTML=e.data[0].weather.description+" with an average temperature of "+m(e.data[0].temp)+"°F",document.getElementById("photo").innerHTML="",s(e.city_name))}))):y()}))}document.getElementById("generate").addEventListener("click",d),document.getElementById("start").addEventListener("change",(function(){r=document.getElementById("start").value,r=new Date(r.replace(/-/g,"/"));let e=new Date;a=Math.abs(r-e),a=Math.floor(a/864e5)})),document.getElementById("remove").addEventListener("click",g);const c=async(e,t,n)=>{const a=await fetch(e+t+n);try{return await a.json()}catch(e){}},u=async(e="",t={})=>{await fetch(e,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({date:t.date,lat:t.latitude,lng:t.longitude,content:t.content})})},l=async(e,t,n)=>{if(a<=7){const a=await fetch("https://api.weatherbit.io/v2.0/current?lat="+e+"&lon="+t+n);try{return await a.json()}catch(e){}}else{(o=new Date(r)).setDate(o.getDate()+1);var o=o.getFullYear()-1+"-"+(o.getMonth()+1)+"-"+o.getDate();let a=(new Date).getFullYear()-1+"-"+(r.getMonth()+1)+"-"+r.getDate();const i=await fetch("https://api.weatherbit.io/v2.0/history/hourly?lat="+e+"&lon="+t+"&start_date="+a+"&end_date="+o+n);try{return await i.json()}catch(e){}}};function m(e){return Math.floor(9*e/5+32)}const s=async e=>{const t=await fetch("https://pixabay.com/api/?key=18090116-2b1b8d103ff35b260976c7b3c&q="+e+"&image_type=photo&pretty=true");try{const e=await t.json();var n=document.createElement("img");return n.src=e.hits[0].largeImageURL,n.style.height="300px",n.style.width="auto",document.getElementById("photo").innerHTML="",document.getElementById("photo").appendChild(n),e}catch(e){}};function y(){document.getElementById("error").innerHTML="",document.getElementById("photo").innerHTML="",document.getElementById("daysLeft").innerHTML="",document.getElementById("tempDataHeader").innerHTML="",document.getElementById("basicWeather").innerHTML="",document.getElementById("error").innerHTML="Please enter a valid city and date."}function g(e){document.getElementById("error").innerHTML="",document.getElementById("photo").innerHTML="",document.getElementById("daysLeft").innerHTML="",document.getElementById("tempDataHeader").innerHTML="",document.getElementById("basicWeather").innerHTML=""}n(0);console.log(d),console.log("CHANGE!"),document.getElementById("generate").addEventListener("click",d),document.getElementById("remove").addEventListener("click",g)}]);
//# sourceMappingURL=main.js.map