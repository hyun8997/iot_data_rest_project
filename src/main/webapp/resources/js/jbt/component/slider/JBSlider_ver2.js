/**
 * 
 */

(function() {
	var scriptList = [
	                  {
	                	  Type : "script",
	                	  ObjNm : "Sugar",
	                	  ScrptNm : "resources/js/jbt/component/slider/lib/sugar.min.js"
		              },
	                  {
	                	  Type : "script",
	                	  ObjNm : "wNumb",
	                	  ScrptNm : "resources/js/jbt/component/slider/lib/wNumb.js"
		              },
	                  {
	                	  Type : "script",
	                	  ObjNm : "noUiSlider",
	                	  ScrptNm : "resources/js/jbt/component/slider/lib/nouislider.min.js"
		              },
	                  {
	                	  Type : "css",
	                	  ObjNm : "nouislider.min.css",
	                	  ScrptNm : "resources/js/jbt/component/slider/lib/nouislider.min.css"
		              },
	                  {
	                	  Type : "css",
	                	  ObjNm : "JBSlider.min.css",
	                	  ScrptNm : "resources/js/jbt/component/slider/css/JBSlider.css"
		              }
	];
	
	function appendScript(jsUrl, callback) {
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = jsUrl;
		s.async = false;
		document.head.appendChild(s);
		console.log("Init Script : " + jsUrl);
	};
	
	function appendCss(cssUrl) {
		var s = document.createElement("link");
		s.type = "text/css";
		s.href = cssUrl;
		s.rel = "stylesheet";
		document.head.appendChild(s);
		console.log("Init Css : " + cssUrl);
	};
	
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

	function checkSrcObj(name) {
		var checkSplit = name.split("-->");
		
		try{
			var obj = window;
			for(var i=0,cnt=checkSplit.length; i<cnt; i++) {
				var splt = checkSplit[i];
				obj = obj[splt];
			}
			if(typeof obj == "undefined") {
				throw "No Script : " + name;
			}
			return true;
		}catch(e) {
			return false;
		}
	}
	
	function getSrcCss(cssName) {
		var output = "";
		var cssArr = document.getElementsByTagName("link");
		
		for(var i=0,cnt=cssArr.length; i<cnt; i++) {
			var cssElement = cssArr[i];
			if(cssElement.href.indexOf(cssName) != -1) {
				var cssLink = cssElement.href;
				output = cssLink.substr(0, cssLink.lastIndexOf(cssName));
				break;
			}
		}
		return output;
	};
	
	var jsPath = getSrcPath("JBSlider.js");
	
	for(var i=0,cnt=scriptList.length; i<cnt; i++) {
		var scrpt = scriptList[i];
		if(scrpt.Type == "script") {
			if(!checkSrcObj(scrpt.ObjNm)) {
				appendScript(jsPath + scrpt.ScrptNm);
			}
		}else if(scrpt.Type == "css") {
			var cssPath = getSrcCss(scrpt.ObjNm);
			if(cssPath == "") {
				appendCss(jsPath + scrpt.ScrptNm);
			}
		}
		
	}
})();

var JBSlider = function(options) {
	
	if(!options) options = {};
	
//	var slideTime = options.time !== undefined ? options.time : null;
	var startTime = options.start !== undefined ? options.start : null;
	var endTime = options.end !== undefined ? options.end : null;
	var playTime = options.playTime !== undefined ? options.playTime : 1000;
	var gap = options.gap !== undefined ? options.gap : 1000*60;		//1000(1초) * 60(1분)
	var dateFormat = options.dateFormat !== undefined ? options.dateFormat : "{yyyy}-{MM}-{dd}";
	var target = options.target !== undefined ? options.target : "sliderDiv";
	var endCallback = options.endCallback !== undefined ? options.endCallback : null;
	var changeCallback = options.change !== undefined ? options.change : null;
	var pipe = options.pipe !== undefined ? options.pipe : null;
	var sliderFormat = options.sliderFormat !== undefined ? options.sliderFormat : "{yyyy}-{MM}-{dd} {HH}:{mm}";
	
	var showTooltip = options.showTooltip !== undefined ? options.showTooltip : false;

	
	var timer = null;
	
	var CONTENT = {};
	
	
	var slider = null;
	
	var currVal = null;
	
	function destroy() {
		slider.noUiSlider.destroy();
	}
	
	function init() {
		 if(!endTime) {
		 	endTime = new Date();
		 }
		
		 if(!startTime) {
		 	var minusTime = 1000 * 60 * 60 * 24 * 30;
		 	startTime = new Date(endTime.getTime() - minusTime);
		 }
		
		slider = document.getElementById(target);
		
		var sliderOpt = {
			step : gap,
		    start: startTime.getTime(),
		    keyboardSupport: true,
		    range: {
		        min: startTime.getTime(),
		        max: endTime.getTime()
		    },
		    tooltips: [showTooltip]
		}
		
		if(pipe){
			sliderOpt.pips = {
				mode: "count",
				values: 6,
				density: 4,
				stepped:!0,
				format: {
					to: function(value){
						return new Date(value).format(sliderFormat);
					},
					from: Number
				}
		    }
		}else{
			sliderOpt.pips = {
			    	mode: 'steps', 
			        filter: function(value, type) { 
			          return 1; 
			        },
			        density: 1000,
			        format: {
			          from: function(value) {
			            return value;
			          },
			          to: function(value) {
						  return new Date(value).format(sliderFormat);
			          }
			        }
			    }
		}
		
		noUiSlider.create(slider, sliderOpt);
		
		slider.noUiSlider.on('update', onChange);
		
		var handle = slider.querySelector('.noUi-handle');
		handle.addEventListener('keydown', function (e) {
		    var value = Number(slider.noUiSlider.get());
		    if (e.which === 37) {
		    	slider.noUiSlider.set(value - gap);
		    }
		    if (e.which === 39) {
		    	slider.noUiSlider.set(value + gap);
		    }
		});
		
		var pips = slider.querySelectorAll('.noUi-value');

		for (var i = 0; i < pips.length; i++) {

		    // For this example. Do this in CSS!
		    pips[i].style.cursor = 'pointer';
		    pips[i].addEventListener('click', clickOnPip);
		}
		
	}

	function clickOnPip() {
	    var value = this.getAttribute('data-value');
	    slider.noUiSlider.set(value);
	}
	
	function onChange(values, handle, unencoded, tap, positions) {
		currVal = values;
		
		var d = new Date(Number(currVal[0]));
		
		if(changeCallback) {
			changeCallback.call(this, d, currVal);
		}
		
		for(var key in CONTENT) {
			var func = CONTENT[key];
			func.call(this, d, currVal);
		}
	}
	
    function setContent(contentId, callback) {
    	removeContent(contentId);
    	
    	CONTENT[contentId] = callback;
    }
    
    function removeContent(contentId) {
    	if(CONTENT[contentId]) {
    		delete CONTENT[contentId];
    	}
    }
    
    function play() {
    	pause();
    	timer = setInterval(function() {
    		active();
    	}, playTime);
//    	active();
    	
    	if(slider.noUiSlider) {
    		slider.noUiSlider.set(currVal);
    	}
    }
    
    function active() {
    	var value = Number(slider.noUiSlider.get());
		if(value >= endTime.getTime()) {
			clear();
			if(endCallback) {
				endCallback.call(this, currVal);
			}
			return;
		}

    	if(slider.noUiSlider) {
    		slider.noUiSlider.set(value + gap);
    	}
    }
    
    function pause() {
    	if(timer) {
    		clearInterval(timer);
    		timerId = null;
    	}
    }
    
    function clear() {
    	pause();

    	if(slider.noUiSlider) {
    		slider.noUiSlider.set(startTime.getTime());
    	}
    }
    
    function getValue() {
    	var d = new Date(Number(currVal[0]));
    	
    	return d;
    }
    
	init();
	return {
		setContent : function(contentId, callback) {
			setContent(contentId, callback);
			return getValue();
		},
		
		removeContent : function(contentId) {
			removeContent(contentId);
		},
		
		destroy : function() {
			destroy();
		},
		
		play : function() {
			play();
		},
		
		pause : function() {
			pause();
		},
		
		clear : function() {
			clear();
		},
		
		getValue : function() {
			return getValue();
		},
		
		set: function(value) {
			slider.noUiSlider.set(value);
		}
	}
}