/**
 *  OpenLayers Custom 기능(기능 개선/추가)
 */
ol.custom = {};
ol.custom.events = {};
ol.custom.control = {};
ol.custom.source = {};
ol.custom.layer = {};
ol.custom.interaction = {};
ol.custom.events.condition = {};

/**
 * @Custom Event
 * Custom Event
 * - condition.ctrlKeyOnly = 컨트롤 키만 승인함(신규 기능)
 */
ol.custom.events.condition.ctrlKeyOnly = function(mapBrowserEvent) {
  var originalEvent = mapBrowserEvent.originalEvent;
  return (
    originalEvent.ctrlKey &&
      !(originalEvent.metaKey || originalEvent.altKey) &&
      !originalEvent.shiftKey);
};

/**
 * @Custom Control
 * Custom Control 
 * - Zoom = 줌레벨(기능 개선)
 *   : zoomByDelta_ 함수 변경
 * - OverviewMap = 미니맵(기능 개선)
 *   1. extent 기능 추가
 *   2. extent view 기능 추가
 *   3. main지도의 projection으로 자동 변환 기능 추가
 */

/** 
 * @Search ol.custom.control.Zoom
 */ 
ol.custom.control.Zoom = function(opt_options) {
	var options = opt_options ? opt_options : {};
	var className = options.className !== undefined ? options.className	: 'ol-zoom';
	var delta = options.delta !== undefined ? options.delta : 1;
	var zoomInLabel = options.zoomInLabel !== undefined ? options.zoomInLabel : '+';
	var zoomOutLabel = options.zoomOutLabel !== undefined ? options.zoomOutLabel : '\u2212';
	var zoomInTipLabel = options.zoomInTipLabel !== undefined ? options.zoomInTipLabel	: 'Zoom in';
	var zoomOutTipLabel = options.zoomOutTipLabel !== undefined ? options.zoomOutTipLabel : 'Zoom out';
	var inElement = document.createElement('button');
	inElement.className = className + '-in';
	inElement.setAttribute('type', 'button');
	inElement.title = zoomInTipLabel;
	inElement.appendChild(typeof zoomInLabel === 'string' ? document.createTextNode(zoomInLabel) : zoomInLabel);
	inElement.addEventListener("click", ol.custom.control.Zoom.prototype.handleClick_.bind(this, delta));
	var outElement = document.createElement('button');
	outElement.className = className + '-out';
	outElement.setAttribute('type', 'button');
	outElement.title = zoomOutTipLabel;
	outElement.appendChild(typeof zoomOutLabel === 'string' ? document.createTextNode(zoomOutLabel) : zoomOutLabel);
	outElement.addEventListener("click", ol.custom.control.Zoom.prototype.handleClick_.bind(this, -delta));
	var cssClasses = className + ' ol-unselectable ol-control';
	var element = document.createElement('div');
	element.className = cssClasses;
	element.appendChild(inElement);
	element.appendChild(outElement);
	ol.control.Control.call(this, {
		element : element,
		target : options.target
	});
	this.duration_ = options.duration !== undefined ? options.duration : 250;
};
ol.inherits(ol.custom.control.Zoom, ol.control.Control);
ol.custom.control.Zoom.prototype.handleClick_ = function(delta, event) {
	event.preventDefault();
	this.zoomByDelta_(delta);
};
ol.custom.control.Zoom.prototype.zoomByDelta_ = function(delta) {
	var map = this.getMap();
	var view = map.getView();
	if (!view) {
		return;
	}
	var maxZoom = view.getMaxZoom();
	var minZoom = view.getMinZoom();
	var currZoom = view.getZoom();
	var newZoom = currZoom + delta;
	if(newZoom > maxZoom) {
		newZoom = maxZoom;
	}
	if(newZoom < minZoom) {
		newZoom = minZoom;
	}
	view.setZoom(newZoom);
};



/** 
 * @Search ol.custom.control.OverviewMap
 */ 
ol.custom.control.OverviewMap = function(opt_options) {

  var options = opt_options ? opt_options : {};

  this.collapsed_ = options.collapsed !== undefined ? options.collapsed : true;
  
  this.extent = options.extent !== undefined ? options.extent : null;
  
  this.isExtentView = options.isExtentView !== undefined ? options.isExtentView : false;
  
  this.projection = options.projection !== undefined ? options.projection : "EPSG:3857";
  
  var extent = this.extent;

  this.collapsible_ = options.collapsible !== undefined ?
    options.collapsible : true;

  if (!this.collapsible_) {
    this.collapsed_ = false;
  }

  var className = options.className !== undefined ? options.className : 'ol-overviewmap';

  var tipLabel = options.tipLabel !== undefined ? options.tipLabel : 'Overview map';

  var collapseLabel = options.collapseLabel !== undefined ? options.collapseLabel : '\u00AB';

  if (typeof collapseLabel === 'string') {
    this.collapseLabel_ = document.createElement('span');
    this.collapseLabel_.textContent = collapseLabel;
  } else {
    this.collapseLabel_ = collapseLabel;
  }

  var label = options.label !== undefined ? options.label : '\u00BB';


  if (typeof label === 'string') {
    this.label_ = document.createElement('span');
    this.label_.textContent = label;
  } else {
    this.label_ = label;
  }

  var activeLabel = (this.collapsible_ && !this.collapsed_) ?
    this.collapseLabel_ : this.label_;
  var button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.title = tipLabel;
  button.appendChild(activeLabel);

  ol.events.listen(button, ol.events.EventType.CLICK,
      this.handleClick_, this);

  this.ovmapDiv_ = document.createElement('DIV');
  this.ovmapDiv_.className = 'ol-overviewmap-map';

  this.ovmap_ = new ol.PluggableMap({
    controls: new ol.Collection(),
    interactions: new ol.Collection(),
    view: options.view
  });
  var ovmap = this.ovmap_;

  if (options.layers) {
    options.layers.forEach(
        function(layer) {
          ovmap.addLayer(layer);
        }, this);
  }

  var box = document.createElement('DIV');
  box.className = 'ol-overviewmap-box';
  box.style.boxSizing = 'border-box';

  this.boxOverlay_ = new ol.Overlay({
    position: [0, 0],
    positioning: ol.OverlayPositioning.BOTTOM_LEFT,
    element: box
  });
  this.ovmap_.addOverlay(this.boxOverlay_);

  var cssClasses = className + ' ' + ol.css.CLASS_UNSELECTABLE + ' ' +
      ol.css.CLASS_CONTROL +
      (this.collapsed_ && this.collapsible_ ? ' ol-collapsed' : '') +
      (this.collapsible_ ? '' : ' ol-uncollapsible');
  var element = document.createElement('div');
  element.className = cssClasses;
  element.appendChild(this.ovmapDiv_);
  element.appendChild(button);

  var render = options.render ? options.render : ol.custom.control.OverviewMap.render;

  ol.control.Control.call(this, {
    element: element,
    render: render,
    target: options.target
  });

  /* Interactive map */

  var scope = this;

  var overlay = this.boxOverlay_;
  var overlayBox = this.boxOverlay_.getElement();

  /* Functions definition */

  var computeDesiredMousePosition = function(mousePosition) {
    return {
      clientX: mousePosition.clientX - (overlayBox.offsetWidth / 2),
      clientY: mousePosition.clientY + (overlayBox.offsetHeight / 2)
    };
  };
  
  var maxExtentPixel = function(mousePosition) {
	    var x = mousePosition.clientX;
	    var y = mousePosition.clientY;
	    
	  if(extent) {
		  var minCoord = [extent[0], extent[1]];
		  var maxCoord = [extent[2], extent[3]];
		  
		  var minPixel = ovmap.getPixelFromCoordinate(minCoord);
		  var maxPixel = ovmap.getPixelFromCoordinate(maxCoord);
		  
		  var viewportPosition = ovmap.viewport_.getBoundingClientRect();
		  
		  var minx = minPixel[0] + viewportPosition.left;
		  var maxy = minPixel[1] + viewportPosition.top;
		  var maxx = maxPixel[0] + viewportPosition.left;
		  var miny = maxPixel[1] + viewportPosition.top;
		  
		  if(x < minx) {
			  x = minx;
		  }
		  
		  if(x > maxx) {
			  x = maxx;
		  }
		  
		  if(y < miny) {
			  y = miny;
		  }
		  
		  if(y > maxy) {
			  y = maxy;
		  }
	  }
	    
	    return {
	    	clientX : x,
	    	clientY : y
	    }
  }
  
  var move = function(event) {
    var coordinates = ovmap.getEventCoordinate(computeDesiredMousePosition(maxExtentPixel(event)));
    overlay.setPosition(coordinates);
  };

  var endMoving = function(event) {
    var coordinates = ovmap.getEventCoordinate(maxExtentPixel(event));
    coordinates = ol.proj.transform(coordinates, ovmap.getView().getProjection(), scope.getMap().getView().getProjection());
    scope.getMap().getView().setCenter(coordinates);

    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', endMoving);
  };

  /* Binding */

  overlayBox.addEventListener('mousedown', function() {
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', endMoving);
  });
};
ol.inherits(ol.custom.control.OverviewMap, ol.control.Control);

ol.custom.control.OverviewMap.prototype.setMap = function(map) {
  var oldMap = this.getMap();
  if (map === oldMap) {
    return;
  }
  if (oldMap) {
    var oldView = oldMap.getView();
    if (oldView) {
      this.unbindView_(oldView);
    }
    this.ovmap_.setTarget(null);
  }
  ol.control.Control.prototype.setMap.call(this, map);

  if (map) {
    this.ovmap_.setTarget(this.ovmapDiv_);
    this.listenerKeys.push(ol.events.listen(
        map, ol.ObjectEventType.PROPERTYCHANGE,
        this.handleMapPropertyChange_, this));

    // TODO: to really support map switching, this would need to be reworked
    if (this.ovmap_.getLayers().getLength() === 0) {
//      this.ovmap_.setLayerGroup(map.getLayerGroup());
    	var layerGroup = new ol.layer.Group();
    	var arr = map.getLayerGroup().getLayersArray().clone();
    	for(var i=0,cnt=arr.length; i<cnt; i++) {
    		var lyr = arr[i];
    		this.ovmap_.addLayer(lyr);
    	}
    }
    
    if(this.isExtentView && this.extent != null) {
  	  	var polygon = ol.geom.Polygon.fromExtent(this.extent);
  	  	var source = new ol.source.Vector();
  	  	var lyr = new ol.layer.Vector({
  	  		name : "Extent View",
  	  		source : source
  	  	});
  	  	this.ovmap_.addLayer(lyr);
  	  
  	  	var feature = new ol.Feature({
  	  		geometry : polygon,
  	  		name : "Extent"
  	  	});
  	  
  	  	source.addFeature(feature);
    }

    var view = map.getView();
    if (view) {
      this.bindView_(view);
      if (view.isDef()) {
        this.ovmap_.updateSize();
        this.resetExtent_();
      }
    }
  }
};

ol.custom.control.OverviewMap.prototype.handleMapPropertyChange_ = function(event) {
  if (event.key === ol.MapProperty.VIEW) {
    var oldView = /** @type {ol.View} */ (event.oldValue);
    if (oldView) {
      this.unbindView_(oldView);
    }
    var newView = this.getMap().getView();
    this.bindView_(newView);
  }
};

ol.custom.control.OverviewMap.prototype.bindView_ = function(view) {
  ol.events.listen(view,
      ol.Object.getChangeEventType(ol.ViewProperty.ROTATION),
      this.handleRotationChanged_, this);
};

ol.custom.control.OverviewMap.prototype.unbindView_ = function(view) {
  ol.events.unlisten(view,
      ol.Object.getChangeEventType(ol.ViewProperty.ROTATION),
      this.handleRotationChanged_, this);
};

ol.custom.control.OverviewMap.prototype.handleRotationChanged_ = function() {
  this.ovmap_.getView().setRotation(this.getMap().getView().getRotation());
};

ol.custom.control.OverviewMap.render = function(mapEvent) {
  this.validateExtent_();
  this.updateBox_();
};

ol.custom.control.OverviewMap.prototype.validateExtent_ = function() {
  var map = this.getMap();
  var ovmap = this.ovmap_;

  if (!map.isRendered() || !ovmap.isRendered()) {
    return;
  }

  var mapSize = /** @type {ol.Size} */ (map.getSize());

  var view = map.getView();
  var extent = view.calculateExtent(mapSize);

  var ovmapSize = /** @type {ol.Size} */ (ovmap.getSize());

  var ovview = ovmap.getView();
  var ovextent = ovview.calculateExtent(ovmapSize);

  var topLeftPixel =
      ovmap.getPixelFromCoordinate(ol.extent.getTopLeft(extent));
  var bottomRightPixel =
      ovmap.getPixelFromCoordinate(ol.extent.getBottomRight(extent));

  var boxWidth = Math.abs(topLeftPixel[0] - bottomRightPixel[0]);
  var boxHeight = Math.abs(topLeftPixel[1] - bottomRightPixel[1]);

  var ovmapWidth = ovmapSize[0];
  var ovmapHeight = ovmapSize[1];

  if (boxWidth < ovmapWidth * ol.OVERVIEWMAP_MIN_RATIO ||
      boxHeight < ovmapHeight * ol.OVERVIEWMAP_MIN_RATIO ||
      boxWidth > ovmapWidth * ol.OVERVIEWMAP_MAX_RATIO ||
      boxHeight > ovmapHeight * ol.OVERVIEWMAP_MAX_RATIO) {
    this.resetExtent_();
  } else if (!ol.extent.containsExtent(ovextent, extent)) {
    this.recenter_();
  }
};

ol.custom.control.OverviewMap.prototype.resetExtent_ = function() {
  if (ol.OVERVIEWMAP_MAX_RATIO === 0 || ol.OVERVIEWMAP_MIN_RATIO === 0) {
    return;
  }

  var map = this.getMap();
  var ovmap = this.ovmap_;

  var mapSize = /** @type {ol.Size} */ (map.getSize());

  var view = map.getView();
  var extent = view.calculateExtent(mapSize);
  
  extent = ol.proj.transformExtent(extent, map.getView().getProjection(), this.projection);

  var ovview = ovmap.getView();

  // get how many times the current map overview could hold different
  // box sizes using the min and max ratio, pick the step in the middle used
  // to calculate the extent from the main map to set it to the overview map,
  var steps = Math.log(
      ol.OVERVIEWMAP_MAX_RATIO / ol.OVERVIEWMAP_MIN_RATIO) / Math.LN2;
  var ratio = 1 / (Math.pow(2, steps / 2) * ol.OVERVIEWMAP_MIN_RATIO);
  ol.extent.scaleFromCenter(extent, ratio);
  ovview.fit(extent);
};

ol.custom.control.OverviewMap.prototype.recenter_ = function() {
  var map = this.getMap();
  var ovmap = this.ovmap_;

  var view = map.getView();

  var ovview = ovmap.getView();

  var center = view.getCenter();
  center = ol.proj.transform(center, map.getView().getProjection(), this.projection);
  
  ovview.setCenter(center);
};

ol.custom.control.OverviewMap.prototype.updateBox_ = function() {
  var map = this.getMap();
  var ovmap = this.ovmap_;

  if (!map.isRendered() || !ovmap.isRendered()) {
    return;
  }

  var mapSize = /** @type {ol.Size} */ (map.getSize());

  var view = map.getView();

  var ovview = ovmap.getView();

  var rotation = view.getRotation();

  var overlay = this.boxOverlay_;
  var box = this.boxOverlay_.getElement();
  var extent = view.calculateExtent(mapSize);
  
  extent = ol.proj.transformExtent(extent, map.getView().getProjection(), this.projection);
  
  var ovresolution = ovview.getResolution();
  var bottomLeft = ol.extent.getBottomLeft(extent);
  var topRight = ol.extent.getTopRight(extent);

  // set position using bottom left coordinates
  var rotateBottomLeft = this.calculateCoordinateRotate_(rotation, bottomLeft);

  overlay.setPosition(rotateBottomLeft);

  // set box size calculated from map extent size and overview map resolution
  if (box) {
    box.style.width = Math.abs((bottomLeft[0] - topRight[0]) / ovresolution) + 'px';
    box.style.height = Math.abs((topRight[1] - bottomLeft[1]) / ovresolution) + 'px';
  }
};

ol.custom.control.OverviewMap.prototype.calculateCoordinateRotate_ = function(
    rotation, coordinate) {
  var coordinateRotate;

  var map = this.getMap();
  var view = map.getView();

  var currentCenter = view.getCenter();
  
  currentCenter = ol.proj.transform(currentCenter, map.getView().getProjection(), this.projection);

  if (currentCenter) {
    coordinateRotate = [
      coordinate[0] - currentCenter[0],
      coordinate[1] - currentCenter[1]
    ];
    ol.coordinate.rotate(coordinateRotate, rotation);
    ol.coordinate.add(coordinateRotate, currentCenter);
  }
  return coordinateRotate;
};

ol.custom.control.OverviewMap.prototype.handleClick_ = function(event) {
  event.preventDefault();
  this.handleToggle_();
};

ol.custom.control.OverviewMap.prototype.handleToggle_ = function() {
  this.element.classList.toggle('ol-collapsed');
  if (this.collapsed_) {
    ol.dom.replaceNode(this.collapseLabel_, this.label_);
  } else {
    ol.dom.replaceNode(this.label_, this.collapseLabel_);
  }
  this.collapsed_ = !this.collapsed_;

  // manage overview map if it had not been rendered before and control
  // is expanded
  var ovmap = this.ovmap_;
  if (!this.collapsed_ && !ovmap.isRendered()) {
    ovmap.updateSize();
    this.resetExtent_();
    ol.events.listenOnce(ovmap, ol.MapEventType.POSTRENDER,
        function(event) {
          this.updateBox_();
        },
        this);
  }
};

ol.custom.control.OverviewMap.prototype.getCollapsible = function() {
  return this.collapsible_;
};

ol.custom.control.OverviewMap.prototype.setCollapsible = function(collapsible) {
  if (this.collapsible_ === collapsible) {
    return;
  }
  this.collapsible_ = collapsible;
  this.element.classList.toggle('ol-uncollapsible');
  if (!collapsible && this.collapsed_) {
    this.handleToggle_();
  }
};


ol.custom.control.OverviewMap.prototype.setCollapsed = function(collapsed) {
  if (!this.collapsible_ || this.collapsed_ === collapsed) {
    return;
  }
  this.handleToggle_();
};

ol.custom.control.OverviewMap.prototype.getCollapsed = function() {
  return this.collapsed_;
};

ol.custom.control.OverviewMap.prototype.getOverviewMap = function() {
  return this.ovmap_;
};



/**
 * @Custom Source
 * Custom Source 
 * - Vworld = Vworld 레이어(신규 기능)
 */

/** 
 * @Search ol.custom.source.Vworld
 */ 
ol.custom.source.Vworld = function(opt_options) {
	var options = opt_options || {};
	var attributions;
	
	if(typeof window["vworldUrls"] == "undefined") {
		console.log("No Script Vworld");
		window.vworldUrls = {
				base : "http://xdworld.vworld.kr:8080/2d/Base/service",
				hybrid : "http://xdworld.vworld.kr:8080/2d/Hybrid/service",
				gray : "http://xdworld.vworld.kr:8080/2d/gray/service",
				midnight : "http://xdworld.vworld.kr:8080/2d/midnight/service",
				raster : "http://xdworld.vworld.kr:8080/2d/Satellite/service"
		};
	}
	
	if (options.attributions !== undefined) {
		attributions = options.attributions;
	} else {
		attributions = [ ol.custom.source.Vworld.ATTRIBUTION ];
	}
	var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';

//	var url = options.url !== undefined ? options.url : 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png';

	var type = opt_options.type !== undefined ? opt_options.type.toLowerCase() : null;
	
	var url = "";
	
	switch(type) {
		case "base" :
			url = vworldUrls["base"] + "/{z}/{x}/{y}.png"
			break;
		case "satellite" :
			url = vworldUrls["raster"] + "/{z}/{x}/{y}.jpeg"
			break;
		case "hybrid" :
			url = vworldUrls["hybrid"] + "/{z}/{x}/{y}.png"
			break;
		case "gray" :
			url = vworldUrls["gray"] + "/{z}/{x}/{y}.png"
			break;
		case "midnight" :
			url = vworldUrls["midnight"] + "/{z}/{x}/{y}.png"
			break;
		default :
		break;
	}
	
	if(options.url !== undefined) {
		url = options.url;
	}
	
//	if(url == "") {
//		throw "브이월드 레이어("+type+")가 제공되지 않습니다.";
//		return;
//	}
	
	ol.source.XYZ.call(this, {
		attributions : attributions,
		cacheSize : options.cacheSize,
		crossOrigin : crossOrigin,
		opaque : options.opaque !== undefined ? options.opaque : true,
		maxZoom : options.maxZoom !== undefined ? options.maxZoom : 18,
		minZoom : options.minZoom !== undefined ? options.minZoom : 7,
		reprojectionErrorThreshold : options.reprojectionErrorThreshold,
		tileLoadFunction : options.tileLoadFunction,
		url : url,
		wrapX : options.wrapX
	});

};
ol.inherits(ol.custom.source.Vworld, ol.source.XYZ);
ol.custom.source.Vworld.ATTRIBUTION = '&copy; ' + '<a href="http://www.vworld.kr/v4po_main.do">Vworld</a> ' + 'contributors.';






/**
 * @Custom Layer
 * Custom Layer 
 * - animatedCluster = 애니메이션 클러스터 기능(신규 기능)
 */

/** 
 * @Search ol.custom.layer.AnimatedCluster
 */ 
ol.custom.layer.AnimatedCluster = function(opt_options)
{	var options = opt_options || {};

	ol.layer.Vector.call (this, options);
	
	this.oldcluster = new ol.source.Vector();
	this.clusters = [];
	this.isFeatureOpen = true;
	this.animation={start:false};
	this.set('animationDuration', typeof(options.animationDuration)=='number' ? options.animationDuration : 700);
	this.set('animationMethod', options.animationMethod || ol.easing.easeOut);

	this.getSource().on('change', this.saveCluster, this);
	this.on('precompose', this.animate, this);
	this.on('postcompose', this.postanimate, this);
};
ol.inherits (ol.custom.layer.AnimatedCluster, ol.layer.Vector);

ol.custom.layer.AnimatedCluster.prototype.setFeatureOpen = function(bool) {
	this.isFeatureOpen = bool;
}

ol.custom.layer.AnimatedCluster.prototype.getFeatureOpen = function() {
	return this.isFeatureOpen;
}

ol.custom.layer.AnimatedCluster.prototype.saveCluster = function()
{	this.oldcluster.clear();
	if (!this.get('animationDuration')) return;
	var features = this.getSource().getFeatures();
	if (features.length && features[0].get('features'))
	{	this.oldcluster.addFeatures (this.clusters);
		this.clusters = features.slice(0);
		this.sourceChanged = true;
	}
};

ol.custom.layer.AnimatedCluster.prototype.getClusterForFeature = function(f, cluster)
{	for (var j=0, c; c=cluster[j]; j++)
	{	var features = cluster[j].get('features');
		if (features && features.length) 
		{	for (var k=0, f2; f2=features[k]; k++)
			{	if (f===f2) 
				{	return cluster[j];
				}
			}
		}
	}
	return false;
};

ol.custom.layer.AnimatedCluster.prototype.stopAnimation = function()
{	this.animation.start = false;
	this.animation.cA = [];
	this.animation.cB = [];
};

ol.custom.layer.AnimatedCluster.prototype.animate = function(e)
{	var duration = this.get('animationDuration');
	if (!duration) return;
	var resolution = e.frameState.viewState.resolution;
	var a = this.animation;
	var time = e.frameState.time;

	if (a.resolution != resolution && this.sourceChanged)
	{	var extent = e.frameState.extent;
		if (a.resolution < resolution)
		{	extent = ol.extent.buffer(extent, 100*resolution);
			a.cA = this.oldcluster.getFeaturesInExtent(extent);
			a.cB = this.getSource().getFeaturesInExtent(extent);
			a.revers = false;
		}
		else
		{	extent = ol.extent.buffer(extent, 100*resolution);
			a.cA = this.getSource().getFeaturesInExtent(extent);
			a.cB = this.oldcluster.getFeaturesInExtent(extent);
			a.revers = true;
		}
		a.clusters = [];
		for (var i=0, c0; c0=a.cA[i]; i++)
		{	var f = c0.get('features');
			if (f && f.length) 
			{	var c = this.getClusterForFeature (f[0], a.cB);
				if (c) a.clusters.push({ f:c0, pt:c.getGeometry().getCoordinates() });
			}
		}
		a.resolution = resolution;
		this.sourceChanged = false;

		if (!a.clusters.length || a.clusters.length>1000) 
		{	this.stopAnimation();
			return;
		}
		time = a.start = (new Date()).getTime();
	}

	if (a.start)
	{	var vectorContext = e.vectorContext;
		var d = (time - a.start) / duration;
		if (d > 1.0) 
		{	this.stopAnimation();
			d = 1;
		}
		d = this.get('animationMethod')(d);
		var style = this.getStyle();
		var stylefn = (typeof(style) == 'function') ? style : style.length ? function(){ return style; } : function(){ return [style]; } ;
		e.context.save();
		e.context.globalAlpha = this.getOpacity();
		var ratio = e.frameState.pixelRatio;
		for (var i=0, c; c=a.clusters[i]; i++)
		{	var pt = c.f.getGeometry().getCoordinates();
			if (a.revers)
			{	pt[0] = c.pt[0] + d * (pt[0]-c.pt[0]);
				pt[1] = c.pt[1] + d * (pt[1]-c.pt[1]);
			}
			else
			{	pt[0] = pt[0] + d * (c.pt[0]-pt[0]);
				pt[1] = pt[1] + d * (c.pt[1]-pt[1]);
			}
			var st = stylefn(c.f, resolution);
			var geo = new ol.geom.Point(pt);
			for (var k=0; s=st[k]; k++)
			{	var sc;
				var imgs = ol.Map.prototype.getFeaturesAtPixel ? false : s.getImage();
				if (imgs)
				{	sc = imgs.getScale(); 
					imgs.setScale(sc*ratio); 
				}
				if (vectorContext.setStyle)
				{	vectorContext.setStyle(s);
					vectorContext.drawGeometry(geo);
				}
				else
				{	vectorContext.setImageStyle(imgs);
					vectorContext.setTextStyle(s.getText());
					vectorContext.drawPointGeometry(geo);
				}
				if (imgs) imgs.setScale(sc);
			}
		}
		e.context.restore();
		e.frameState.animate = true;

		e.context.save();
		e.context.beginPath();
		e.context.rect(0,0,0,0);
		e.context.clip();
		this.clip_ = true;
	}

	return;
};

ol.custom.layer.AnimatedCluster.prototype.postanimate = function(e)
{	if (this.clip_)
	{	e.context.restore();
		this.clip_ = false;
	}
};

/**
 * @Custom Interaction
 * Custom Interaction
 * - SelectCluster = 클러스터 선택 기능(신규 기능)
 */

/** 
 * @Search ol.custom.interaction.SelectCluster
 */
ol.custom.interaction.SelectCluster = function(options) 
{	options = options || {};

	this.pointRadius = options.pointRadius || 12;
	this.circleMaxObjects = options.circleMaxObjects || 10;
	this.maxObjects = options.maxObjects || 60;
	this.spiral = (options.spiral !== false);
	this.animate = options.animate;
	this.isFeatureOpen = options.isFeatureOpen;
	this.maxObjectsError = options.maxObjectsError;
	this.animationDuration = options.animationDuration || 500;
	this.selectCluster_ = (options.selectCluster !== false);

	// Create a new overlay layer for 
	var overlay = this.overlayLayer_ = new ol.layer.Vector(
		{	source: new ol.source.Vector({
				features: new ol.Collection(),
				useSpatialIndex: true
			}),
			name:'Cluster overlay',
			updateWhileAnimating: true,
			updateWhileInteracting: true,
			displayInLayerSwitcher: false,
			style: options.featureStyle
		});

	// Add the overlay to selection
	if (options.layers)
	{	if (typeof(options.layers) == "function")
		{	var fn = options.layers;
			options.layers = function(layer)
			{	return (layer===overlay || fn(layer));
			};
		}
		else if (options.layers.push)
		{	options.layers.push(this.overlayLayer_);
		}
	}

	// Don't select links
	if (options.filter)
	{	var fn = options.filter;
		options.filter = function(f,l)
		{	//if (l===overlay && f.get("selectclusterlink")) return false;
			if (!l && f.get("selectclusterlink")) return false;
			else return fn(f,l);
		};
	}
	else options.filter = function(f,l) 
	{	//if (l===overlay && f.get("selectclusterlink")) return false; 
		if (!l && f.get("selectclusterlink")) return false; 
		else return true;
	};
	this.filter_ = options.filter;
	
	ol.interaction.Select.call(this, options);
	this.on("select", this.selectCluster, this);
};

ol.inherits(ol.custom.interaction.SelectCluster, ol.interaction.Select);

ol.custom.interaction.SelectCluster.prototype.setMap = function(map) 
{	if (this.getMap())
	{	if (this.getMap().getView()) 
		{	this.getMap().getView().un('change:resolution', this.clear, this);
		}
		this.getMap().removeLayer(this.overlayLayer_);
	}

	// Add overlay before the select to appeare underneath
	this.overlayLayer_.setMap(map);
	
	ol.interaction.Select.prototype.setMap.call (this, map);

	if (map && map.getView()) 
	{	map.getView().on('change:resolution', this.clear, this);
	}
};

ol.custom.interaction.SelectCluster.prototype.clear = function() 
{	this.getFeatures().clear();
	this.overlayLayer_.getSource().clear();
};

ol.custom.interaction.SelectCluster.prototype.getLayer = function() 
{	return this.overlayLayer_;
};

ol.custom.interaction.SelectCluster.prototype.selectCluster = function (e) 
{	// Nothing selected
	if (!e.selected.length)
	{	this.clear();
		return;
	}

	// Get selection
	var feature = e.selected[0];
	// It's one of ours
	if (feature.get('selectclusterfeature')) return;
	
	// Clic out of the cluster => close it
	var source = this.overlayLayer_.getSource();
	source.clear();

	var cluster = feature.get('features');
	// Not a cluster (or just one feature)
	if (!cluster || cluster.length==1) return;

	// Remove cluster from selection
	if (!this.selectCluster_) this.getFeatures().clear();

	var center = feature.getGeometry().getCoordinates();
	// Pixel size in map unit
	var pix = this.getMap().getView().getResolution();
	var r = pix * this.pointRadius * (0.5 + cluster.length / 4);
	// Draw on a circle
	if (!this.spiral || cluster.length <= this.circleMaxObjects){
		if(!this.isFeatureOpen || this.isFeatureOpen(cluster[0])) {
			var max = Math.min(cluster.length, this.circleMaxObjects);
			for (i=0; i<max; i++){	
				var a = 2*Math.PI*i/max;
				if (max==2 || max == 4) a += Math.PI/4;
				var p = [ center[0]+r*Math.sin(a), center[1]+r*Math.cos(a) ];
				var cf = new ol.Feature({ 'selectclusterfeature':true, 'features':[cluster[i]], geometry: new ol.geom.Point(p) });
				cf.setStyle(cluster[i].getStyle());
				source.addFeature(cf);
				var lk = new ol.Feature({ 'selectclusterlink':true, geometry: new ol.geom.LineString([center,p]) });
				source.addFeature(lk);
			};
		}
	}
	// Draw on a spiral
	else
	{	// Start angle
		var a = 0;
		var r;
		var d = 2*this.pointRadius;
		var features = new Array();
		var links = new Array();
		var max = Math.min (this.maxObjects, cluster.length);
		
		if(cluster.length > this.maxObjects && this.maxObjectsError) {
			var bool = this.maxObjectsError.call(this, cluster);
			
			if(bool !== undefined && !bool) {
				return;
			}
		}
		
		// Feature on a spiral
		for (i=0; i<max; i++)
		{	// New radius => increase d in one turn
			r = d/2 + d*a/(2*Math.PI);
			// Angle
			a = a + (d+0.1)/r;
			var dx = pix*r*Math.sin(a)
			var dy = pix*r*Math.cos(a)
			var p = [ center[0]+dx, center[1]+dy ];
			var cf = new ol.Feature({ 'selectclusterfeature':true, 'features':[cluster[i]], geometry: new ol.geom.Point(p) });
			cf.setStyle(cluster[i].getStyle()); 
			source.addFeature(cf);
			var lk = new ol.Feature({ 'selectclusterlink':true, geometry: new ol.geom.LineString([center,p]) });
			source.addFeature(lk);
		}
	}

	if (this.animate) this.animateCluster_(center);
};

ol.custom.interaction.SelectCluster.prototype.animateCluster_ = function(center)
{	// Stop animation (if one is running)
	if (this.listenerKey_)
	{	this.overlayLayer_.setVisible(true);
		ol.Observable.unByKey(this.listenerKey_);
	}
	
	// Features to animate
	var features = this.overlayLayer_.getSource().getFeatures();
	if (!features.length) return;
	
	this.overlayLayer_.setVisible(false);
	var style = this.overlayLayer_.getStyle();
	var stylefn = (typeof(style) == 'function') ? style : style.length ? function(){ return style; } : function(){ return [style]; } ;
	var duration = this.animationDuration || 500;
	var start = new Date().getTime();
	
	// Animate function
	function animate(event) 
	{	var vectorContext = event.vectorContext;
		// Retina device
		var ratio = event.frameState.pixelRatio;
		var res = event.target.getView().getResolution();
		var e = ol.easing.easeOut((event.frameState.time - start) / duration);
		for (var i=0, feature; feature = features[i]; i++) if (feature.get('features'))
		{	var pt = feature.getGeometry().getCoordinates();
			pt[0] = center[0] + e * (pt[0]-center[0]);
			pt[1] = center[1] + e * (pt[1]-center[1]);
			var geo = new ol.geom.Point(pt);
			// Image style
			var st = stylefn(feature, res);
			for (var s=0; s<st.length; s++)
			{	var sc;
				// OL < v4.3 : setImageStyle doesn't check retina
				var imgs = ol.Map.prototype.getFeaturesAtPixel ? false : st[s].getImage();
				if (imgs)
				{	sc = imgs.getScale();
					imgs.setScale(ratio); 
				}
				// OL3 > v3.14
				if (vectorContext.setStyle)
				{	vectorContext.setStyle(st[s]);
					vectorContext.drawGeometry(geo);
				}
				// older version
				else
				{	vectorContext.setImageStyle(imgs);
					vectorContext.drawPointGeometry(geo);
				}
				if (imgs) imgs.setScale(sc);
			}
		}
		// Stop animation and restore cluster visibility
		if (e > 1.0) 
		{	ol.Observable.unByKey(this.listenerKey_);
			this.overlayLayer_.setVisible(true);
			this.overlayLayer_.changed();
			return;
		}
		// tell OL3 to continue postcompose animation
		event.frameState.animate = true;
	}

	// Start a new postcompose animation
	this.listenerKey_ = this.getMap().on('postcompose', animate, this);
	//select.getMap().renderSync();
};