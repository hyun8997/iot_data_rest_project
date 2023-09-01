/**
 * 
 */

proj4.defs("EPSG:5179", "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
proj4.defs("UTMK", "+proj=tmerc +lat_0=38.0 +lon_0=127.5 +x_0=1000000.0 +y_0=2000000.0 +k=0.9996 +a=6378137.0 +b=6356752.3141403 +ellps=GRS80 +towgs84=0,0,0 +no_defs");
proj4.defs("KATEC", "+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +towgs84=-145.907,505.034,685.756,-1.162,2.347,1.592,6.342 +units=m +no_defs");