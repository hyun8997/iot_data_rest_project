/**
 * 공통 function
 */


/**
 * 정규식 특수문자 제거 (날짜 포맷 변경)
 * 
 * @param String date
 * - ex) YYYY-MM-DD HH:MI:SS 형태를 YYYYMMDDHHMISS 형태로 변경
 */
var removeSpcChar = function (str) {
	var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]/gi;
	
	if(regExp.test(str)){
        str = str.replace(regExp, "");
    }

	return str
}

/**
 * 숫자포맷 설정
 * 
 * @param int value, int num
 * - ex) 35, 4 의 파라미터를 '0035' 형태로 변경
 */
var leadingZeros = function (value, num) {
	 var zero = '';
	 value = value.toString();
	
	 if (value.length < num) {
	  for (i = 0; i < num - value.length; i++)
	   zero += '0';
	 }
	 return zero + value;
}

/**
 * 숫자 3단위 마다 콤마 생성
 * @param int val
 */
function addComma(val) {
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 콤마 제거
 * @param String val
 */
function removeComma(val) {
	if(!val || val.length == 0) {
		return '';
	} else {
		return val.split(',').join('');
	}
}

/**
 * 숫자만 입력 되도록 return
 * @param e
 * @returns {Boolean}
 */
function onlyNumber(e) {
	var keyValue = event.keyCode;
	
	if( ((keyValue >= 48) && (keyValue <= 57)) ) {
		return true;
	} else {
		return false;
	}
} 

/**
 * 홀수값인지 판별
 * @param number
 * @returns {Boolean}
 */
function isOdd(number) { 
	return number % 2;
}

/**
 * List Data로 THead생성
 * 
 * @param String name, List<LinkedMap<String, Object>> list
 * - Mybatis에서 resultType으로 java.util.LinkedHashMap 형태로 보내야함 -
 */
function makeThead(name, list) {
	var target = jQuery('#'+name);
	var tr = jQuery('<tr>');
	target.empty();
	
	if(list) {
		for(var i in list) {
			var th = jQuery('<th>');
			th.addClass('addTh');
			th.text(list[i]);
			tr.append(th);
		}
		
		target.append(tr);
	}
}

/**
 * List Data로 Tbody생성
 * 
 * @param String name, List<LinkedMap<String, Object>> list, boolean geomAt
 * - geomAt는 경도,위도 값을 테이블에 표출할지 정하는 Flag(true면 출력)
 * - Mybatis에서 resultType으로 java.util.LinkedHashMap 형태로 보내야함 -
 * - null값이 있으면 <TD>태그에 추가 될때 제거됨 -
 */
function makeTbody(name, list, geomAt) {
	var target = jQuery('#'+name);
	target.empty();

	if(list) {
		jQuery.each(list, function(i, v) {
			var tr = jQuery('<tr>');
			tr.data(v);
			tr.addClass('addTr');
			for(var key in v) {
				if(key == 'ord' || key == 'stn_id'|| key == 'tm' || typeof(v[key]) == 'object') {
//					console.log('Tbody 생성에서 Object 타입 제거');
				} else {
					if(geomAt != null && !geomAt && (key == 'lon' || key == 'lat') ) {
						continue;
					}
					var td = jQuery('<td>');
					td.addClass('addTd');
					td.attr('value', key);
					td.text(v[key]);
					tr.append(td);
				}
			}
			
			target.append(tr);
		});
	}
}

/**
 * 위치조회 기능 추가
 * 
 * @param String name
 * @param boolean firstRowType // 첫번째 로우 표시 여부
 * 			-- res_info 사용(참고)
 * - id값으로 위치조회 TD와 아이콘 생성
 */
function addGeomTd(name, firstRowType) {
	var target = jQuery('#'+name);
	var td = jQuery('<td>');
	var img = '<img class="locationIcon" alt="위치조회" src="'+_contextPath+'resources/images/new/place_btn.png" style="width: 25px;"/>';
	
	jQuery('#'+name+' tr td .locationIcon').empty();
	
	td.append(img);
	target.find('.addTr').append(td);
	
	if(firstRowType != undefined && firstRowType == true){
		jQuery('#'+name+' tr:first td .locationIcon').remove();
	}
}

/**
 * 평년조회 기능 추가
 * 
 * @param String name
 * - id값으로 위치조회 TD와 아이콘 생성
 */
function addChartTd(name, firstRowType) {
	var target = jQuery('#'+name);
	var td = jQuery('<td>');
	var img = '<img class="chartIcon" alt="그래프조회" src="'+_contextPath+'resources/images/new/graph_btn.png" style="width: 25px;"/>';

	jQuery('#'+name+' tr td .chartIcon').empty();
	
	td.append(img);
	target.find('.addTr').append(td);
	
	if(firstRowType != undefined && firstRowType == true){
		jQuery('#'+name+' tr:first td .chartIcon').remove();
	}
}

/**
 * 지도 팝업 추가
 * 
 * @param String layerId, String title, double lon, double lat
 * name: contens를 생성할 div명
 * title: 팝업 타이틀,
 * lon: 경도,
 * lat: 위도
 * - 지점 위치조회 기능으로 팝업 형태의 지도 생성
 */
function makePopupMap(layerId, title, lon, lat, type) {
	var content = jQuery('<div>');
	content.attr('id', 'popupMap');
	content.css('height', '500px');
	content.css('width', '500px');
	
	var btn = "<div><div class='mapControlArea'>"+
		"<div class='mapControl mapZoomIn' style='margin-top: 10px;' title='확대'>"+
			"<img alt='확대' src='"+_contextPath+"resources/images/new/map_zoomin.png'>"+
		"</div>"+
		"<div class='mapControl mapZoomOut' title='축소'>"+
			"<img alt='축소' src='"+_contextPath+"resources/images/new/map_zoomout.png'>"+
		"</div>"+
		"<div class='mapControl mapDistance' title='거리측정'>"+
			"<img alt='거리측정' src='"+_contextPath+"resources/images/new/map_distance.png'>"+
		"</div>"+
		"<div class='mapControl mapMeasure' title='면적측정'>"+
			"<img alt='면적측정' src='"+_contextPath+"resources/images/new/map_measure.png'>"+
		"</div>"+
		"<div class='mapControl mapReset' title='초기화'>"+
			"<img alt='초기화' src='"+_contextPath+"resources/images/new/map_refresh.png'>"+
		"</div>"+
	"</div>";
	
	btn = jQuery(btn);
	
	var template = jQuery("<div>");
	template.addClass("popupMapArea");
	template.append(btn);
	template.append(content);
	
	jbSystemPopup.createPopup(layerId, title, template, {
		position : JBPopup.CODE.POSITION.CENTER_MIDDLE,
		close : function() {
		}
	});
	
	var adrsContent = jQuery('<div>');
	var params = {
			x: lon,
			y: lat
	};
	ajax.call('content/search/vworld/vworldReverseGeocode.do', 'GET', null, params, true, function(data) {
		var list = data.LIST;
		
		if(list && list.length > 0) {
			var d = list[0];
			adrsContent.addClass('addressContent');
			adrsContent.text(d.text);
			content.append(adrsContent);
		}
	});
	
	initPopupMap(lon, lat, type);
	
	jQuery(".mapControlArea .mapControl.mapZoomIn", template).click(function() {
		if(map) {
			map.zoomIn();
		}
	});

	jQuery(".mapControlArea .mapControl.mapZoomOut", template).click(function() {
		if(map) {
			map.zoomOut();
		}
	});

	jQuery(".mapControlArea .mapControl.mapDistance", template).click(function() {
		if(map) {
			map.setMeasureControl(JBMap.CODE.MEASURE_CONTROL.LENGTH);
		}
	});

	jQuery(".mapControlArea .mapControl.mapMeasure", template).click(function() {
		if(map) {
			map.setMeasureControl(JBMap.CODE.MEASURE_CONTROL.AREA);
		}
	});

	jQuery(".mapControlArea .mapControl.mapReset", template).click(function() {
		if(map) {
			map.setMeasureControl(JBMap.CODE.MEASURE_CONTROL.NONE);
		}
	});
	
	function initPopupMap(lon, lat, type) {
		var layerType = 'BASE';
		
		if(type != undefined && type != ''){
			layerType = type;
		}
		
		map = new JBMap({
			mapDiv  : "popupMap",
			isScaleLine : false,
			isWorldView : false,
			isRotate : false,
			showBaseLayer : layerType,
			minZoom : 4,
			maxZoom : 18,
			center : [lon, lat],
			cluster : {
				pointRadius : 20,
				animate : false,
				maxObjects : 30,
				circleMaxObjects : 10
			},
			zoom : 12,
//			extent : [126.3801016231080041,36.8937750172895988, 127.8481131455159954,38.2822605490621015],
			baseLayers : {
				"BASE" : {
					minZoom : 4,
					maxZoom : 18,
					resolutions : [4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395],
					projection : "EPSG:3857",
					layer : [
						new ol.layer.Tile({
							source: new ol.custom.source.Vworld({type : "base"})
						})
					]
				}
				,
				"HYBRID" : {
					minZoom : 4,
					maxZoom : 18,
					resolutions : [4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395],
					projection : "EPSG:3857",
					layer : [
						new ol.layer.Tile({
							source: new ol.custom.source.Vworld({type : "satellite"})
						})
//						,
//						new ol.layer.Tile({
//							source: new ol.custom.source.Vworld({type : "hybrid"})
//						})
						,
						new ol.layer.Tile({
							name : "HYBRID_2",
							source : new ol.source.XYZ({
						    	url : 'http://xdworld.vworld.kr:8080/2d/Hybrid/201710/{z}/{x}/{y}.png',
								maxZoom : 18
							}),
							visible : false
						})
					]
				}
			}
		});
	}
}


/**
 * 벡터 레이어 클릭 이벤트
 * 
 * @param 레이어명(String)
 *        event객체(Object)
 */
/*function vectorClickEvent(layerName, feature) {
	if (layerName) {
//		selectedFeature = feature;
		
		if(jQuery('#leftContentArea').hasClass('on')) {
			jQuery('#mainMenuVisibleBtn').trigger('click');
		}
		if(jQuery('#rightContentArea').hasClass("on")) {
			jQuery('#rightToggleBtn').trigger('click');
		}
		jQuery('#rightToggleBtn').css('display', 'none');
		
		var content = jQuery('<div>');
		var item = jQuery('<div>');
		item.data(feature);

		if (feature.properties && feature.properties.feature_id) {
			item.html(feature.properties.feature_id);
		} else {
			item.html(feature.values_.feature_id);
		}

		item.addClass('feature_info');
		content.append(item);
		
		if(typeof layerName == 'function') {
			jQuery(".scrollWrapper").scrollLeft(0);
			eval(layerName)().make(layerName, feature);
			
			//dataManager 표출
//			DataManager(selectedFeature).show(layerName);
			dataManager.show(layerName, function() {
				map.triggerFeatureClickEvent(feature, false);
			});
		}
		
		// tooltip 생성
		map.setTooltip("FEATURE_INFO", content[0], feature.getProperties().geometry, true, JBMap.CODE.TOOLTIP_POSITION.LEFT_TOP, function() {});
		jQuery('#map .JBTooltip .JBTooltip-closeBtn').remove();
		
	}
}*/

/**
 * 벡터 레이어 데이터 타이틀
 * 
 * @param 레이어명(String)
 *        타이틀 내용( list[Object{titleName, titleValue}] )
 */
/*function makeDataViewTitle(layerName, data) {
	var titleDiv = jQuery('FOOTER #dataViewArea>#dataTitle');
	titleDiv.empty();
	
	if(data) {
		jQuery.each(data, function(i, v) {
			var input = jQuery('<input>').attr('type', 'button');
			input.attr('value', v.titleName);
			input.attr('data', v.titleValue);
			input.attr('alt', v.titleName);
			if(i === 0) {
				input.addClass('selected');
			}
			
			input.click(function() {
				console.log('click!');
				
				titleDiv.find('input[type=button]').removeClass('selected');
				titleDiv.find('input[value='+v.titleName+']').addClass('selected');
				makeDataViewContent(layerName);
			});
			
			titleDiv.append(input);
		});
		
	} else {
		console.log('데이터가 없습니다.');
	}
}*/


/////////////////////////////////////// Old //////////////////////////////////////////////////////

/*function vectorClickEvent(layerName, feature) {
	if (layerName) {
		var content = jQuery('<div>');
		var item = jQuery('<div>');
		item.data(feature);

		if (feature.properties && feature.properties.feature_id) {
			item.html(feature.properties.feature_id);
		} else {
			item.html(feature.values_.feature_id);
		}

		item.addClass('feature_info');
		item.click(function() {
			var jThis = jQuery(this);
			var dd = jThis.data();
			console.log(dd);
			// tooltip 초기화
			map.setTooltip('FEATURE_INFO');

			showLayerInfo(dd);
		});
		content.append(item);

		// tooltip 생성
		map.setTooltip('FEATURE_INFO', content[0], feature.getProperties().geometry, function() {
			console.log('closeTooltip');
			map.triggerFeatureClickEvent(feature, false);
		});
	}
}*/

/*function wmsClickEvent(layer_id, evt, coordinate, layer_name){
	console.log(evt);
	console.log(coordinate);
	
	map.setTooltip('FEATURE_INFO');
	
	var url = map.getWMSLayerInfoUrl(layer_id, evt.coordinate, JBMap.CODE.FEATURE_INFO_FORMAT.JSON, 10);
	
	var param = {};
	param['_url'] = url.substr(0, url.indexOf('?'));
	param['RequestCharset'] = 'UTF-8';

	var params = url.substr(url.indexOf('?')+1, url.length -1);
	var paramArr = params.split('&');
	for(var i=0,cnt=paramArr.length; i<cnt; i++) {
		var a = paramArr[i];
		var b = a.split('=');
		if(b.length != 2) {
			continue;
		}
		var key = b[0];
		var value = b[1];
		param[key] = value;
	}
	
	ajax.call('cmm/proxy.do', 'GET', null, param, true, function(data) {
		var d = data.DATA;
		if(d) {
			d = JSON.parse(d);
			var features = d.features;
			console.log(features);
			if(features.length) {
				var content = jQuery('<div>');
				
				for(var i=0,cnt=features.length; i<cnt; i++) {
					var feature = features[i];
					var item = jQuery('<div>');
					item.data(feature);
					
					if(feature.properties && feature.properties.feature_id) {
						item.html(feature.properties.feature_id);
					}else{
						item.html(feature.id);
					}
					
					item.addClass('feature_info');
					if(i == cnt-1) {
						item.addClass('last');
					}
					item.click(function() {
						var jThis = jQuery(this);
						var dd = jThis.data();
						console.log(dd);
						map.setTooltip('FEATURE_INFO');
						
						dd.properties.feature_id = layer_name;
						showLayerInfo(dd);
					});
					content.append(item);
				}
				
				map.setTooltip('FEATURE_INFO', content[0], 'POINT('+coordinate[0] + ' ' + coordinate[1] + ')', function() {
					
				});
			}
		}
	}, function(error) {
		
	});
}*/

/*function showLayerInfo(feature) {
	var content = jQuery('<div>');

	var height = jQuery('BODY').height() - 150;
	content.css({
		'max-height' : height + 'px',
		'overflow-y' : 'auto'
	});

	var table = jQuery('<table>');
	table.addClass('listTable');
	table.css({
		'font-size' : '13px'
	});
	content.append(table);

	var properties = null;

	if (feature.properties) {
		properties = feature.properties;
	} else {
		properties = feature.values_;
	}
	
	var layer_name = properties['feature_id'];
	
	var id = properties.id;

	var keys = Object.keys(properties);

	var tr = null;
	
	keys.splice(keys.indexOf('feature_id'), 1);
	
	for (var i = 0, cnt = keys.length; i < cnt; i++) {
		var key = keys[i];
		if (i % 2 == 0) {
			tr = jQuery('<tr>');
			table.append(tr);
			tr.css({
				'height' : '25px'
			});
		
		}
		var title = jQuery('<th>');
		title.text(key);
		tr.append(title);

		var value = jQuery('<td>');
		value.text(properties[key]);

		if (i == cnt - 1 && i % 2 == 0) {
			value.attr('colspan', 3);
			value.addClass('last');
		} else if (i % 2 != 0) {
			value.addClass('last');
		}

		tr.append(value);
	}


	jbSystemPopup.createPopup('LayerInfoPopup', layer_name
			+ ' 속성 정보', content, {
		position : JBPopup.CODE.POSITION.CENTER_MIDDLE,
		close : function() {
			map.triggerFeatureClickEvent(feature, false);
		}
	});
}*/