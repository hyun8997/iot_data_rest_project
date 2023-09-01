/**
 * 
 */

var LOG = {};

LOG.CODE = {
		MODE : {
			DEVELOPED : "developed",
			DEPLOY : "deploy"
		},
		LEVEL : {
			ERROR : 1,
			INFO : 2,
			DEBUG : 3
		}
}
LOG.LEVEL = LOG.CODE.LEVEL.INFO;
LOG.MODE = LOG.CODE.MODE.DEPLOY;

LOG._logging = function(message) {
	if(LOG.MODE == LOG.CODE.MODE.DEVELOPED) {
		alert(message);
	}else{
		console.log(message);
	}
}

LOG.error = function(message, e) {
	if(LOG.LEVEL >= LOG.CODE.LEVEL.ERROR) {
		var msg = message;
		if(e) {
			msg += "\n" + e.stack;
		}
		LOG._logging(msg);
	}
}

LOG.info = function(message) {
	if(LOG.LEVEL >= LOG.CODE.LEVEL.INFO) {
		LOG._logging(message);
	}
}

LOG.debug = function(message) {
	if(LOG.LEVEL >= LOG.CODE.LEVEL.DEBUG) {
		LOG._logging(message);
	}
}