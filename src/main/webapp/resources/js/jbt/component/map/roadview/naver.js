/**
 * 
 */

var NaverRoadView = function() {
	
	if(typeof naver == "undefined" || typeof naver.maps == "undefined") {
		alert("Naver Map Javascript API Road Error!!");
		return;
	}
	
	var roadView = null;
	
	function showRoadView(lon, lat, targetDocument, callback, moveCallback, error) {
		var lonlat = new naver.maps.LatLng(lat, lon);
		
		roadView = new naver.maps.Panorama(targetDocument, {
		    position: lonlat
		});
		
		naver.maps.Event.addListener(roadView, "pano_status", function() {
		    var pos = roadView.getLocation();
		    pos = pos.coord;
		    pos = {
		    		lon : pos.lng(),
		    		lat : pos.lat()
		    };
		    
		    moveCallback.call(this, pos);
		});
		naver.maps.Event.addListener(roadView, "init", function() {
			callback.call(arguments);
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