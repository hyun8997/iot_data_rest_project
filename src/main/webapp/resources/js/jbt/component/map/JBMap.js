//!function(){var e=[{Type:"script",ObjNm:"proj4",ScrptNm:"lib/proj4/proj4.js"},{Type:"script",ObjNm:"proj4.custom",ScrptNm:"lib/proj4/proj4.custom.js"},{Type:"script",ObjNm:"_ol_before",ScrptNm:"lib/ol/ol-before.js"},{Type:"script",ObjNm:"ol",ScrptNm:"lib/ol/ol-debug.js"},{Type:"script",ObjNm:"ol.custom",ScrptNm:"lib/ol/ol-debug-custom.js"},{Type:"css",ObjNm:"ol.css",ScrptNm:"lib/ol/ol.css"},{Type:"css",ObjNm:"JBMap.css",ScrptNm:"css/JBMap.css"},{Type:"script",ObjNm:"NaverRoadView",ScrptNm:"roadview/naver.js"},{Type:"script",ObjNm:"DaumRoadView",ScrptNm:"roadview/daum.js"},{Type:"script",ObjNm:"RoadView",ScrptNm:"roadview/roadview.js"}];function t(e){var t=e.split("--\x3e");try{for(var o=window,r=0,n=t.length;r<n;r++){o=o[t[r]]}if(void 0===o)throw"No Script : "+e;return!0}catch(e){return!1}}function o(e){for(var t="",o=document.getElementsByTagName("link"),r=0,n=o.length;r<n;r++){var a=o[r];if(-1!=a.href.indexOf(e)){var l=a.href;t=l.substr(0,l.lastIndexOf(e));break}}return t}for(var r,n,a,l,i=function(e){for(var t="",o=document.getElementsByTagName("script"),r=0,n=o.length;r<n;r++){var a=o[r];if(-1!=a.src.indexOf(e)){var l=a.src;t=l.substr(0,l.lastIndexOf(e));break}}return t}("JBMap.js"),s=0,c=e.length;s<c;s++){var u=e[s];if("script"==u.Type)t(u.ObjNm)||(a=i+u.ScrptNm,l=void 0,(l=document.createElement("script")).type="text/javascript",l.src=a,l.async=!1,document.head.appendChild(l),console.log("Init Script : "+a));else if("css"==u.Type){""==o(u.ObjNm)&&(r=i+u.ScrptNm,n=void 0,(n=document.createElement("link")).type="text/css",n.href=r,n.rel="stylesheet",document.head.appendChild(n),console.log("Init Css : "+r))}}}();var JBMap=function(e){void 0===e&&(e={});var t=null,o=null,r=null,n=null,a={base:{},vector:{},cluster:{},wms:{},image:{}},l=new ol.format.WKT,i=new ol.Sphere(6378137),s=void 0===e.isGeoDesic||e.isGeoDesic,c=null,u={},m={},f={},v=[],g=[],p={},d=null,y=null,E=[],T={},h={},O=null,w=null,S={moveend:{},click:{},zoomend:{},move:{},mousemove:{},rotate:{}},C=0,R=new ol.style.Style({fill:new ol.style.Fill({color:"rgba(255, 255, 255, 0.2)"}),stroke:new ol.style.Stroke({color:"#ffcc33",width:2}),image:new ol.style.Circle({radius:7,fill:new ol.style.Fill({color:"#ffcc33"})})}),N=new ol.style.Style({fill:new ol.style.Fill({color:"rgba(53, 187, 205, 0.3)"}),stroke:new ol.style.Stroke({color:"#35bbcd",width:3}),image:new ol.style.Circle({radius:7,fill:new ol.style.Fill({color:"#35bbcd"})})}),b=new ol.style.Style({fill:new ol.style.Fill({color:"rgba(53, 187, 205, 0.2)"}),stroke:new ol.style.Stroke({color:"rgb(53, 187, 205)",lineDash:[10,10],width:3}),image:new ol.style.Circle({radius:5,stroke:new ol.style.Stroke({color:"rgb(53, 187, 205)"}),fill:new ol.style.Fill({color:"rgba(255, 255, 255, 0.2)"})})});var L=function(e){for(var t="",o=document.getElementsByTagName("script"),r=0,n=o.length;r<n;r++){var a=o[r];if(-1!=a.src.indexOf(e)){var l=a.src;t=l.substr(0,l.lastIndexOf(e));break}}return t}("JBMap.js");function x(e){var t;if(s){var o=e.getCoordinates();t=0;for(var a=0,l=o.length-1;a<l;++a){var c=ol.proj.transform(o[a],r,n),u=ol.proj.transform(o[a+1],r,n);t+=i.haversineDistance(c,u)}}else t=Math.round(100*e.getLength())/100;return t>100?Math.round(t/1e3*100)/100+" km":Math.round(100*t)/100+" m"}function M(e){var o;if(s){t.getProjection();var a=e.clone().transform(r,n).getLinearRing(0).getCoordinates();o=Math.abs(i.geodesicArea(a))}else o=e.getArea();return o>1e4?Math.round(o/1e6*100)/100+" km<sup>2</sup>":Math.round(100*o)/100+" m<sup>2</sup>"}function j(e){if(h[e]){var t=h[e].getElement();t.parentNode.parentNode.removeChild(t.parentNode),delete h[e],A()}}var I={},P={MAIN:0,MAX:0};function A(e){for(var t=P.MAIN,o=t,r={},n=t,a=P.MAX;n<=a;n++){var l=I[n],i=h[l];if(i){if(e==l)continue;i.getElement().style.zIndex=++o,r[o]=l}if(o==t+Object.keys(h).length)break}e&&h[e]&&(h[e].getElement().style.zIndex=++o,r[o]=e),P.MAX=o,I=r}function _(){var e;t&&(e=t.getElement()).parentNode.removeChild(e);(e=document.createElement("div")).className="JBTooltip JBTooltip-measure";var t=new ol.Overlay({element:e,offset:[0,-15],positioning:"bottom-center"});return o.addOverlay(t),t}function F(e){if(e&&a.base[e]){var l=a.base[e],i=oe(),s=t.getZoom(),u=t.getRotation(),m=t.getProjection();for(var f in a.base)for(var v=a.base[f].layer,g=0,p=v.length;g<p;g++){v[g].setVisible(!1)}for(g=0,p=l.layer.length;g<p;g++){l.layer[g].setVisible(!0)}T.minZoom=l.minZoom,T.maxZoom=l.maxZoom,T.zoom=s,T.rotation=u,l.projection?(c&&(c=ol.proj.transformExtent(c,r,l.projection)),r=l.projection,T.center=ol.proj.transform(i,n,r),T.projection=r):T.center=t.getCenter(),c&&(T.extent=c),l.resolutions&&(T.resolutions=l.resolutions),l.maxResolution&&(T.maxResolution=l.maxResolution),(t=new ol.View(T)).on("change:center",U),t.on("change:resolution",G),t.on("change:rotation",B),o.setView(t);for(var d in a.vector){var y=(d=a.vector[d]).getSource().getFeatures();for(g=0,p=y.length;g<p;g++){y[g].getGeometry().transform(m,T.projection)}}var E=o.getOverlays().getArray();for(g=0,p=E.length;g<p;g++){var h=E[g],O=h.getPosition();O&&(O=ol.proj.transform(O,m,T.projection),h.setPosition(O))}}}function D(){d.style.display=""}function k(){d.style.display="none"}function U(){var e=t.getCenter();V("move",e=ol.proj.transform(e,r,n))}function Z(e){var t=e.coordinate;V("click",e,t=ol.proj.transform(t,r,n))}function B(){V("rotate",t.getRotation())}function G(){var e=t.getZoom();y.innerHTML=parseInt(e),V("zoomend",e)}function W(){var e=t.getCenter();V("moveend",e=ol.proj.transform(e,r,n))}function V(e,t,o){for(var r in S[e]){S[e][r].call(this,t,o)}}function J(e,t){if(e){var r=null;m[e]&&(r=t||m[e],o.removeInteraction(r),delete m[e]),t&&(m[e]=t,o.addInteraction(t))}}function H(e,t,o){try{var r=null;if("string"==typeof e)r=l.readFeature(e).getGeometry();else{if("object"!=typeof e)return null;r=e}return r.transform(t,o)}catch(e){return console.log(e),null}}function z(e,o){var a=ol.proj.transform([e,o],n,r);t.setCenter(a)}function Y(e){t.setZoom(e)}function X(e){o.addLayer(e)}function K(e){o.removeLayer(e)}function q(e){if(a.vector[e]){for(var t=m.featureClick.getFeatures(),o=t.getArray(),r=new Array,n=0,l=o.length;n<l;n++){var i=o[n];i.layerName==e&&r.push(i)}for(n=0,l=r.length;n<l;n++){var s=r[n];t.remove(s)}K(a.vector[e]),delete a.vector[e],f[e]&&delete f[e];for(n=0;n<v.length;n++){var c=v[n];null!=c&&c.get("name")==e&&(v.splice(n,1),n--)}}}function Q(e,t,o,r,n,l,i,s,c){q(e),t||(t=new ol.source.Vector),r||(r=function(e,t,o){return R}),a.vector[e]=new ol.layer.Vector({name:e,layerType:"VECTOR",style:r,source:t}),"number"==typeof c&&(c+=C,a.vector[e].setZIndex(c)),X(a.vector[e]),o&&ee(e,o),(n||l||i||s)&&(v.push(a.vector[e]),f[e]={},f[e].select=n,f[e].unselect=l,f[e].hover=i,f[e].unhover=s)}function $(e,t,o,a){var i=null;if("string"==typeof e)i=l.readFeature(e);else{if("object"!=typeof e)return null;i=e}return a&&i.getGeometry().transform(n,r),t&&i.setProperties(t),o&&i.setStyle(o),i}function ee(e,t){if(t.length||(t=[t]),a.vector[e]){for(var o=0,r=t.length;o<r;o++){t[o].layerName=e}a.vector[e].getSource().addFeatures(t)}}function te(e){var t=a.vector[e];if(t){for(var o=m.featureClick.getFeatures(),r=o.getArray(),n=new Array,l=0,i=r.length;l<i;l++){var s=r[l];s.layerName==e&&n.push(s)}for(l=0,i=n.length;l<i;l++){var c=n[l];o.remove(c)}t.getSource().clear()}}function oe(){var e=t.getCenter();return e=ol.proj.transform(e,r,n)}function re(e,a){var i=t.calculateExtent(o.getSize());if(a&&(i=ol.proj.transformExtent(i,r,n)),!e||"extent"==e.toLowerCase())return i;var s=ol.geom.Polygon.fromExtent(i);return"polygon"==e.toLowerCase()?s:"string"==e.toLowerCase()?l.writeGeometry(s):void 0}function ne(e){if(46==e.keyCode&&null!=O){m.featureHover.getFeatures().remove(O),m.featureClick.getFeatures().remove(O);var t=a.vector.DRAW_FEATURE.getSource();t.removeFeature(O),O=null,k(),ie(t)}}function ae(e){return O=e,"If you want to delete it, press [Delete] key."}function le(e){O=null}function ie(e){for(var t=e.getFeatures(),o=[],a=0,s=t.length;a<s;a++){var c=t[a],u=c.getGeometry(),m=c.getProperties(),f=m.GEOM_TYPE,v=0,g=[0,0],p="";"Circle"==f?(v=m.RADIUS,g=ol.extent.getCenter(u.getExtent()),g=ol.proj.transform(g,r,n),p=ol.geom.Polygon.circular(i,g,v)):"Polygon"==f||"LineString"==f?(g=ol.extent.getCenter(u.getExtent()),g=ol.proj.transform(g,r,n),(p=u.clone()).transform(r,n)):((p=u.clone()).transform(r,n),g=p.getCoordinates()),p=l.writeGeometry(p),o[a]={type:f,radius:v,center:g,geom:p}}w&&w.call(this,o)}function se(e,t,o){var r=a.vector[e],n=null;if(r)for(var l=r.getSource().getFeatures(),i=0,s=l.length;i<s;i++){var c=l[i],u=c.getProperties();if(void 0!==u[t])if(u[t]==o){n=c;break}}return n}return function(){if((d=document.createElement("div")).style.position="absolute",d.style.display="none",d.className="JBMap_TooltipBox",(y=document.createElement("div")).className="JBMap_viewZoom",T.minZoom=void 0===e.minZoom?1:e.minZoom,T.maxZoom=void 0===e.maxZoom?14:e.maxZoom,n=void 0===e.displayProjection?"EPSG:4326":e.displayProjection,r=void 0===e.projection?"EPSG:3857":e.projection,T.projection=r,T.zoom=void 0===e.zoom?7:e.zoom,e.center){var l=e.center;try{l=ol.proj.transform(l,n,r),T.center=l}catch(e){T.center=null}}else T.center=ol.proj.transform([127.7528832672847,36.23307548960749],"EPSG:4326",r);e.resolutions&&(T.resolutions=e.resolutions),e.extent&&(c=ol.proj.transformExtent(e.extent,n,r),T.extent=c),t=new ol.View(T);var i=null;if(u.ZOOM=new ol.custom.control.Zoom,e.isRotate){var s=new ol.interaction.DragRotate({condition:ol.custom.events.condition.ctrlKeyOnly});i=ol.interaction.defaults({altShiftDragRotate:!1,dragPan:!1,mouseWheelZoom:!1,doubleClickZoom:!1}).extend([s,new ol.interaction.DragPan({kinetic:!1}),new ol.interaction.MouseWheelZoom({duration:0})])}else i=ol.interaction.defaults({altShiftDragRotate:!1,dragPan:!1,mouseWheelZoom:!1,doubleClickZoom:!1}).extend([new ol.interaction.DragPan({kinetic:!1}),new ol.interaction.MouseWheelZoom({duration:0})]);var m={};null!=i&&(m.interactions=i),m.target=void 0===e.mapDiv?"map":e.mapDiv,m.view=t;var E=[];if(E.push(u.ZOOM),void 0!==e.overview){var h={};h.maxZoom=void 0===e.overview.maxZoom?T.maxZoom:e.overview.maxZoom,h.minZoom=void 0===e.overview.minZoom?T.minZoom:e.overview.minZoom,h.projection=void 0===e.overview.projection?T.projection:e.overview.projection,void 0!==e.overview.resolutions?h.resolutions=e.overview.resolutions:e.resolutions&&(h.resolutions=e.resolutions),e.extent&&(h.extent=ol.proj.transformExtent(e.extent,n,h.projection));var O={isExtentView:void 0!==e.overview.isExtentView&&e.overview.isExtentView,collapsed:void 0!==e.overview.isHide&&e.overview.isHide,label:void 0!==e.overview.showLabel?e.overview.showLabel:"»",collapseLabel:void 0!==e.overview.hideLabel?e.overview.hideLabel:"«",view:new ol.View(h)};h.extent&&(O.extent=h.extent),e.overview.layers&&(O.layers=e.overview.layers),E.push(new ol.custom.control.OverviewMap(O))}m.controls=ol.control.defaults({zoom:!1,attribution:!1}).extend(E);var w=new Array;if(void 0!==e.baseLayers){a.base=e.baseLayers;for(var S in e.baseLayers)for(var R=e.baseLayers[S].layer,x=0,M=R.length;x<M;x++)w.push(R[x])}if(m.layers=w,C=w.length,(o=new ol.Map(m)).getTargetElement().appendChild(d),e.isLongZoomControl&&(u.ZOOM_SLIDER=new ol.control.ZoomSlider,o.addControl(u.ZOOM_SLIDER)),e.isScaleLine&&(u.SCALE_LINE=new ol.control.ScaleLine,o.addControl(u.SCALE_LINE)),e.isWorldView){var j=document.createElement("span"),I=e.zoomToExtent;I=I?ol.proj.transformExtent(I,n,r):e.extent?ol.proj.transformExtent(e.extent,n,r):ol.proj.transformExtent([123.44238281249997,32.74570253945518,132.71484375,39.00637903337457],"EPSG:4326",r),j.innerHTML="<img src='"+L+"images/world.png' class='JBZoomToExtentImg' />",u.ZOOM_TO_EXTENT=new ol.control.ZoomToExtent({extent:I,label:j}),o.addControl(u.ZOOM_TO_EXTENT)}var P=o.getControls().getArray();for(x=0,M=P.length;x<M;x++){var A=P[x];-1!=A.element.className.indexOf("ol-zoom ol-unselectable")&&(A.element.insertBefore(y,A.element.children[1]),y.innerHTML=t.getZoom())}if(void 0!==e.showBaseLayer)F(e.showBaseLayer);else{var _=Object.keys(a.base);_.length>0&&F(_[0])}t.on("change:center",U),t.on("change:resolution",G),t.on("change:rotation",B),o.on("moveend",W),o.on("click",Z),o.on("pointermove",function(e){var t=e.pixel[1],r=e.pixel[0],n=d.offsetWidth,a=d.offsetHeight,l=o.getTargetElement().offsetWidth;t+15+a>o.getTargetElement().offsetHeight?t=t-a-15:t+=15,r+15+n>l?r=r-n-15:r+=15,d.style.top=t+"px",d.style.left=r+"px",function(e){if(!e.dragging){var t=o.getEventPixel(e.originalEvent);o.hasFeatureAtPixel(t)?o.forEachFeatureAtPixel(e.pixel,function(e,t){if(e){var r=e.get("features");if(r){if(r.length>0){var n=r[0],a=n.layerName;if(p[a]){if(1==r.length&&p[a].HOVER)try{var l=p[a].HOVER.call(this,n);void 0!==l&&null!=l&&(d.innerText=l,D())}catch(e){console.log(e)}return o.getTargetElement().style.cursor="pointer",!1}}}else if(t){var a=t.get("name");if(f[a])return o.getTargetElement().style.cursor="pointer",!1}}}):(k(),o.getTargetElement().style.cursor=""),V("mousemove",e)}}(e)});var H="<img src='"+L+"images/compass.png' style='width:100%;'/>",z=document.getElementsByClassName("ol-compass");for(x=0,M=z.length;x<M;x++)z[x].innerHTML=H;Q("MEASURE",null,null,function(e,t,o){return N}),C++,Q("DRAW_FEATURE",null,null,function(e,t,o){return o?b:N},null,null,ae,le),C++;var Y=new ol.interaction.Select({condition:ol.events.condition.click,style:function(e,t){var o=e.layerName;if(a.vector[o]) return a.vector[o].getStyle().call(this,e,t,"click")},layers:v}),X={pointRadius:20,animate:!1,maxObjects:20,circleMaxObjects:20,isFeatureOpen:function(e){var t=e.layerName,o=a.cluster[t];return!o||o.getFeatureOpen()},maxObjectsError:function(e){var t=!1,o=e.length;if(o>0){var r=e[0].layerName;p[r]&&p[r].MAX_OBJECT_ERROR&&(t=p[r].MAX_OBJECT_ERROR.call(this,o,e[0]))}return t},layers:g,featureStyle:function(e,t){var o=e.get("features"),r=null;if(o&&o.length>0){var n=o[0].layerName;p[n]&&p[n].FEATURE_STYLE&&(r=p[n].FEATURE_STYLE.call(this,o[0],t))}else(r=[]).push(new ol.style.Style({stroke:new ol.style.Stroke({color:"rgba(0,0,0,0.4)",width:1})}));if(null==r){var a=new ol.style.Circle({radius:5,stroke:new ol.style.Stroke({color:"rgba(0,255,0,1)",width:1}),fill:new ol.style.Fill({color:"rgba(0,255,0,0.3)"})});(r=[]).push(new ol.style.Style({image:a,stroke:new ol.style.Stroke({color:"rgba(0,0,0,0.4)",width:1})}))}return r},style:function(e,t){var o=e.get("features"),r=o.length,n=[];if(o.length>1){var a=o[0].layerName;p[a]&&p[a].CLUSTER_STYLE&&(n=p[a].CLUSTER_STYLE.call(this,r,t))}else a=o[0].layerName,p[a]&&p[a].FEATURE_STYLE&&(n=p[a].FEATURE_STYLE.call(this,r,t,"SELECT"));return n}},K=e.cluster;K&&(K.pointRadius&&(X.pointRadius=Math.max(20,K.pointRadius)),K.animate&&(X.animate=K.animate),K.maxObjects&&(X.maxObjects=K.maxObjects),K.circleMaxObjects&&(X.circleMaxObjects=K.circleMaxObjects));var q=new ol.custom.interaction.SelectCluster(X);q.getFeatures().on(["add"],function(e){var t=e.element.get("features");if(1==t.length){var o=t[0],r=o.layerName;p[r]&&p[r].SELECT&&p[r].SELECT.call(this,o)}}),q.getFeatures().on(["remove"],function(e){var t=e.element.get("features");if(1==t.length){var o=t[0],r=o.layerName;p[r]&&p[r].UNSELECT&&p[r].UNSELECT.call(this,o)}});var $=new ol.interaction.Select({condition:ol.events.condition.pointerMove,style:function(e,t){var o=e.layerName;return a.vector[o].getStyle().call(this,e,t,"hover")},layers:v});J("ClusterClick",q),J("featureClick",Y),J("featureHover",$),Y.on("select",function(e){for(var t=e.selected,o=e.deselected,r=0,n=o.length;r<n;r++){var a=(l=o[r]).layerName;f[a]&&f[a].unselect&&f[a].unselect.call(this,l)}for(r=0,n=t.length;r<n;r++){var l;a=(l=t[r]).layerName,f[a]&&f[a].select&&f[a].select.call(this,l)}}),$.on("select",function(e){for(var t=e.selected,o=e.deselected,r=0,n=o.length;r<n;r++){var a=(l=o[r]).layerName;f[a]&&f[a].unhover&&f[a].unhover.call(this,l)}for(r=0,n=t.length;r<n;r++){var l;if(a=(l=t[r]).layerName,f[a]&&f[a].hover)try{var i=f[a].hover.call(this,l);void 0!==i&&null!=i&&(d.innerText=i,D())}catch(e){console.log(e)}}0==t.length&&k()})}(),{getMap:function(){return o},resize:function(){o.updateSize()},changeBaseLayer:function(e){F(e)},setEvent:function(e,t,o){var r,n,a;n=t,a=o,S[r=e]&&(S[r][n]=a)},removeEvent:function(e,t){var o,r;r=t,S[o=e]&&delete S[o][r]},destroy:function(){!function(){for(var e in a)for(var r in a[e]){var n=a[e][r];o.removeLayer(n)}t.un("change:center",U),t.un("change:resolution",G),o.un("moveend",W),o=null,t=null}()},setCenter:function(e,t){z(e,t)},getCenter:function(){return oe()},setZoom:function(e){Y(e)},getZoom:function(){return t.getZoom()},zoomIn:function(){var e=t.getZoom();t.setZoom(e+1)},zoomOut:function(){var e=t.getZoom();t.setZoom(e-1)},setRotate:function(e){!function(e){try{t.rotate(e)}catch(e){console.log(e)}}(e)},getRotate:function(){return t.getRotation()},movePosition:function(e,o,a,l){!function(e,o,a,l){var i=H("POINT("+e+" "+o+")",n,r);try{t.setCenter(i.getCoordinates())}catch(e){console.log(e)}try{t.setZoom(a)}catch(e){console.log(e)}try{t.rotate(l)}catch(e){console.log(e)}}(e,o,a,l)},getMapPosition:function(){return{lonlat:oe(),zoom:t.getZoom(),rotate:t.getRotation()}},getPixelByGeom:function(e,t){return function(e,t){if("undefiend"!=typeof e.getType()&&"Point"==e.getType())return t&&(e=H(e,n,r)),o.getPixelFromCoordinate(e.getCoordinates());console.log("getPixelByGeom Parameter Not Point")}(e,t)},getGeomByPixel:function(e,t){return l=t,i=null,"object"==typeof(a=e)&&a.length&&2==a.length?(i=o.getCoordinateFromPixel(a),i=new ol.geom.Point(i),l&&(i=H(i,r,n))):console.log("Not Pixel Data"),i;var a,l,i},transformByGeom:function(e,t,o){return H(e,t,o)},getBounds:function(){return re("string",!0)},getLengthByLine:function(e,t){return function(e,t){var o=null;if("string"==typeof e)o=l.readFeature(e).getGeometry();else{if("object"!=typeof e)return null;o=e}return t&&(o=H(o,n,r)),x(o)}(e,t)},getAreaByPolygon:function(e,t){return function(e,t){var o=null;if("string"==typeof e)o=l.readFeature(e).getGeometry();else{if("object"!=typeof e)return null;o=e}return t&&(o=H(o,n,r)),M(o)}(e,t)},getExtent:function(e,t){return re(e,t)},setExtent:function(e,a,l,i){var s=[e,a,l,i];s=ol.proj.transformExtent(s,n,r),t.fit(s,o.getSize())},setZoomToExtent:function(e){var a,i;a=e,i=l.readGeometry(a),-1!=a.toUpperCase().indexOf("POINT(")?(z(i.getCoordinates()[0],i.getCoordinates()[1]),Y(t.getMaxZoom())):(i.transform(n,r),t.fit(i,o.getSize()))},getWKTGeom:function(e){return function(e){try{return l.writeGeometry(e.transform(r,n))}catch(e){return console.log(e),null}}(e)},getGeomFromWKT:function(e,t,o){return function(e,t,o){try{var r=l.readGeometry(e);return void 0!==t&&void 0!==o&&r.transform(t,o),r}catch(e){return console.error(e),null}}(e,t,o)},setVisibleLayer:function(e,t){!function(e,t){for(var o in a)for(var r in a[o])e==r&&a[o][r].setVisible(t)}(e,t)},setMeasureControl:function(e){!function(e){J("MEASURE");var t=a.vector.MEASURE.getSource(),o={AREA:"Polygon",LENGTH:"LineString"},r=null;if(o[e]&&(r=o[e]),r){var n=new ol.interaction.Draw({source:t,type:r,style:b});J("MEASURE",n);var l=null,i=null,s=_();n.on("drawstart",function(e){i=e.feature;var t=e.coordinate;l=i.getGeometry().on("change",function(e){var o,r=e.target;r instanceof ol.geom.Polygon?(o=M(r),t=r.getInteriorPoint().getCoordinates()):r instanceof ol.geom.LineString&&(o=x(r),t=r.getLastCoordinate()),s.getElement().innerHTML=o,s.setPosition(t)})},this),n.on("drawend",function(){var e=s.getElement();e.className="JBTooltip JBTooltip-static",s.setOffset([0,-7]),i=null,E.push(e),s=_(),ol.Observable.unByKey(l)},this)}else{te("MEASURE");for(var c=0,u=E.length;c<u;c++){var m=E[c];m.parentNode.removeChild(m)}E=[]}}(e)},setTooltip:function(e,t,a,l,i,s){!function(e,t,a,l,i,s){if(j(e),t){var c=document.createElement("div");if(c.onclick=function(t){var o=t.target;"INPUT"==o.tagName.toUpperCase()&&"BUTTON"==o.type.toUpperCase()||A(e)},l){var u=document.createElement("div");u.style.position="relative",u.style.height="0px";var m=document.createElement("img");m.className="JBTooltip-closeBtn",m.src=L+"images/popup_close.png",m.onclick=function(){var t=h[e];j(e),t.close&&t.close.call(this,e)},u.appendChild(m),c.appendChild(u)}c.appendChild(t),i||(i=JBMap.CODE.TOOLTIP_POSITION.LEFT_TOP),c.className="JBTooltip JBTooltip-content "+i;var f=[6,-6];i==JBMap.CODE.TOOLTIP_POSITION.LEFT_MIDDLE?f=[6,0]:i==JBMap.CODE.TOOLTIP_POSITION.LEFT_BOTTOM?f=[6,6]:i==JBMap.CODE.TOOLTIP_POSITION.CENTER_TOP?f=[0,8]:i==JBMap.CODE.TOOLTIP_POSITION.CENTER_MIDDLE?f=[0,0]:i==JBMap.CODE.TOOLTIP_POSITION.CENTER_BOTTOM?f=[0,-8]:i==JBMap.CODE.TOOLTIP_POSITION.RIGHT_TOP?f=[-6,-6]:i==JBMap.CODE.TOOLTIP_POSITION.RIGHT_MIDDLE?f=[-6,0]:i==JBMap.CODE.TOOLTIP_POSITION.RIGHT_BOTTOM&&(f=[-6,6]);var v=new ol.Overlay({element:c,offset:f,positioning:i});h[e]=v,s&&(v.close=s);var g=null;"string"==typeof a&&(a=H(a,n,r)),g=a.length?a:"Point"==a.getType()?a.getCoordinates():a.getLastCoordinate(),o.addOverlay(v),v.setPosition(g),A(e)}}(e,t,a,l,i,s)},moveTooltip:function(e,t){!function(e,t){if(h[e]){var o=h[e],a=null;"string"==typeof t&&(t=H(t,n,r)),a=t.length?t:"Point"==t.getType()?t.getCoordinates():t.getLastCoordinate(),o.setPosition(a)}}(e,t)},setVectorLayer:function(e,t,o,r,n,a,l,i,s){Q(e,t,o,r,n,a,l,i,s)},removeVectorLayer:function(e){q(e)},createFeature:function(e,t,o,r){return $(e,t,o,r)},addFeatures:function(e,t){ee(e,t)},removeAllFeatures:function(e){te(e)},removeFeature:function(e,t,o){!function(e,t,o){var r=a.vector[e];if(r){var n=m.featureClick.getFeatures(),l=se(e,t,o);n.remove(l),r.getSource().removeFeature(l)}}(e,t,o)},getFeature:function(e,t,o){return se(e,t,o)},triggerFeatureClickEvent:function(e,t){!function(e,t){var o=m.featureClick,r=o.getFeatures(),n=r.getArray(),a=new Array,l=new Array;if(t)if(l.push(e),n.length>0){var i=n[0];i!=e&&(a.push(i),r.clear(),r.push(e))}else r.push(e);else{if(0==n.length)return;a.push(e),r.clear()}o.dispatchEvent({type:"select",selected:l,deselected:a})}(e,t)},triggerFeatureHoverEvent:function(e,t){!function(e,t){var o=m.featureHover,r=o.getFeatures(),n=r.getArray(),a=new Array,l=new Array;if(t)if(l.push(e),n.length>0){var i=n[0];i!=e&&(a.push(i),r.clear(),r.push(e))}else r.push(e);else{if(0==n.length)return;a.push(e),r.clear()}o.dispatchEvent({type:"select",selected:l,deselected:a})}(e,t)},setDrawFeatureControl:function(e,o,l,s,c,u){!function(e,o,l,s,c,u){if(J("DRAW_FEATURE"),document.body.removeEventListener("keyup",ne),e=function(e){var t=null;switch(e.toUpperCase()){case"POINT":t="Point";break;case"LINE":t="LineString";break;case"POLYGON":t="Polygon";break;case"MULTI_POINT":t="MultiPoint";break;case"MULTI_LINE":t="MultiLineString";break;case"MULTI_POLYGON":t="MultiPolygon";break;case"CIRCLE":t="Circle";break;default:t=null}return t}(e),w=null,e){s&&(w=s),o&&a.vector.DRAW_FEATURE.setStyle(o),a.vector.DRAW_FEATURE.isMulti=!!l;var m=e;if("Circle"==e&&"number"==typeof u&&u>0?(m="Point",a.vector.DRAW_FEATURE.radius=u):a.vector.DRAW_FEATURE.radius=null,c&&"object"==typeof c&&c.length)for(var f=a.vector.DRAW_FEATURE.getSource(),v=0,g=c.length;v<g;v++){var p=c[v],d=p.type,y=null,E={GEOM_TYPE:d,RADIUS:0};if("Circle"==d){var T=ol.proj.transform(p.center,n,r),h=t.getResolution(),O=h/ol.proj.getPointResolution(r,h,T),S=p.radius/ol.proj.METERS_PER_UNIT.m*O,C=new ol.geom.Circle(T,S);y=new ol.Feature({geometry:C}),E.RADIUS=p.radius}else y=$(p.geom,null,null,!0);y.layerName="DRAW_FEATURE",y.setProperties(E),f.addFeature(y)}var R=new ol.interaction.Draw({features:a.vector.DRAW_FEATURE.getSource().getFeatures(),type:m}),N=new ol.interaction.Modify({source:a.vector.DRAW_FEATURE.getSource()});J("DRAW_FEATURE",R),J("MODIFY_FEATURE",N),document.body.addEventListener("keyup",ne),N.on("modifyend",function(e){var t=e.features.getArray(),o=a.vector.DRAW_FEATURE;if(o){for(var l=o.getSource(),c=0,u=t.length;c<u;c++){var m=t[c],f=m.getGeometry().getType();if("Circle"==f){var v=m.getGeometry(),g=ol.proj.transform(v.getCenter(),r,n),p=ol.proj.transform(v.getLastCoordinate(),r,n),d=i.haversineDistance(g,p);m.setProperties({GEOM_TYPE:f,RADIUS:d})}}s&&ie(l)}}),R.on("drawstart",function(e){var t=a.vector.DRAW_FEATURE;t.isMulti||t.getSource().clear()}),R.on("drawend",function(o){var l=o.feature,s=a.vector.DRAW_FEATURE;if(l.layerName="DRAW_FEATURE",s){var c=s.getSource(),u=l.getGeometry().getType(),m=0;if("Circle"==u){var f=l.getGeometry(),v=ol.proj.transform(f.getCenter(),r,n),g=ol.proj.transform(f.getLastCoordinate(),r,n);m=i.haversineDistance(v,g)}else if("Point"==u&&"Circle"==e){m=a.vector.DRAW_FEATURE.radius;var p=l.getGeometry().clone(),d=t.getResolution(),y=d/ol.proj.getPointResolution(r,d,p.getCoordinates()),E=m/ol.proj.METERS_PER_UNIT.m*y,T=new ol.geom.Circle(p.getCoordinates(),E);l.setGeometry(T),u="Circle"}l.setProperties({GEOM_TYPE:u,RADIUS:m}),c.addFeature(l),w&&ie(c)}},this)}else a.vector.DRAW_FEATURE.getSource().clear()}(e,o,l,s,c,u)},setWmsLayer:function(e,t,o,r,n,l,i,s,c){!function(e,t,o,r,n,l,i,s,c){if(a.wms[e]&&(K(a.wms[e]),delete a.wms[e]),t){o||(o={}),o._t=(new Date).getTime(),o.VERSION=c||"1.1.1";var u={name:e,layerType:"WMS"};i&&(u.opacity=i),r&&(u.extent=r),void 0!==s&&(u.visible=s),l?(u.source=new ol.source.ImageWMS({url:t,params:o}),a.wms[e]=new ol.layer.Image(u)):(o.TILED=!0,u.source=new ol.source.TileWMS({url:t,params:o}),a.wms[e]=new ol.layer.Tile(u)),"number"==typeof n&&(n+=C,a.wms[e].setZIndex(n)),X(a.wms[e])}}(e,t,o,r,n,l,i,s,c)},removeWmsLayer:function(e){var t;t=e,K(a.wms[t]),delete a.wms[t]},mergeNewParam:function(e,t){var o,r,n;o=e,r=t,(n=a.wms[o])&&n.getSource().updateParams(r)},setImageLayer:function(e,t,o,n,l,i,s){!function(e,t,o,n,l,i,s){if(a.image[e]&&(K(a.image[e]),delete a.image[e]),t){-1!=t.indexOf("?")?t+="&time="+(new Date).getTime():t+="?time="+(new Date).getTime();var c={};c.url=t,o&&(l&&(o=ol.proj.transformExtent(o,l,r)),c.imageExtent=o),n&&(c.imageSize=n),i||(i=1),a.image[e]=new ol.layer.Image({name:e,layerType:"IMAGE",opacity:i,source:new ol.source.ImageStatic(c)}),"number"==typeof s&&(s+=C,a.image[e].setZIndex(s)),X(a.image[e])}}(e,t,o,n,l,i,s)},removeImageLayer:function(e){var t;t=e,K(a.image[t]),delete a.image[t]},setLayerZoomToExtent:function(e){var t=a.vector[e].getSource().getExtent();o.getView().fit(t,o.getSize())},getWMSLayerInfoUrl:function(e,o,n,l,i,s){return function(e,o,n,l,i,s){var c=t.getResolution(),u=a.wms[e].getSource();l||(l=1);var m={INFO_FORMAT:n,FEATURE_COUNT:l};m.VERSION=s||"1.1.1",i&&(m.callback=i);var f=u.getGetFeatureInfoUrl(o,c,r,m);return f||null}(e,o,n,l,i,s)},setClusterLayer:function(e,t,o,r,n,l,i,s,c,u){!function(e,t,o,r,n,l,i,s,c,u){t||(t=40),"function"!=typeof r&&(r=function(e,t){var o=0,r=0,n=0;e>25?(o=192,r=0,n=0):e>8?(o=255,r=128,n=0):(o=0,r=128,n=0);var a=o+","+r+","+n,l=Math.max(8,Math.min(.75*e,20)),i=2*Math.PI*l/6;return i=[0,i,i,i,i,i,i],[new ol.style.Style({image:new ol.style.Circle({radius:l,stroke:new ol.style.Stroke({color:"rgba("+a+",0.5)",width:15,lineDash:i,lineCap:"butt"}),fill:new ol.style.Fill({color:"rgba("+a+",1)"})}),text:new ol.style.Text({text:e.toString(),fill:new ol.style.Fill({color:"#fff"})})})]});var m=new ol.source.Cluster({distance:t,source:new ol.source.Vector});a.cluster[e]=new ol.custom.layer.AnimatedCluster({name:e,source:m,animationDuration:o,style:function(e,t){var o=e.get("features").length;if(!(o<=0))return o>1?r.call(this,o,t):n.call(this,e.get("features")[0],t)}}),"number"==typeof u&&(u+=C,a.cluster[e].setZIndex(u)),"number"!=typeof viewMaxObjects&&(viewMaxObjects=60),"number"!=typeof circleMaxObjects&&(circleMaxObjects=10),X(a.cluster[e]),g.push(a.cluster[e]),p[e]={},r&&(p[e].CLUSTER_STYLE=r),l&&(p[e].MAX_OBJECT_ERROR=l),n&&(p[e].FEATURE_STYLE=n),i&&(p[e].SELECT=i),s&&(p[e].UNSELECT=s),c&&(p[e].HOVER=c)}(e,t,o,r,n,l,i,s,c,u)},addClusterFeatures:function(e,t){!function(e,t){if(t.length||(t=[t]),a.cluster[e]){for(var o=0,r=t.length;o<r;o++)t[o].layerName=e;a.cluster[e].getSource().getSource().addFeatures(t)}}(e,t)},removeClusterLayer:function(e){!function(e){if(a.cluster[e]){K(a.cluster[e]),delete a.cluster[e];for(var t=0;t<g.length;t++){var o=g[t];null!=o&&o.get("name")==e&&(g.splice(t,1),t--)}}}(e)},setClusterOpen:function(e,t){var o,r,n;o=e,r=t,(n=a.cluster[o])&&n.setFeatureOpen(r)},getLayers:function(){return a}}};JBMap.CODE={EVENT:{MOVE_END:"moveend",CLICK:"click",ZOOM_END:"zoomend",MOVE:"move",MOUSE_MOVE:"mousemove",ROTATE:"rotate"},FEATURE_INFO_FORMAT:{JSON:"application/json",HTML:"text/html",JSONP:"text/javascript",GML2:"application/vnd.ogc.gml",GML3:"application/vnd.ogc.gml/3.1.1",TEXT:"text/plain"},TOOLTIP_POSITION:{LEFT_TOP:"top-left",LEFT_MIDDLE:"center-left",LEFT_BOTTOM:"bottom-left",CENTER_TOP:"top-center",CENTER_MIDDLE:"center-center",CENTER_BOTTOM:"bottom-center",RIGHT_TOP:"top-right",RIGHT_MIDDLE:"center-right",RIGHT_BOTTOM:"bottom-right"},MEASURE_CONTROL:{NONE:"NONE",LENGTH:"LENGTH",AREA:"AREA"}};


! function() {
    var e = [{
        Type: "script",
        ObjNm: "proj4",
        ScrptNm: "lib/proj4/proj4.js"
    }, {
        Type: "script",
        ObjNm: "proj4.custom",
        ScrptNm: "lib/proj4/proj4.custom.js"
    }, {
        Type: "script",
        ObjNm: "_ol_before",
        ScrptNm: "lib/ol/ol-before.js"
    }, {
        Type: "script",
        ObjNm: "ol",
        ScrptNm: "lib/ol/ol-debug.js"
    }, {
        Type: "script",
        ObjNm: "ol.custom",
        ScrptNm: "lib/ol/ol-debug-custom.js"
    }, {
        Type: "css",
        ObjNm: "ol.css",
        ScrptNm: "lib/ol/ol.css"
    }, {
        Type: "css",
        ObjNm: "JBMap.css",
        ScrptNm: "css/JBMap.css"
    }, {
        Type: "script",
        ObjNm: "NaverRoadView",
        ScrptNm: "roadview/naver.js"
    }, {
        Type: "script",
        ObjNm: "DaumRoadView",
        ScrptNm: "roadview/daum.js"
    }, {
        Type: "script",
        ObjNm: "RoadView",
        ScrptNm: "roadview/roadview.js"
    }];

    function t(e) {
        var t = e.split("--\x3e");
        try {
            for (var o = window, r = 0, n = t.length; r < n; r++) {
                o = o[t[r]]
            }
            if (void 0 === o) throw "No Script : " + e;
            return !0
        } catch (e) {
            return !1
        }
    }

    function o(e) {
        for (var t = "", o = document.getElementsByTagName("link"), r = 0, n = o.length; r < n; r++) {
            var a = o[r];
            if (-1 != a.href.indexOf(e)) {
                var l = a.href;
                t = l.substr(0, l.lastIndexOf(e));
                break
            }
        }
        return t
    }
    for (var r, n, a, l, i = function(e) {
            for (var t = "", o = document.getElementsByTagName("script"), r = 0, n = o.length; r < n; r++) {
                var a = o[r];
                if (-1 != a.src.indexOf(e)) {
                    var l = a.src;
                    t = l.substr(0, l.lastIndexOf(e));
                    break
                }
            }
            return t
        }("JBMap.js"), s = 0, c = e.length; s < c; s++) {
        var u = e[s];
        if ("script" == u.Type) t(u.ObjNm) || (a = i + u.ScrptNm, l = void 0, (l = document.createElement("script")).type = "text/javascript", l.src = a, l.async = !1, document.head.appendChild(l), console.log("Init Script : " + a));
        else if ("css" == u.Type) {
            "" == o(u.ObjNm) && (r = i + u.ScrptNm, n = void 0, (n = document.createElement("link")).type = "text/css", n.href = r, n.rel = "stylesheet", document.head.appendChild(n), console.log("Init Css : " + r))
        }
    }
}();
var JBMap = function(e) {
    void 0 === e && (e = {});
    var t = null,
        o = null,
        r = null,
        n = null,
        a = {
            base: {},
            vector: {},
            cluster: {},
            wms: {},
            image: {}
        },
        l = new ol.format.WKT,
        i = new ol.Sphere(6378137),
        s = void 0 === e.isGeoDesic || e.isGeoDesic,
        c = null,
        u = {},
        m = {},
        f = {},
        v = [],
        g = [],
        p = {},
        d = null,
        y = null,
        E = [],
        T = {},
        h = {},
        O = null,
        w = null,
        S = {
            moveend: {},
            click: {},
            zoomend: {},
            move: {},
            mousemove: {},
            rotate: {}
        },
        C = 0,
        R = new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(255, 255, 255, 0.2)"
            }),
            stroke: new ol.style.Stroke({
                color: "#ffcc33",
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: "#ffcc33"
                })
            })
        }),
        N = new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(53, 187, 205, 0.3)"
            }),
            stroke: new ol.style.Stroke({
                color: "#35bbcd",
                width: 3
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: "#35bbcd"
                })
            })
        }),
        b = new ol.style.Style({
            fill: new ol.style.Fill({
                color: "rgba(53, 187, 205, 0.2)"
            }),
            stroke: new ol.style.Stroke({
                color: "rgb(53, 187, 205)",
                lineDash: [10, 10],
                width: 3
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: "rgb(53, 187, 205)"
                }),
                fill: new ol.style.Fill({
                    color: "rgba(255, 255, 255, 0.2)"
                })
            })
        });
    var L = function(e) {
        for (var t = "", o = document.getElementsByTagName("script"), r = 0, n = o.length; r < n; r++) {
            var a = o[r];
            if (-1 != a.src.indexOf(e)) {
                var l = a.src;
                t = l.substr(0, l.lastIndexOf(e));
                break
            }
        }
        return t
    }("JBMap.js");

    function x(e) {
        var t;
        if (s) {
            var o = e.getCoordinates();
            t = 0;
            for (var a = 0, l = o.length - 1; a < l; ++a) {
                var c = ol.proj.transform(o[a], r, n),
                    u = ol.proj.transform(o[a + 1], r, n);
                t += i.haversineDistance(c, u)
            }
        } else t = Math.round(100 * e.getLength()) / 100;
        return t > 100 ? Math.round(t / 1e3 * 100) / 100 + " km" : Math.round(100 * t) / 100 + " m"
    }

    function M(e) {
        var o;
        if (s) {
            t.getProjection();
            var a = e.clone().transform(r, n).getLinearRing(0).getCoordinates();
            o = Math.abs(i.geodesicArea(a))
        } else o = e.getArea();
        return o > 1e4 ? Math.round(o / 1e6 * 100) / 100 + " km<sup>2</sup>" : Math.round(100 * o) / 100 + " m<sup>2</sup>"
    }

    function j(e) {
        if (h[e]) {
            var t = h[e].getElement();
            t.parentNode.parentNode.removeChild(t.parentNode), delete h[e], A()
        }
    }
    var I = {},
        P = {
            MAIN: 0,
            MAX: 0
        };

    function A(e) {
        for (var t = P.MAIN, o = t, r = {}, n = t, a = P.MAX; n <= a; n++) {
            var l = I[n],
                i = h[l];
            if (i) {
                if (e == l) continue;
                i.getElement().style.zIndex = ++o, r[o] = l
            }
            if (o == t + Object.keys(h).length) break
        }
        e && h[e] && (h[e].getElement().style.zIndex = ++o, r[o] = e), P.MAX = o, I = r
    }

    function _() {
        var e;
        t && (e = t.getElement()).parentNode.removeChild(e);
        (e = document.createElement("div")).className = "JBTooltip JBTooltip-measure";
        var t = new ol.Overlay({
            element: e,
            offset: [0, -15],
            positioning: "bottom-center"
        });
        return o.addOverlay(t), t
    }

    function F(e) {
        if (e && a.base[e]) {
            var l = a.base[e],
                i = oe(),
                s = t.getZoom(),
                u = t.getRotation(),
                m = t.getProjection();
            for (var f in a.base)
                for (var v = a.base[f].layer, g = 0, p = v.length; g < p; g++) {
                    v[g].setVisible(!1)
                }
            for (g = 0, p = l.layer.length; g < p; g++) {
                l.layer[g].setVisible(!0)
            }
            T.minZoom = l.minZoom, T.maxZoom = l.maxZoom, T.zoom = s, T.rotation = u, l.projection ? (c && (c = ol.proj.transformExtent(c, r, l.projection)), r = l.projection, T.center = ol.proj.transform(i, n, r), T.projection = r) : T.center = t.getCenter(), c && (T.extent = c), l.resolutions && (T.resolutions = l.resolutions), l.maxResolution && (T.maxResolution = l.maxResolution), (t = new ol.View(T)).on("change:center", U), t.on("change:resolution", G), t.on("change:rotation", B), o.setView(t);
            for (var d in a.vector) {
                var y = (d = a.vector[d]).getSource().getFeatures();
                for (g = 0, p = y.length; g < p; g++) {
                    y[g].getGeometry().transform(m, T.projection)
                }
            }
            var E = o.getOverlays().getArray();
            for (g = 0, p = E.length; g < p; g++) {
                var h = E[g],
                    O = h.getPosition();
                O && (O = ol.proj.transform(O, m, T.projection), h.setPosition(O))
            }
        }
    }

    function D() {
        d.style.display = ""
    }

    function k() {
        d.style.display = "none"
    }

    function U() {
        var e = t.getCenter();
        V("move", e = ol.proj.transform(e, r, n))
    }

    function Z(e) {
        var t = e.coordinate;
        V("click", e, t = ol.proj.transform(t, r, n))
    }

    function B() {
        V("rotate", t.getRotation())
    }

    function G() {
        var e = t.getZoom();
        y.innerHTML = parseInt(e), V("zoomend", e)
    }

    function W() {
        var e = t.getCenter();
        V("moveend", e = ol.proj.transform(e, r, n))
    }

    function V(e, t, o) {
        for (var r in S[e]) {
            S[e][r].call(this, t, o)
        }
    }

    function J(e, t) {
        if (e) {
            var r = null;
            m[e] && (r = t || m[e], o.removeInteraction(r), delete m[e]), t && (m[e] = t, o.addInteraction(t))
        }
    }

    function H(e, t, o) {
        try {
            var r = null;
            if ("string" == typeof e) r = l.readFeature(e).getGeometry();
            else {
                if ("object" != typeof e) return null;
                r = e
            }
            return r.transform(t, o)
        } catch (e) {
            return console.log(e), null
        }
    }

    function z(e, o) {
        var a = ol.proj.transform([e, o], n, r);
        t.setCenter(a)
    }

    function Y(e) {
        t.setZoom(e)
    }

    function X(e) {
        o.addLayer(e)
    }

    function K(e) {
        o.removeLayer(e)
    }

    function q(e) {
        if (a.vector[e]) {
            for (var t = m.featureClick.getFeatures(), o = t.getArray(), r = new Array, n = 0, l = o.length; n < l; n++) {
                var i = o[n];
                i.layerName == e && r.push(i)
            }
            for (n = 0, l = r.length; n < l; n++) {
                var s = r[n];
                t.remove(s)
            }
            K(a.vector[e]), delete a.vector[e], f[e] && delete f[e];
            for (n = 0; n < v.length; n++) {
                var c = v[n];
                null != c && c.get("name") == e && (v.splice(n, 1), n--)
            }
        }
    }

    function Q(e, t, o, r, n, l, i, s, c) {
        q(e), t || (t = new ol.source.Vector), r || (r = function(e, t, o) {
            return R
        }), a.vector[e] = new ol.layer.Vector({
            name: e,
            layerType: "VECTOR",
            style: r,
            source: t
        }), "number" == typeof c && (c += C, a.vector[e].setZIndex(c)), X(a.vector[e]), o && ee(e, o), (n || l || i || s) && (v.push(a.vector[e]), f[e] = {}, f[e].select = n, f[e].unselect = l, f[e].hover = i, f[e].unhover = s)
    }

    function $(e, t, o, a) {
        var i = null;
        if ("string" == typeof e) i = l.readFeature(e);
        else {
            if ("object" != typeof e) return null;
            i = e
        }
        return a && i.getGeometry().transform(n, r), t && i.setProperties(t), o && i.setStyle(o), i
    }

    function ee(e, t) {
        if (t.length || (t = [t]), a.vector[e]) {
            for (var o = 0, r = t.length; o < r; o++) {
                t[o].layerName = e
            }
            a.vector[e].getSource().addFeatures(t)
        }
    }

    function te(e) {
        var t = a.vector[e];
        if (t) {
            for (var o = m.featureClick.getFeatures(), r = o.getArray(), n = new Array, l = 0, i = r.length; l < i; l++) {
                var s = r[l];
                s.layerName == e && n.push(s)
            }
            for (l = 0, i = n.length; l < i; l++) {
                var c = n[l];
                o.remove(c)
            }
            t.getSource().clear()
        }
    }

    function oe() {
        var e = t.getCenter();
        return e = ol.proj.transform(e, r, n)
    }

    function re(e, a) {
        var i = t.calculateExtent(o.getSize());
        if (a && (i = ol.proj.transformExtent(i, r, n)), !e || "extent" == e.toLowerCase()) return i;
        var s = ol.geom.Polygon.fromExtent(i);
        return "polygon" == e.toLowerCase() ? s : "string" == e.toLowerCase() ? l.writeGeometry(s) : void 0
    }

    function ne(e) {
        if (46 == e.keyCode && null != O) {
            m.featureHover.getFeatures().remove(O), m.featureClick.getFeatures().remove(O);
            var t = a.vector.DRAW_FEATURE.getSource();
            t.removeFeature(O), O = null, k(), ie(t)
        }
    }

    function ae(e) {
        return O = e, "If you want to delete it, press [Delete] key."
    }

    function le(e) {
        O = null
    }

    function ie(e) {
        for (var t = e.getFeatures(), o = [], a = 0, s = t.length; a < s; a++) {
            var c = t[a],
                u = c.getGeometry(),
                m = c.getProperties(),
                f = m.GEOM_TYPE,
                v = 0,
                g = [0, 0],
                p = "";
            "Circle" == f ? (v = m.RADIUS, g = ol.extent.getCenter(u.getExtent()), g = ol.proj.transform(g, r, n), p = ol.geom.Polygon.circular(i, g, v)) : "Polygon" == f || "LineString" == f ? (g = ol.extent.getCenter(u.getExtent()), g = ol.proj.transform(g, r, n), (p = u.clone()).transform(r, n)) : ((p = u.clone()).transform(r, n), g = p.getCoordinates()), p = l.writeGeometry(p), o[a] = {
                type: f,
                radius: v,
                center: g,
                geom: p
            }
        }
        w && w.call(this, o)
    }

    function se(e, t, o) {
        var r = a.vector[e],
            n = null;
        if (r)
            for (var l = r.getSource().getFeatures(), i = 0, s = l.length; i < s; i++) {
                var c = l[i],
                    u = c.getProperties();
                if (void 0 !== u[t])
                    if (u[t] == o) {
                        n = c;
                        break
                    }
            }
        return n
    }
    return function() {
        if ((d = document.createElement("div")).style.position = "absolute", d.style.display = "none", d.className = "JBMap_TooltipBox", (y = document.createElement("div")).className = "JBMap_viewZoom", T.minZoom = void 0 === e.minZoom ? 1 : e.minZoom, T.maxZoom = void 0 === e.maxZoom ? 14 : e.maxZoom, n = void 0 === e.displayProjection ? "EPSG:4326" : e.displayProjection, r = void 0 === e.projection ? "EPSG:3857" : e.projection, T.projection = r, T.zoom = void 0 === e.zoom ? 7 : e.zoom, e.center) {
            var l = e.center;
            try {
                l = ol.proj.transform(l, n, r), T.center = l
            } catch (e) {
                T.center = null
            }
        } else T.center = ol.proj.transform([127.7528832672847, 36.23307548960749], "EPSG:4326", r);
        e.resolutions && (T.resolutions = e.resolutions), e.extent && (c = ol.proj.transformExtent(e.extent, n, r), T.extent = c), t = new ol.View(T);
        var i = null;
        if (u.ZOOM = new ol.custom.control.Zoom, e.isRotate) {
            var s = new ol.interaction.DragRotate({
                condition: ol.custom.events.condition.ctrlKeyOnly
            });
            i = ol.interaction.defaults({
                altShiftDragRotate: !1,
                dragPan: !1,
                mouseWheelZoom: !1,
                doubleClickZoom: !1
            }).extend([s, new ol.interaction.DragPan({
                kinetic: !1
            }), new ol.interaction.MouseWheelZoom({
                duration: 0
            })])
        } else i = ol.interaction.defaults({
            altShiftDragRotate: !1,
            dragPan: !1,
            mouseWheelZoom: !1,
            doubleClickZoom: !1
        }).extend([new ol.interaction.DragPan({
            kinetic: !1
        }), new ol.interaction.MouseWheelZoom({
            duration: 0
        })]);
        var m = {};
        null != i && (m.interactions = i), m.target = void 0 === e.mapDiv ? "map" : e.mapDiv, m.view = t;
        var E = [];
        if (E.push(u.ZOOM), void 0 !== e.overview) {
            var h = {};
            h.maxZoom = void 0 === e.overview.maxZoom ? T.maxZoom : e.overview.maxZoom, h.minZoom = void 0 === e.overview.minZoom ? T.minZoom : e.overview.minZoom, h.projection = void 0 === e.overview.projection ? T.projection : e.overview.projection, void 0 !== e.overview.resolutions ? h.resolutions = e.overview.resolutions : e.resolutions && (h.resolutions = e.resolutions), e.extent && (h.extent = ol.proj.transformExtent(e.extent, n, h.projection));
            var O = {
                isExtentView: void 0 !== e.overview.isExtentView && e.overview.isExtentView,
                collapsed: void 0 !== e.overview.isHide && e.overview.isHide,
                label: void 0 !== e.overview.showLabel ? e.overview.showLabel : "»",
                collapseLabel: void 0 !== e.overview.hideLabel ? e.overview.hideLabel : "«",
                view: new ol.View(h)
            };
            h.extent && (O.extent = h.extent), e.overview.layers && (O.layers = e.overview.layers), E.push(new ol.custom.control.OverviewMap(O))
        }
        m.controls = ol.control.defaults({
            zoom: !1,
            attribution: !1
        }).extend(E);
        var w = new Array;
        if (void 0 !== e.baseLayers) {
            a.base = e.baseLayers;
            for (var S in e.baseLayers)
                for (var R = e.baseLayers[S].layer, x = 0, M = R.length; x < M; x++) w.push(R[x])
        }
        if (m.layers = w, C = w.length, (o = new ol.Map(m)).getTargetElement().appendChild(d), e.isLongZoomControl && (u.ZOOM_SLIDER = new ol.control.ZoomSlider, o.addControl(u.ZOOM_SLIDER)), e.isScaleLine && (u.SCALE_LINE = new ol.control.ScaleLine, o.addControl(u.SCALE_LINE)), e.isWorldView) {
            var j = document.createElement("span"),
                I = e.zoomToExtent;
            I = I ? ol.proj.transformExtent(I, n, r) : e.extent ? ol.proj.transformExtent(e.extent, n, r) : ol.proj.transformExtent([123.44238281249997, 32.74570253945518, 132.71484375, 39.00637903337457], "EPSG:4326", r), j.innerHTML = "<img src='" + L + "images/world.png' class='JBZoomToExtentImg' />", u.ZOOM_TO_EXTENT = new ol.control.ZoomToExtent({
                extent: I,
                label: j
            }), o.addControl(u.ZOOM_TO_EXTENT)
        }
        var P = o.getControls().getArray();
        for (x = 0, M = P.length; x < M; x++) {
            var A = P[x]; - 1 != A.element.className.indexOf("ol-zoom ol-unselectable") && (A.element.insertBefore(y, A.element.children[1]), y.innerHTML = t.getZoom())
        }
        if (void 0 !== e.showBaseLayer) F(e.showBaseLayer);
        else {
            var _ = Object.keys(a.base);
            _.length > 0 && F(_[0])
        }
        t.on("change:center", U), t.on("change:resolution", G), t.on("change:rotation", B), o.on("moveend", W), o.on("click", Z), o.on("pointermove", function(e) {
            var t = e.pixel[1],
                r = e.pixel[0],
                n = d.offsetWidth,
                a = d.offsetHeight,
                l = o.getTargetElement().offsetWidth;
            t + 15 + a > o.getTargetElement().offsetHeight ? t = t - a - 15 : t += 15, r + 15 + n > l ? r = r - n - 15 : r += 15, d.style.top = t + "px", d.style.left = r + "px",
                function(e) {
                    if (!e.dragging) {
                        var t = o.getEventPixel(e.originalEvent);
                        o.hasFeatureAtPixel(t) ? o.forEachFeatureAtPixel(e.pixel, function(e, t) {
                            if (e) {
                                var r = e.get("features");
                                if (r) {
                                    if (r.length > 0) {
                                        var n = r[0],
                                            a = n.layerName;
                                        if (p[a]) {
                                            if (1 == r.length && p[a].HOVER) try {
                                                var l = p[a].HOVER.call(this, n);
                                                void 0 !== l && null != l && (d.innerText = l, D())
                                            } catch (e) {
                                                console.log(e)
                                            }
                                            return o.getTargetElement().style.cursor = "pointer", !1
                                        }
                                    }
                                } else if (t) {
                                    var a = t.get("name");
                                    if (f[a]) return o.getTargetElement().style.cursor = "pointer", !1
                                }
                            }
                        }) : (k(), o.getTargetElement().style.cursor = ""), V("mousemove", e)
                    }
                }(e)
        });
        var H = "<img src='" + L + "images/compass.png' style='width:100%;'/>",
            z = document.getElementsByClassName("ol-compass");
        for (x = 0, M = z.length; x < M; x++) z[x].innerHTML = H;
        Q("MEASURE", null, null, function(e, t, o) {
            return N
        }), C++, Q("DRAW_FEATURE", null, null, function(e, t, o) {
            return o ? b : N
        }, null, null, ae, le), C++;
        var Y = new ol.interaction.Select({
                condition: ol.events.condition.click,
                style: function(e, t) {
                    var o = e.layerName;
                    if (a.vector[o]) return a.vector[o].getStyle().call(this, e, t, "click")
                },
                layers: v
            }),
            X = {
                pointRadius: 20,
                animate: !1,
                maxObjects: 20,
                circleMaxObjects: 20,
                isFeatureOpen: function(e) {
                    var t = e.layerName,
                        o = a.cluster[t];
                    return !o || o.getFeatureOpen()
                },
                maxObjectsError: function(e) {
                    var t = !1,
                        o = e.length;
                    if (o > 0) {
                        var r = e[0].layerName;
                        p[r] && p[r].MAX_OBJECT_ERROR && (t = p[r].MAX_OBJECT_ERROR.call(this, o, e[0]))
                    }
                    return t
                },
                layers: g,
                featureStyle: function(e, t) {
                    var o = e.get("features"),
                        r = null;
                    if (o && o.length > 0) {
                        var n = o[0].layerName;
                        p[n] && p[n].FEATURE_STYLE && (r = p[n].FEATURE_STYLE.call(this, o[0], t))
                    } else(r = []).push(new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "rgba(0,0,0,0.4)",
                            width: 1
                        })
                    }));
                    if (null == r) {
                        var a = new ol.style.Circle({
                            radius: 5,
                            stroke: new ol.style.Stroke({
                                color: "rgba(0,255,0,1)",
                                width: 1
                            }),
                            fill: new ol.style.Fill({
                                color: "rgba(0,255,0,0.3)"
                            })
                        });
                        (r = []).push(new ol.style.Style({
                            image: a,
                            stroke: new ol.style.Stroke({
                                color: "rgba(0,0,0,0.4)",
                                width: 1
                            })
                        }))
                    }
                    return r
                },
                style: function(e, t) {
                    var o = e.get("features"),
                        r = o.length,
                        n = [];
                    if (o.length > 1) {
                        var a = o[0].layerName;
                        p[a] && p[a].CLUSTER_STYLE && (n = p[a].CLUSTER_STYLE.call(this, r, t))
                    } else a = o[0].layerName, p[a] && p[a].FEATURE_STYLE && (n = p[a].FEATURE_STYLE.call(this, r, t, "SELECT"));
                    return n
                }
            },
            K = e.cluster;
        K && (K.pointRadius && (X.pointRadius = Math.max(20, K.pointRadius)), K.animate && (X.animate = K.animate), K.maxObjects && (X.maxObjects = K.maxObjects), K.circleMaxObjects && (X.circleMaxObjects = K.circleMaxObjects));
        var q = new ol.custom.interaction.SelectCluster(X);
        q.getFeatures().on(["add"], function(e) {
            var t = e.element.get("features");
            if (1 == t.length) {
                var o = t[0],
                    r = o.layerName;
                p[r] && p[r].SELECT && p[r].SELECT.call(this, o)
            }
        }), q.getFeatures().on(["remove"], function(e) {
            var t = e.element.get("features");
            if (1 == t.length) {
                var o = t[0],
                    r = o.layerName;
                p[r] && p[r].UNSELECT && p[r].UNSELECT.call(this, o)
            }
        });
        var $ = new ol.interaction.Select({
            condition: ol.events.condition.pointerMove,
            style: function(e, t) {
                var o = e.layerName;
                return a.vector[o].getStyle().call(this, e, t, "hover")
            },
            layers: v
        });
        J("ClusterClick", q), J("featureClick", Y), J("featureHover", $), Y.on("select", function(e) {
            for (var t = e.selected, o = e.deselected, r = 0, n = o.length; r < n; r++) {
                var a = (l = o[r]).layerName;
                f[a] && f[a].unselect && f[a].unselect.call(this, l)
            }
            for (r = 0, n = t.length; r < n; r++) {
                var l;
                a = (l = t[r]).layerName, f[a] && f[a].select && f[a].select.call(this, l)
            }
        }), $.on("select", function(e) {
            for (var t = e.selected, o = e.deselected, r = 0, n = o.length; r < n; r++) {
                var a = (l = o[r]).layerName;
                f[a] && f[a].unhover && f[a].unhover.call(this, l)
            }
            for (r = 0, n = t.length; r < n; r++) {
                var l;
                if (a = (l = t[r]).layerName, f[a] && f[a].hover) try {
                    var i = f[a].hover.call(this, l);
                    void 0 !== i && null != i && (d.innerText = i, D())
                } catch (e) {
                    console.log(e)
                }
            }
            0 == t.length && k()
        })
    }(), {
        getMap: function() {
            return o
        },
        resize: function() {
            o.updateSize()
        },
        changeBaseLayer: function(e) {
            F(e)
        },
        setEvent: function(e, t, o) {
            var r, n, a;
            n = t, a = o, S[r = e] && (S[r][n] = a)
        },
        removeEvent: function(e, t) {
            var o, r;
            r = t, S[o = e] && delete S[o][r]
        },
        destroy: function() {
            ! function() {
                for (var e in a)
                    for (var r in a[e]) {
                        var n = a[e][r];
                        o.removeLayer(n)
                    }
                t.un("change:center", U), t.un("change:resolution", G), o.un("moveend", W), o = null, t = null
            }()
        },
        setCenter: function(e, t) {
            z(e, t)
        },
        getCenter: function() {
            return oe()
        },
        setZoom: function(e) {
            Y(e)
        },
        getZoom: function() {
            return t.getZoom()
        },
        zoomIn: function() {
            var e = t.getZoom();
            t.setZoom(e + 1)
        },
        zoomOut: function() {
            var e = t.getZoom();
            t.setZoom(e - 1)
        },
        setRotate: function(e) {
            ! function(e) {
                try {
                    t.rotate(e)
                } catch (e) {
                    console.log(e)
                }
            }(e)
        },
        getRotate: function() {
            return t.getRotation()
        },
        movePosition: function(e, o, a, l) {
            ! function(e, o, a, l) {
                var i = H("POINT(" + e + " " + o + ")", n, r);
                try {
                    t.setCenter(i.getCoordinates())
                } catch (e) {
                    console.log(e)
                }
                try {
                    t.setZoom(a)
                } catch (e) {
                    console.log(e)
                }
                try {
                    t.rotate(l)
                } catch (e) {
                    console.log(e)
                }
            }(e, o, a, l)
        },
        getMapPosition: function() {
            return {
                lonlat: oe(),
                zoom: t.getZoom(),
                rotate: t.getRotation()
            }
        },
        getPixelByGeom: function(e, t) {
            return function(e, t) {
                if ("undefiend" != typeof e.getType() && "Point" == e.getType()) return t && (e = H(e, n, r)), o.getPixelFromCoordinate(e.getCoordinates());
                console.log("getPixelByGeom Parameter Not Point")
            }(e, t)
        },
        getGeomByPixel: function(e, t) {
            return l = t, i = null, "object" == typeof(a = e) && a.length && 2 == a.length ? (i = o.getCoordinateFromPixel(a), i = new ol.geom.Point(i), l && (i = H(i, r, n))) : console.log("Not Pixel Data"), i;
            var a, l, i
        },
        transformByGeom: function(e, t, o) {
            return H(e, t, o)
        },
        getBounds: function() {
            return re("string", !0)
        },
        getLengthByLine: function(e, t) {
            return function(e, t) {
                var o = null;
                if ("string" == typeof e) o = l.readFeature(e).getGeometry();
                else {
                    if ("object" != typeof e) return null;
                    o = e
                }
                return t && (o = H(o, n, r)), x(o)
            }(e, t)
        },
        getAreaByPolygon: function(e, t) {
            return function(e, t) {
                var o = null;
                if ("string" == typeof e) o = l.readFeature(e).getGeometry();
                else {
                    if ("object" != typeof e) return null;
                    o = e
                }
                return t && (o = H(o, n, r)), M(o)
            }(e, t)
        },
        getExtent: function(e, t) {
            return re(e, t)
        },
        setExtent: function(e, a, l, i) {
            var s = [e, a, l, i];
            s = ol.proj.transformExtent(s, n, r), t.fit(s, o.getSize())
        },
        setZoomToExtent: function(e) {
            var a, i;
            a = e, i = l.readGeometry(a), -1 != a.toUpperCase().indexOf("POINT(") ? (z(i.getCoordinates()[0], i.getCoordinates()[1]), Y(t.getMaxZoom())) : (i.transform(n, r), t.fit(i, o.getSize()))
        },
        getWKTGeom: function(e) {
            return function(e) {
                try {
                    return l.writeGeometry(e.transform(r, n))
                } catch (e) {
                    return console.log(e), null
                }
            }(e)
        },
        getGeomFromWKT: function(e, t, o) {
            return function(e, t, o) {
                try {
                    var r = l.readGeometry(e);
                    return void 0 !== t && void 0 !== o && r.transform(t, o), r
                } catch (e) {
                    return console.error(e), null
                }
            }(e, t, o)
        },
        setVisibleLayer: function(e, t) {
            ! function(e, t) {
                for (var o in a)
                    for (var r in a[o]) e == r && a[o][r].setVisible(t)
            }(e, t)
        },
        setMeasureControl: function(e) {
            ! function(e) {
                J("MEASURE");
                var t = a.vector.MEASURE.getSource(),
                    o = {
                        AREA: "Polygon",
                        LENGTH: "LineString"
                    },
                    r = null;
                if (o[e] && (r = o[e]), r) {
                    var n = new ol.interaction.Draw({
                        source: t,
                        type: r,
                        style: b
                    });
                    J("MEASURE", n);
                    var l = null,
                        i = null,
                        s = _();
                    n.on("drawstart", function(e) {
                        i = e.feature;
                        var t = e.coordinate;
                        l = i.getGeometry().on("change", function(e) {
                            var o, r = e.target;
                            r instanceof ol.geom.Polygon ? (o = M(r), t = r.getInteriorPoint().getCoordinates()) : r instanceof ol.geom.LineString && (o = x(r), t = r.getLastCoordinate()), s.getElement().innerHTML = o, s.setPosition(t)
                        })
                    }, this), n.on("drawend", function() {
                        var e = s.getElement();
                        e.className = "JBTooltip JBTooltip-static", s.setOffset([0, -7]), i = null, E.push(e), s = _(), ol.Observable.unByKey(l)
                    }, this)
                } else {
                    te("MEASURE");
                    for (var c = 0, u = E.length; c < u; c++) {
                        var m = E[c];
                        m.parentNode.removeChild(m)
                    }
                    E = []
                }
            }(e)
        },
        setTooltip: function(e, t, a, l, i, s) {
            ! function(e, t, a, l, i, s) {
                if (j(e), t) {
                    var c = document.createElement("div");
                    if (c.onclick = function(t) {
                            var o = t.target;
                            "INPUT" == o.tagName.toUpperCase() && "BUTTON" == o.type.toUpperCase() || A(e)
                        }, l) {
                        var u = document.createElement("div");
                        u.style.position = "relative", u.style.height = "0px";
                        var m = document.createElement("img");
                        m.className = "JBTooltip-closeBtn", m.src = L + "images/popup_close.png", m.onclick = function() {
                            var t = h[e];
                            j(e), t.close && t.close.call(this, e)
                        }, u.appendChild(m), c.appendChild(u)
                    }
                    c.appendChild(t), i || (i = JBMap.CODE.TOOLTIP_POSITION.LEFT_TOP), c.className = "JBTooltip JBTooltip-content " + i;
                    var f = [6, -6];
                    i == JBMap.CODE.TOOLTIP_POSITION.LEFT_MIDDLE ? f = [6, 0] : i == JBMap.CODE.TOOLTIP_POSITION.LEFT_BOTTOM ? f = [6, 6] : i == JBMap.CODE.TOOLTIP_POSITION.CENTER_TOP ? f = [0, 8] : i == JBMap.CODE.TOOLTIP_POSITION.CENTER_MIDDLE ? f = [0, 0] : i == JBMap.CODE.TOOLTIP_POSITION.CENTER_BOTTOM ? f = [0, -8] : i == JBMap.CODE.TOOLTIP_POSITION.RIGHT_TOP ? f = [-6, -6] : i == JBMap.CODE.TOOLTIP_POSITION.RIGHT_MIDDLE ? f = [-6, 0] : i == JBMap.CODE.TOOLTIP_POSITION.RIGHT_BOTTOM && (f = [-6, 6]);
                    var v = new ol.Overlay({
                        element: c,
                        offset: f,
                        positioning: i
                    });
                    h[e] = v, s && (v.close = s);
                    var g = null;
                    "string" == typeof a && (a = H(a, n, r)), g = a.length ? a : "Point" == a.getType() ? a.getCoordinates() : a.getLastCoordinate(), o.addOverlay(v), v.setPosition(g), A(e)
                }
            }(e, t, a, l, i, s)
        },
        moveTooltip: function(e, t) {
            ! function(e, t) {
                if (h[e]) {
                    var o = h[e],
                        a = null;
                    "string" == typeof t && (t = H(t, n, r)), a = t.length ? t : "Point" == t.getType() ? t.getCoordinates() : t.getLastCoordinate(), o.setPosition(a)
                }
            }(e, t)
        },
        setVectorLayer: function(e, t, o, r, n, a, l, i, s) {
            Q(e, t, o, r, n, a, l, i, s)
        },
        removeVectorLayer: function(e) {
            q(e)
        },
        createFeature: function(e, t, o, r) {
            return $(e, t, o, r)
        },
        addFeatures: function(e, t) {
            ee(e, t)
        },
        removeAllFeatures: function(e) {
            te(e)
        },
        removeFeature: function(e, t, o) {
            ! function(e, t, o) {
                var r = a.vector[e];
                if (r) {
                    var n = m.featureClick.getFeatures(),
                        l = se(e, t, o);
                    n.remove(l), r.getSource().removeFeature(l)
                }
            }(e, t, o)
        },
        getFeature: function(e, t, o) {
            return se(e, t, o)
        },
        triggerFeatureClickEvent: function(e, t) {
            ! function(e, t) {
                var o = m.featureClick,
                    r = o.getFeatures(),
                    n = r.getArray(),
                    a = new Array,
                    l = new Array;
                if (t)
                    if (l.push(e), n.length > 0) {
                        var i = n[0];
                        i != e && (a.push(i), r.clear(), r.push(e))
                    } else r.push(e);
                else {
                    if (0 == n.length) return;
                    a.push(e), r.clear()
                }
                o.dispatchEvent({
                    type: "select",
                    selected: l,
                    deselected: a
                })
            }(e, t)
        },
        triggerFeatureHoverEvent: function(e, t) {
            ! function(e, t) {
                var o = m.featureHover,
                    r = o.getFeatures(),
                    n = r.getArray(),
                    a = new Array,
                    l = new Array;
                if (t)
                    if (l.push(e), n.length > 0) {
                        var i = n[0];
                        i != e && (a.push(i), r.clear(), r.push(e))
                    } else r.push(e);
                else {
                    if (0 == n.length) return;
                    a.push(e), r.clear()
                }
                o.dispatchEvent({
                    type: "select",
                    selected: l,
                    deselected: a
                })
            }(e, t)
        },
        setDrawFeatureControl: function(e, o, l, s, c, u) {
            ! function(e, o, l, s, c, u) {
                if (J("DRAW_FEATURE"), document.body.removeEventListener("keyup", ne), e = function(e) {
                        var t = null;
                        switch (e.toUpperCase()) {
                            case "POINT":
                                t = "Point";
                                break;
                            case "LINE":
                                t = "LineString";
                                break;
                            case "POLYGON":
                                t = "Polygon";
                                break;
                            case "MULTI_POINT":
                                t = "MultiPoint";
                                break;
                            case "MULTI_LINE":
                                t = "MultiLineString";
                                break;
                            case "MULTI_POLYGON":
                                t = "MultiPolygon";
                                break;
                            case "CIRCLE":
                                t = "Circle";
                                break;
                            default:
                                t = null
                        }
                        return t
                    }(e), w = null, e) {
                    s && (w = s), o && a.vector.DRAW_FEATURE.setStyle(o), a.vector.DRAW_FEATURE.isMulti = !!l;
                    var m = e;
                    if ("Circle" == e && "number" == typeof u && u > 0 ? (m = "Point", a.vector.DRAW_FEATURE.radius = u) : a.vector.DRAW_FEATURE.radius = null, c && "object" == typeof c && c.length)
                        for (var f = a.vector.DRAW_FEATURE.getSource(), v = 0, g = c.length; v < g; v++) {
                            var p = c[v],
                                d = p.type,
                                y = null,
                                E = {
                                    GEOM_TYPE: d,
                                    RADIUS: 0
                                };
                            if ("Circle" == d) {
                                var T = ol.proj.transform(p.center, n, r),
                                    h = t.getResolution(),
                                    O = h / ol.proj.getPointResolution(r, h, T),
                                    S = p.radius / ol.proj.METERS_PER_UNIT.m * O,
                                    C = new ol.geom.Circle(T, S);
                                y = new ol.Feature({
                                    geometry: C
                                }), E.RADIUS = p.radius
                            } else y = $(p.geom, null, null, !0);
                            y.layerName = "DRAW_FEATURE", y.setProperties(E), f.addFeature(y)
                        }
                    var R = new ol.interaction.Draw({
                            features: a.vector.DRAW_FEATURE.getSource().getFeatures(),
                            type: m
                        }),
                        N = new ol.interaction.Modify({
                            source: a.vector.DRAW_FEATURE.getSource()
                        });
                    J("DRAW_FEATURE", R), J("MODIFY_FEATURE", N), document.body.addEventListener("keyup", ne), N.on("modifyend", function(e) {
                        var t = e.features.getArray(),
                            o = a.vector.DRAW_FEATURE;
                        if (o) {
                            for (var l = o.getSource(), c = 0, u = t.length; c < u; c++) {
                                var m = t[c],
                                    f = m.getGeometry().getType();
                                if ("Circle" == f) {
                                    var v = m.getGeometry(),
                                        g = ol.proj.transform(v.getCenter(), r, n),
                                        p = ol.proj.transform(v.getLastCoordinate(), r, n),
                                        d = i.haversineDistance(g, p);
                                    m.setProperties({
                                        GEOM_TYPE: f,
                                        RADIUS: d
                                    })
                                }
                            }
                            s && ie(l)
                        }
                    }), R.on("drawstart", function(e) {
                        var t = a.vector.DRAW_FEATURE;
                        t.isMulti || t.getSource().clear()
                    }), R.on("drawend", function(o) {
                        var l = o.feature,
                            s = a.vector.DRAW_FEATURE;
                        if (l.layerName = "DRAW_FEATURE", s) {
                            var c = s.getSource(),
                                u = l.getGeometry().getType(),
                                m = 0;
                            if ("Circle" == u) {
                                var f = l.getGeometry(),
                                    v = ol.proj.transform(f.getCenter(), r, n),
                                    g = ol.proj.transform(f.getLastCoordinate(), r, n);
                                m = i.haversineDistance(v, g)
                            } else if ("Point" == u && "Circle" == e) {
                                m = a.vector.DRAW_FEATURE.radius;
                                var p = l.getGeometry().clone(),
                                    d = t.getResolution(),
                                    y = d / ol.proj.getPointResolution(r, d, p.getCoordinates()),
                                    E = m / ol.proj.METERS_PER_UNIT.m * y,
                                    T = new ol.geom.Circle(p.getCoordinates(), E);
                                l.setGeometry(T), u = "Circle"
                            }
                            l.setProperties({
                                GEOM_TYPE: u,
                                RADIUS: m
                            }), c.addFeature(l), w && ie(c)
                        }
                    }, this)
                } else a.vector.DRAW_FEATURE.getSource().clear()
            }(e, o, l, s, c, u)
        },
        setWmsLayer: function(e, t, o, r, n, l, i, s, c) {
            ! function(e, t, o, r, n, l, i, s, c) {
                if (a.wms[e] && (K(a.wms[e]), delete a.wms[e]), t) {
                    o || (o = {}), o._t = (new Date).getTime(), o.VERSION = c || "1.1.1";
                    var u = {
                        name: e,
                        layerType: "WMS"
                    };
                    i && (u.opacity = i), r && (u.extent = r), void 0 !== s && (u.visible = s), l ? (u.source = new ol.source.ImageWMS({
                        url: t,
                        params: o
                    }), a.wms[e] = new ol.layer.Image(u)) : (o.TILED = !0, u.source = new ol.source.TileWMS({
                        url: t,
                        params: o
                    }), a.wms[e] = new ol.layer.Tile(u)), "number" == typeof n && (n += C, a.wms[e].setZIndex(n)), X(a.wms[e])
                }
            }(e, t, o, r, n, l, i, s, c)
        },
        removeWmsLayer: function(e) {
            var t;
            t = e, K(a.wms[t]), delete a.wms[t]
        },
        mergeNewParam: function(e, t) {
            var o, r, n;
            o = e, r = t, (n = a.wms[o]) && n.getSource().updateParams(r)
        },
        setImageLayer: function(e, t, o, n, l, i, s) {
            ! function(e, t, o, n, l, i, s) {
                if (a.image[e] && (K(a.image[e]), delete a.image[e]), t) {
                    -1 != t.indexOf("?") ? t += "&time=" + (new Date).getTime() : t += "?time=" + (new Date).getTime();
                    var c = {};
                    c.url = t, o && (l && (o = ol.proj.transformExtent(o, l, r)), c.imageExtent = o), n && (c.imageSize = n), i || (i = 1), a.image[e] = new ol.layer.Image({
                        name: e,
                        layerType: "IMAGE",
                        opacity: i,
                        source: new ol.source.ImageStatic(c)
                    }), "number" == typeof s && (s += C, a.image[e].setZIndex(s)), X(a.image[e])
                }
            }(e, t, o, n, l, i, s)
        },
        removeImageLayer: function(e) {
            var t;
            t = e, K(a.image[t]), delete a.image[t]
        },
        setLayerZoomToExtent: function(e) {
            var t = a.vector[e].getSource().getExtent();
            o.getView().fit(t, o.getSize())
        },
        getWMSLayerInfoUrl: function(e, o, n, l, i, s) {
            return function(e, o, n, l, i, s) {
                var c = t.getResolution(),
                    u = a.wms[e].getSource();
                l || (l = 1);
                var m = {
                    INFO_FORMAT: n,
                    FEATURE_COUNT: l
                };
                m.VERSION = s || "1.1.1", i && (m.callback = i);
                var f = u.getGetFeatureInfoUrl(o, c, r, m);
                return f || null
            }(e, o, n, l, i, s)
        },
        setClusterLayer: function(e, t, o, r, n, l, i, s, c, u) {
            ! function(e, t, o, r, n, l, i, s, c, u) {
                t || (t = 40), "function" != typeof r && (r = function(e, t) {
                    var o = 0,
                        r = 0,
                        n = 0;
                    e > 25 ? (o = 192, r = 0, n = 0) : e > 8 ? (o = 255, r = 128, n = 0) : (o = 0, r = 128, n = 0);
                    var a = o + "," + r + "," + n,
                        l = Math.max(8, Math.min(.75 * e, 20)),
                        i = 2 * Math.PI * l / 6;
                    return i = [0, i, i, i, i, i, i], [new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: l,
                            stroke: new ol.style.Stroke({
                                color: "rgba(" + a + ",0.5)",
                                width: 15,
                                lineDash: i,
                                lineCap: "butt"
                            }),
                            fill: new ol.style.Fill({
                                color: "rgba(" + a + ",1)"
                            })
                        }),
                        text: new ol.style.Text({
                            text: e.toString(),
                            fill: new ol.style.Fill({
                                color: "#fff"
                            })
                        })
                    })]
                });
                var m = new ol.source.Cluster({
                    distance: t,
                    source: new ol.source.Vector
                });
                a.cluster[e] = new ol.custom.layer.AnimatedCluster({
                    name: e,
                    source: m,
                    animationDuration: o,
                    style: function(e, t) {
                        var o = e.get("features").length;
                        if (!(o <= 0)) return o > 1 ? r.call(this, o, t) : n.call(this, e.get("features")[0], t)
                    }
                }), "number" == typeof u && (u += C, a.cluster[e].setZIndex(u)), "number" != typeof viewMaxObjects && (viewMaxObjects = 60), "number" != typeof circleMaxObjects && (circleMaxObjects = 10), X(a.cluster[e]), g.push(a.cluster[e]), p[e] = {}, r && (p[e].CLUSTER_STYLE = r), l && (p[e].MAX_OBJECT_ERROR = l), n && (p[e].FEATURE_STYLE = n), i && (p[e].SELECT = i), s && (p[e].UNSELECT = s), c && (p[e].HOVER = c)
            }(e, t, o, r, n, l, i, s, c, u)
        },
        addClusterFeatures: function(e, t) {
            ! function(e, t) {
                if (t.length || (t = [t]), a.cluster[e]) {
                    for (var o = 0, r = t.length; o < r; o++) t[o].layerName = e;
                    a.cluster[e].getSource().getSource().addFeatures(t)
                }
            }(e, t)
        },
        removeClusterLayer: function(e) {
            ! function(e) {
                if (a.cluster[e]) {
                    K(a.cluster[e]), delete a.cluster[e];
                    for (var t = 0; t < g.length; t++) {
                        var o = g[t];
                        null != o && o.get("name") == e && (g.splice(t, 1), t--)
                    }
                }
            }(e)
        },
        setClusterOpen: function(e, t) {
            var o, r, n;
            o = e, r = t, (n = a.cluster[o]) && n.setFeatureOpen(r)
        },
        getLayers: function() {
            return a
        }
    }
};
JBMap.CODE = {
    EVENT: {
        MOVE_END: "moveend",
        CLICK: "click",
        ZOOM_END: "zoomend",
        MOVE: "move",
        MOUSE_MOVE: "mousemove",
        ROTATE: "rotate"
    },
    FEATURE_INFO_FORMAT: {
        JSON: "application/json",
        HTML: "text/html",
        JSONP: "text/javascript",
        GML2: "application/vnd.ogc.gml",
        GML3: "application/vnd.ogc.gml/3.1.1",
        TEXT: "text/plain"
    },
    TOOLTIP_POSITION: {
        LEFT_TOP: "top-left",
        LEFT_MIDDLE: "center-left",
        LEFT_BOTTOM: "bottom-left",
        CENTER_TOP: "top-center",
        CENTER_MIDDLE: "center-center",
        CENTER_BOTTOM: "bottom-center",
        RIGHT_TOP: "top-right",
        RIGHT_MIDDLE: "center-right",
        RIGHT_BOTTOM: "bottom-right"
    },
    MEASURE_CONTROL: {
        NONE: "NONE",
        LENGTH: "LENGTH",
        AREA: "AREA"
    }
};