var Client=function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([function(e,t,o){},function(e,t,o){"use strict";var n,a;o.r(t),o.d(t,"performAction",(function(){return c}));let r=new Date,l=r.getMonth()+1+"/"+r.getDate()+"/"+r.getFullYear();function c(e){const t=document.getElementById("city").value;i("http://api.geonames.org/searchJSON?q=",t,"&maxRows=01&username=i3ecca").then((function(e){console.log(e),console.log("The value of NewDate",l),s("/add",{date:"Date: "+l,latitude:"Latitude: "+e.geonames[0].lat,longitude:"Longitude:"+e.geonames[0].lng}),u(e.geonames[0].lat,e.geonames[0].lng,"&key=61d5d974bf03412997232040306efb56").then((function(e){console.log(e),n<=7?(console.log(a),document.getElementById("tempDataHeader").innerHTML="Weather currently for "+e.data[0].city_name+" is: ",document.getElementById("basicWeather").innerHTML=e.data[0].weather.description+" with a current temperature of "+d(e.data[0].temp)+"°F",g(e.data[0].city_name)):(document.getElementById("tempDataHeader").innerHTML="Typical weather for "+e.city_name+" around this time is: ",document.getElementById("basicWeather").innerHTML=e.data[0].weather.description+" with an average temperature of "+d(e.data[0].temp)+"°F",g(e.data[0].city_name)),console.log("The value of NewDate",l)}))}))}document.getElementById("generate").addEventListener("click",c),document.getElementById("start").addEventListener("change",(function(){a=document.getElementById("start").value,a=new Date(a.replace(/-/g,"/")),console.log(a);let e=new Date;n=Math.abs(a-e),n=Math.floor(n/864e5),console.log(n)}));const i=async(e,t,o)=>{const n=await fetch(e+t+o);console.log(n);try{const e=await n.json();return console.log(e),e}catch(e){console.log("error",e)}},s=async(e="",t={})=>{console.log(e),console.log(t);await fetch(e,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({date:t.date,lat:t.latitude,lng:t.longitude,content:t.content})})},u=async(e,t,o)=>{if(n<=7){const n=await fetch("https://api.weatherbit.io/v2.0/current?lat="+e+"&lon="+t+o);console.log(n);try{const e=await n.json();return console.log(e),e}catch(e){console.log("error",e)}}else{var r=new Date(a);console.log(r),console.log(a),r.setDate(r.getDate()+1),console.log(r),console.log(a),console.log(l);r=(new Date).getFullYear()-1+"-"+(r.getMonth()+1)+"-"+r.getDate();console.log(r),console.log(a);let n=(new Date).getFullYear()-1+"-"+(a.getMonth()+1)+"-"+a.getDate();console.log(n);const c=await fetch("https://api.weatherbit.io/v2.0/history/hourly?lat="+e+"&lon="+t+"&start_date="+n+"&end_date="+r+o);console.log(c);try{const e=await c.json();return console.log(e),e}catch(e){console.log("error",e)}}};function d(e){return Math.floor(9*e/5+32)}const g=async e=>{const t=await fetch("https://pixabay.com/api/?key=18090116-2b1b8d103ff35b260976c7b3c&q="+e+"&image_type=photo&pretty=true");console.log(t);try{const e=await t.json();console.log(e);var o=document.createElement("img");return o.src=e.hits[0].largeImageURL,o.style.height="300px",o.style.width="auto",document.getElementById("photo").innerHTML="",document.getElementById("photo").appendChild(o),e}catch(e){console.log("error",e)}};o(0);console.log(c),console.log("CHANGE!"),document.getElementById("generate").addEventListener("click",c)}]);
//# sourceMappingURL=main.js.map