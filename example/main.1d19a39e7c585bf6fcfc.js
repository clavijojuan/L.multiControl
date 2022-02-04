(()=>{var e={79:()=>{function e(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return r(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return r(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}L.Control.multiControl=L.Control.extend({options:{position:"topright",label:"Layer Control"},initialize:function(e,r){this.overlays=e,L.Util.setOptions(this,r)},onAdd:function(e){this._map=e;var r=this._container=this.createStructure();return this.overlays||this.toggle(),r},createStructure:function(){var e=this,r=L.DomUtil.create("div","leaflet-controllable-legend"),n=L.DomUtil.create("div","fas collapse hidden");n.addEventListener("click",(function(){return e.toggle()}));var t=this.createHead(),o=this.createBody();return r.append(n),r.append(t),r.append(o),L.DomEvent.disableClickPropagation(r),r},createBody:function(){var e=this,r=L.DomUtil.create("div","leaflet-controllable-legend-body");if(this.overlays&&this.overlays.length>0){var n=L.DomUtil.create("div");this.overlays.forEach((function(r,t){var o=e.createChild(r,t);n.append(o)})),r.append(n)}return r},createHead:function(){var e=this,r=L.DomUtil.create("div","leaflet-controllable-legend-head"),n=L.DomUtil.create("div","left"),t=L.DomUtil.create("div","right");n.innerHTML='\n            <i class="fas fa-layer-group mr-2"></i> \n            <div>'.concat(this.options.label,"</div>\n        ");var o=L.DomUtil.create("button","btn fas fa-compress"),a=L.DomUtil.create("button","btn fas fa-times");return a.addEventListener("click",(function(){return e._map.removeControl(e._container)})),o.addEventListener("click",(function(r){e.toggle(),r.stopPropagation()})),t.append(o),t.append(a),r.append(n),r.append(t),r},toggleLayer:function(e,r){e.target.checked?r.addTo(this._map):this._map.removeLayer(r)},createChild:function(r,n){var t,o=this;this.validateNames();var a=this.defineLayerElements(r.layer),i=L.DomUtil.create("div","child-container"),l=L.DomUtil.create("div","childOverlay"),c=L.DomUtil.create("div","left"),d=L.DomUtil.create("div","right"),s=L.DomUtil.create("i","fas fa-caret-right"),p=L.DomUtil.create("input","switch"),u=L.DomUtil.create("button","btn fas fa-crosshairs"),f=L.DomUtil.create("button","btn fas fa-times"),m=L.DomUtil.create("div","inputsContainer hidden");p.setAttribute("type","checkbox"),p.setAttribute("id","".concat(r.name+n));var g=L.DomUtil.create("label");g.setAttribute("for","".concat(r.name+n)),g.innerText=r.name;var h=L.DomUtil.create("div","hidden");p.addEventListener("click",(function(e){o.toggleLayer(e,r.layer),s.classList.toggle("fa-caret-right"),s.classList.toggle("fa-caret-down"),m.classList.toggle("hidden"),h.classList.toggle("hidden"),e.stopPropagation()})),null!==(t=r.layer)&&void 0!==t&&t._map&&p.click(),g.addEventListener("click",(function(e){return e.stopPropagation()})),f.addEventListener("click",(function(e){o._map.removeLayer(r.layer),i.remove(),o.overlays.splice(o.findIndexByName(r.name),1),o.evalLength(),e.stopPropagation()})),u.addEventListener("click",(function(e){a.zoom(),e.stopPropagation()})),l.addEventListener("click",(function(e){return p.click()})),c.append(s),c.append(p),c.append(g),d.append(u),d.append(f),l.append(c),l.append(d),i.append(l);var v=L.DomUtil.create("div","left"),y=L.DomUtil.create("div","right");if(m.append(v),m.append(y),i.append(m),a.opacity){var b=L.DomUtil.create("input");b.type="range",b.min=0,b.max=1,b.step=.1,b.value=a.opacity.value,b.addEventListener("input",(function(e){return a.opacity.func(e.target.value)})),v.append(b)}if(a.color&&a.legend){var x,w=document.createElement("input");if(w.type="color",w.value=a.color.value(),i.append(h),r.layer.options.style){var k=r.layer.getLayers().map((function(e){return{color:e.options.color,elemName:e.options.legendLabel}})),C=e(new Map(k.map((function(e){return[e.color,e]}))).values());x=this.createLegend(C),h.append(x)}else{var T={elemName:r.name,color:a.color.value()};x=this.createLegend([T]),h.append(x),v.prepend(w)}w.addEventListener("input",(function(e){a.color.func(e.target.value),x.firstChild.firstChild.style.backgroundColor=e.target.value}))}if(a.bringToFront){var D=L.DomUtil.create("button","btn fas fa-arrow-up");D.setAttribute("type","button"),D.addEventListener("click",(function(e){return a.bringToFront()})),y.append(D)}if(a.bringToBack){var U=L.DomUtil.create("button","btn fas fa-arrow-down");U.setAttribute("type","button"),U.addEventListener("click",(function(e){return a.bringToBack()})),y.append(U)}return i},defineLayerElements:function(e){var r=this,n={opacity:void 0,color:void 0,bringToFront:void 0,bringToBack:void 0,legend:void 0,zoom:void 0};return e instanceof L.Marker?(n.opacity={value:1,func:function(r){return e.setOpacity(r)}},n.zoom=function(){return r._map.setView(e.getLatLng(),r._map.getMaxZoom())}):e instanceof L.Polygon?(n.opacity={value:.2,func:function(r){return e.setStyle({fillOpacity:r})}},n.color={value:function(){return e.options.color||"#3388ff"},func:function(r){return e.setStyle({fillColor:r,color:r})}},n.legend=!0,n.bringToFront=function(){return e.bringToFront()},n.bringToBack=function(){return e.bringToBack()},n.zoom=function(){return r._map.fitBounds(e.getBounds())}):e instanceof L.GeoJSON&&(n.opacity={value:.2,func:function(r){return e.setStyle({fillOpacity:r,opacity:r})}},n.color={value:function(){return e.options.color||"#3388ff"},func:function(r){return e.setStyle({fillColor:r,color:r})}},n.legend=!0,n.bringToFront=function(){return e.bringToFront()},n.bringToBack=function(){return e.bringToBack()},n.zoom=function(){return r._map.fitBounds(e.getBounds())}),n},createLegend:function(e){var r=L.DomUtil.create("div","ml-2");return e.forEach((function(e){var n=document.createElement("div"),t=document.createElement("div");t.style.float="left",t.style.margin="0.1rem",t.style.width="10px",t.style.height="10px",t.style.backgroundColor=e.color,n.append(t);var o=document.createElement("div");o.innerText=e.elemName,o.style.fontSize="10px",n.append(o),r.append(n)})),r},addOverlay:function(e){this.overlays.push(e);var r=document.querySelector(".leaflet-controllable-legend-body").firstChild,n=r.childNodes.length,t=this.createChild(e,n);r.append(t)},toggle:function(){this._container.childNodes.forEach((function(e){return e.classList.toggle("hidden")}))},evalLength:function(){0===this.overlays.length&&this.toggle()},findIndexByName:function(e){return this.overlays.findIndex((function(r){return r.name===e}))},validateNames:function(){this.overlays.map((function(e){return e.name})).sort().reduce((function(e,r){if(e!==r)return r;throw new Error("Overlays names must be unique. Repeated name: '".concat(r,"'"))}))}}),L.multiControl=function(e,r){return new L.Control.multiControl(e,r)}},897:(e,r,n)=>{"use strict";n.d(r,{Z:()=>a});var t=n(645),o=n.n(t)()((function(e){return e[1]}));o.push([e.id,'.mr-2 {\r\n    margin-right: 5px;\r\n}\r\n.mr-4 {\r\n    margin-right: 10px;\r\n}\r\n\r\n.ml-2 {\r\n    margin-left: 5px;\r\n}\r\n\r\n.pointer {\r\n    cursor: pointer;\r\n}\r\n\r\n.hidden {\r\n    display: none !important;\r\n}\r\n\r\n.leaflet-controllable-legend {\r\n    width: auto;\r\n    height: auto;\r\n    background-color:white;\r\n    box-shadow: 0 7px 3px -4px rgb(0 0 0 / 30%), 0 8px 8px rgb(0 0 0 / 20%);\r\n    border-radius:4px;\r\n}\r\n\r\n.leaflet-controllable-legend-head{\r\n    background-color:#333333;\r\n    color:white;\r\n    height: auto;\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 5px;\r\n    font-size:0.8rem;\r\n    border-top-left-radius: 4px;\r\n    border-top-right-radius: 4px;\r\n}\r\n\r\n.leaflet-controllable-legend-head div{\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.leaflet-controllable-legend-body {\r\n    min-width: 170px;\r\n    height: auto;\r\n    padding:0.3rem;\r\n    max-height: 365px;\r\n    overflow-y: auto;\r\n}\r\n.leaflet-controllable-legend-body::-webkit-scrollbar {\r\n    width: 6px;\r\n}\r\n \r\n.leaflet-controllable-legend-body::-webkit-scrollbar-track {\r\n    background-color: #e4e4e4;\r\n    border-radius: 100px;\r\n}\r\n \r\n.leaflet-controllable-legend-body::-webkit-scrollbar-thumb {\r\n    background-color: #333333af;\r\n    border-radius: 100px;\r\n}\r\n\r\n.child-container{\r\n    padding: 0.2rem;\r\n    border: 1px solid #c4c4c4;\r\n    margin-bottom: 5px;\r\n    border-radius: 4px;\r\n}\r\n\r\n.inputsContainer {\r\n    display: flex;\r\n    align-items: center;\r\n    padding: 3px;\r\n    justify-content: space-between;\r\n}\r\n\r\n.childOverlay{\r\n    display: flex;\r\n    padding:0.2rem;\r\n    cursor:pointer;\r\n    justify-content: space-between;\r\n}\r\n\r\n.collapse {\r\n    width: 1.8rem !important;\r\n    height: 1.8rem !important;\r\n    font-size: 1.8rem;\r\n    padding: 0.25rem;\r\n    cursor: pointer;\r\n    color: #333333 !important;\r\n}\r\n\r\n.collapse:hover {\r\n    background-color: #eeeeee;\r\n}\r\n\r\n.collapse:before{\r\n    content: "\\f5fd";\r\n}\r\n\r\n.left {\r\n    display: flex;\r\n    align-items: center;\r\n    margin-right: 10px;\r\n}\r\n\r\n.right {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.child-container:hover{\r\n    background-color:#eeeeee;\r\n}\r\n\r\n.switch {\r\n    position: relative;\r\n    background: white;\r\n    width: 40px;\r\n    height: 20px;\r\n    -webkit-appearance: initial;\r\n    border-radius: 10px;\r\n    outline: none;\r\n    cursor: pointer;\r\n    border: 1px solid #ddd;\r\n}\r\n\r\n.switch:after {\r\n    position: absolute;\r\n    top: 5%;\r\n    display: block;\r\n    width: 45%;\r\n    height: 90%;\r\n    background: #fff;\r\n    box-sizing: border-box;\r\n    transition: all 0.3s ease-in 0s;\r\n    color: black;\r\n    border: #888 1px solid;\r\n    border-radius: 10px;\r\n}\r\n\r\n.switch:after {\r\n    left: 2%;\r\n    content: "";\r\n}\r\n\r\n.switch:checked:after {\r\n    left: 53%;\r\n    content: "";\r\n    background: #333333;\r\n}\r\n\r\n.childOverlay label{\r\n    cursor: pointer;\r\n}\r\n\r\ninput[type="range"] {\r\n    height:4px;\r\n    width: 60px;\r\n    accent-color:#333333;\r\n}\r\n\r\ninput[type="color"] {\r\n\twidth: 30px;\r\n\theight: 21px;\r\n\tborder: none;\r\n\tbackground: none;\r\n}\r\n\r\n.btn{\r\n    border: 0;\r\n    font-size: 0.7rem;\r\n\tbackground-color:transparent;\r\n\tcolor: currentColor;\r\n}\r\n\r\n.btn:hover{\r\n    cursor:pointer;\r\n\topacity: 0.4\r\n}',""]);const a=o},645:e=>{"use strict";e.exports=function(e){var r=[];return r.toString=function(){return this.map((function(r){var n=e(r);return r[2]?"@media ".concat(r[2]," {").concat(n,"}"):n})).join("")},r.i=function(e,n,t){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(t)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(o[i]=!0)}for(var l=0;l<e.length;l++){var c=[].concat(e[l]);t&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),r.push(c))}},r}},379:(e,r,n)=>{"use strict";var t,o=function(){return void 0===t&&(t=Boolean(window&&document&&document.all&&!window.atob)),t},a=function(){var e={};return function(r){if(void 0===e[r]){var n=document.querySelector(r);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[r]=n}return e[r]}}(),i=[];function l(e){for(var r=-1,n=0;n<i.length;n++)if(i[n].identifier===e){r=n;break}return r}function c(e,r){for(var n={},t=[],o=0;o<e.length;o++){var a=e[o],c=r.base?a[0]+r.base:a[0],d=n[c]||0,s="".concat(c," ").concat(d);n[c]=d+1;var p=l(s),u={css:a[1],media:a[2],sourceMap:a[3]};-1!==p?(i[p].references++,i[p].updater(u)):i.push({identifier:s,updater:h(u,r),references:1}),t.push(s)}return t}function d(e){var r=document.createElement("style"),t=e.attributes||{};if(void 0===t.nonce){var o=n.nc;o&&(t.nonce=o)}if(Object.keys(t).forEach((function(e){r.setAttribute(e,t[e])})),"function"==typeof e.insert)e.insert(r);else{var i=a(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(r)}return r}var s,p=(s=[],function(e,r){return s[e]=r,s.filter(Boolean).join("\n")});function u(e,r,n,t){var o=n?"":t.media?"@media ".concat(t.media," {").concat(t.css,"}"):t.css;if(e.styleSheet)e.styleSheet.cssText=p(r,o);else{var a=document.createTextNode(o),i=e.childNodes;i[r]&&e.removeChild(i[r]),i.length?e.insertBefore(a,i[r]):e.appendChild(a)}}function f(e,r,n){var t=n.css,o=n.media,a=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}var m=null,g=0;function h(e,r){var n,t,o;if(r.singleton){var a=g++;n=m||(m=d(r)),t=u.bind(null,n,a,!1),o=u.bind(null,n,a,!0)}else n=d(r),t=f.bind(null,n,r),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else o()}}e.exports=function(e,r){(r=r||{}).singleton||"boolean"==typeof r.singleton||(r.singleton=o());var n=c(e=e||[],r);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var t=0;t<n.length;t++){var o=l(n[t]);i[o].references--}for(var a=c(e,r),d=0;d<n.length;d++){var s=l(n[d]);0===i[s].references&&(i[s].updater(),i.splice(s,1))}n=a}}}}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var a=r[t]={id:t,exports:{}};return e[t](a,a.exports,n),a.exports}n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{"use strict";var e=n(379),r=n.n(e),t=n(897),o={insert:"head",singleton:!1};r()(t.Z,o);t.Z.locals;n(79);var a=L.map("map").setView([51.505,-.09],13);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(a);var i=L.marker([51.5,-.09]).addTo(a),l=L.marker([51.51,-.09]),c=L.marker([51.52,-.09]),d=L.polygon([[51.51,-.1],[51.5,-.08],[51.53,-.07],[51.5,-.06]],{color:"#FF0000"}).addTo(a),s=L.polygon([[51.51,-.1],[51.5,-.08],[51.53,-.07],[51.5,-.06]],{color:"#0122FF"}).addTo(a),p=L.geoJSON(null).addTo(a);p.addData([{type:"LineString",coordinates:[[-.1,51.51],[-.07,51.53]]},{type:"LineString",coordinates:[[-.1,51.5],[-.07,51.5]]}]);var u=[{name:"Marker",layer:i},{name:"Marker2",layer:l},{name:"polygon",layer:d},{name:"polygon2",layer:s},{name:"geojson",layer:p},{name:"geojsonStates",layer:L.geoJSON([{type:"Feature",properties:{party:"Republican"},geometry:{type:"Polygon",coordinates:[[[-104.05,48.99],[-97.22,48.98],[-96.58,45.94],[-104.03,45.94],[-104.05,48.99]]]}},{type:"Feature",properties:{party:"Democrat"},geometry:{type:"Polygon",coordinates:[[[-109.05,41],[-102.06,40.99],[-102.03,36.99],[-109.04,36.99],[-109.05,41]]]}},{type:"Feature",properties:{party:"Democrat"},geometry:{type:"Polygon",coordinates:[[[-109.05,41],[-102.06,40.99],[-102.03,36.99],[-109.04,36.99],[-109.05,41]]]}}],{style:function(e){return"Republican"===e.properties.party?{fillColor:"red",color:"red",opacity:1,legendLabel:e.properties.party}:{fillColor:"blue",color:"blue",opacity:1,legendLabel:e.properties.party}}}).addTo(a)}];L.multiControl(u,{position:"topright",label:"Control de capas"}).addTo(a).addOverlay({name:"Marker3",layer:c})})()})();