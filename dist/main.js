var Client=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t),n.d(t,"performAction",(function(){return c}));let o=new Date,r=o.getMonth()+"/"+o.getDate()+"/"+o.getFullYear();function c(e){const t=document.getElementById("city").value,n=document.getElementById("feelings").value;l("http://api.geonames.org/searchJSON?q=",t,"&maxRows=01&username=i3ecca").then((function(e){console.log(e),a("/add",{date:"Date: "+r,latitude:"Latitude: "+e.geonames[0].lat,longitude:"Longitude:"+e.geonames[0].lng,content:"Feeling: "+n}),i()}))}document.getElementById("generate").addEventListener("click",c);const l=async(e,t,n)=>{const o=await fetch(e+t+n);console.log(o);try{const e=await o.json();return console.log(e),e}catch(e){console.log("error",e)}},a=async(e="",t={})=>{console.log(e),console.log(t);await fetch(e,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({date:t.date,lat:t.latitude,lng:t.longitude,content:t.content})})},i=async()=>{const e=await fetch("/all");try{const t=await e.json();console.log(t),document.getElementById("date").innerHTML=t.test.date,document.getElementById("temp").innerHTML=t.test.lat,document.getElementById("temp").innerHTML+=t.test.lng,document.getElementById("content").innerHTML=t.test.content}catch(e){console.log("error",e)}};n(0);console.log(c),console.log("CHANGE!"),document.getElementById("generate").addEventListener("click",c)}]);
//# sourceMappingURL=main.js.map