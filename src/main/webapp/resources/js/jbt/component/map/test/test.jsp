<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
<div>
	<div id="atmap" style="width:900px; height:700px;z-index : 0;position: absolute;"></div>
	<div id="masterMap" style="width:900px; height:700px;z-index : 1;position: absolute;"></div>
</div>
<script type="text/javascript" src="<c:url value="../JBMap.js" />" charset="utf-8"></script>
<script type="text/javascript" src="//apis.atlan.co.kr/maps/map.js?key=1385472743fb2b42e80da1e85ab4e721ecf55520d5"></script>
<script type="text/javascript">

window.onload = function() {
	atMap = new atlan.maps.Map(document.getElementById('atmap'), {
		center : new atlan.maps.UTMK(953933.75, 1952050.75),
		zoom : 6,
		disableDefaultUI : true 
	});
	
	var mapOption = {
			mapDiv : "masterMap",
			minZoom : 1,
			maxZoom : 14,
			zoom : 7,
			isLongZoomControl : true,
			isWorldView : true,
			isScaleLine : true,
			isGeoDesic : true,
			extent : [124.090576171875, 32.944148888141484, 131.98974609375, 38.556757147352215],
			center : [126.97836778519472, 37.56666989824248],
			resolutions : [4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
			projection : "EPSG:5179",
			displayProjection : "EPSG:4326",
			isRotate : false
	}
	
	jbMap = new JBMap(mapOption);

	jbMap.setEvent("move", "mapMove", function(center) {
		var transCenter = ol.proj.transform(center, "EPSG:4326", "UTMK");
		atMap.setCenter(new atlan.maps.UTMK(transCenter[0], transCenter[1]));
	});
	
	jbMap.setEvent("zoomend", "mapMove", function(zoom) {
		atMap.setZoom(zoom-1);
	});
	var f = jbMap.createFeature("POINT(126.97836778519472 37.56666989824248)", null, null, true);
	jbMap.setVectorLayer("test", null, [f]);
};
</script>
</body>
</html>