/**
 * 
 */

var RoadView = function(options) {
	if(typeof options === 'undefined') options = {};;
	var jsPath = getSrcPath("roadview/roadview.js");
	var imgPath = typeof options.imagePath == "undefined" ? jsPath + "images/icon/roadview.png" : options.imagePath;
	var map = typeof options.map == "undefined" ? null : options.map;
	var view = null;
	var img = null;
	var viewEvent = typeof options.view == "undefined" ? null : options.view;
	var moveEvent = typeof options.move == "undefined" ? null : options.move;
	var errorEvent = typeof options.error == "undefined" ? null : options.error;
	
	//resources/js/jbt/component/map/roadview/roadview.js
	
	if(options.type == "Naver") {
		view = new NaverRoadView();
	}else{
		view = new DaumRoadView({
			radius : 50
		});
	}

	function getSrcPath(jsName) {
		var output = "";
		var scriptArr = document.getElementsByTagName("script");
		
		for(var i=0,cnt=scriptArr.length; i<cnt; i++) {
			var script = scriptArr[i];
			if(script.src.indexOf(jsName) != -1) {
				var srcName = script.src;
				output = srcName.substr(0, srcName.lastIndexOf(jsName));
				break;
			}
		}
		return output;
	};
	
	function on() {
		off();
		img = jQuery("<img>");
		img.attr("id", "RoadViewMouseImg");
		img.attr("src", _contextPath + "resources/images/egovframework/com/map/roadview.png");
		img.css({
			"width" : "35px",
			"height" : "39px",
			"position" : "absolute",
			"z-index" : "1000"
		});
		
		jQuery(map.getMap().getTargetElement()).append(img);

		map.setEvent("mousemove", "RoadView", function(e) {
			var top = e.pixel[1];
			var left = e.pixel[0];
			img.css({
				"top" :  (top - 35) + "px",
				"left" : (left + 10) + "px"
			});
		});
		
		map.setEvent("click", "RoadView", function(e, point) {
			console.log(point);
			showRoadView(point[0], point[1]);
		});
		
	}
	
	function showRoadView(lon, lat, targetDiv) {
		if(targetDiv.length) {
			targetDiv = targetDiv[0];
		}
		view.showRoadView(lon, lat, targetDiv, function() {
			if(viewEvent) {
				viewEvent.call(this);
			}
		}, function(lonlat) {
			console.log(lonlat);
			if(moveEvent) {
				moveEvent.call(this, lonlat);
			}
		},function(msg) {
			if(errorEvent) {
				errorEvent.call(this, msg);
			}
		});
	}
	
	function off() {
		map.removeEvent("mousemove", "RoadView");
		map.removeEvent("click", "RoadView");
		if(img != null) {
			img.remove();
			img = null;
		}
	}
	
	return {
		on : function() {
			on();
		},
		
		off : function() {
			off();
		},
		
		showRoadView : function(lon, lat, targetDiv) {
			showRoadView(lon, lat, targetDiv);
		}
	}
}