/**
 * 
 */

var DaumRoadView = function(options) {
	
	if(typeof options == "undefined") options = {};
	
	if(typeof daum == "undefined" || typeof daum.maps == "undefined") {
		alert("Daum Map Javascript API Road Error!!");
		return;
	}
	
	var radius = typeof options.radius != "undefined" ? options.radius : 50; 
	
	var roadViewClient = new daum.maps.RoadviewClient();
	var roadView = null;
	
	function showRoadView(lon, lat, targetDocument, callback, moveCallback, error) {
		var lonlat = new daum.maps.LatLng(lat, lon);
		roadViewClient.getNearestPanoId(lonlat, radius, function(panoId) {
			if(panoId == null) {
				if(error) {
					error.call(this, "선택한 지점에 로드뷰가 존재하지 않습니다.");
				}
			}else{
				try{
					roadView = new daum.maps.Roadview(targetDocument);
					roadView.setPanoId(panoId, lonlat);
					daum.maps.event.addListener(roadView, 'position_changed', function() {
						var pos = roadView.getPosition();
						pos = {
								lon : pos.ib,
								lat : pos.jb
						};
						
						moveCallback.call(this, pos);
					});
					callback.call(this);
				}catch(e) {
					console.log(e);
					if(e.message.indexOf("requires Flash Player") != -1) {
						alert("Flash를 설치하시거나 허용하셔야 합니다.");
					}
				}
			}
		});
	}
	
	function removeRoadView() {
		
	}
	
	return {
		showRoadView : function(lon, lat, targetDocument, callback, moveCallback, error) {
			showRoadView(lon, lat, targetDocument, callback, moveCallback, error);
		},
		
		removeRoadView : function() {
			removeRoadView();
		}
	}
}