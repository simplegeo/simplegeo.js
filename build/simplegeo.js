var simplegeo = (function(window, undefined){
/* jQmin
 *
 * Based on code from jQuery v1.4.2
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
var jQuery = (function(window, undefined){

function now() {
    return (new Date).getTime();
}

var document = window.document;

var jsc = now(),
    jsre = /=\?(&|$)/,
    rts = /(\?|&)_=.*?(&|$)/,
    rquery = /\?/,
    r20 = /%20/g,
    toString = Object.prototype.toString,
    jQuery = {
    isFunction: function( obj ) {
        return toString.call(obj) === "[object Function]";
    },

    isArray: function( obj ) {
        return toString.call(obj) === "[object Array]";
    },

    each: function( object, callback, args ) {
        var name, i = 0,
            length = object.length,
            isObj = length === undefined || jQuery.isFunction(object);

        if ( args ) {
            if ( isObj ) {
                for ( name in object ) {
                    if ( callback.apply( object[ name ], args ) === false ) {
                        break;
                    }
                }
            } else {
                for ( ; i < length; ) {
                    if ( callback.apply( object[ i++ ], args ) === false ) {
                        break;
                    }
                }
            }

        } else {
            if ( isObj ) {
                for ( name in object ) {
                    if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
                        break;
                    }
                }
            } else {
                for ( var value = object[0];
                    i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
            }
        }

        return object;
    },

    param: function( a ) {
        var s = [];

        if ( jQuery.isArray(a) || a.jquery ) {
            jQuery.each( a, function() {
                add( this.name, this.value );
            });

        } else {
            for ( var prefix in a ) {
                buildParams( prefix, a[prefix] );
            }
        }

        return s.join("&").replace(r20, "+");

        function buildParams( prefix, obj ) {
            if ( jQuery.isArray(obj) ) {
                jQuery.each( obj, function( i, v ) {
                    if ( /\[\]$/.test( prefix ) ) {
                        add( prefix, v );
                    } else {
                        buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v );
                    }
                });

            } else if ( obj != null && typeof obj === "object" ) {
                jQuery.each( obj, function( k, v ) {
                    buildParams( prefix + "[" + k + "]", v );
                });

            } else {
                add( prefix, obj );
            }
        }

        function add( key, value ) {
            value = jQuery.isFunction(value) ? value() : value;
            s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }
    },

    ajax: function(s) {
        var jsonp, data, status,
                callbackContext = s;

        if ( s.data && typeof s.data !== "string" ) {
            s.data = jQuery.param( s.data );
        }

        jsonp = s.jsonpCallback || ("jsonp" + jsc++);

        if ( s.data ) {
            s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
        }

        s.url = s.url.replace(jsre, "=" + jsonp + "$1");

        window[ jsonp ] = window[ jsonp ] || function( tmp ) {
            data = tmp;
            success();
            complete();
            window[ jsonp ] = undefined;

            try {
                delete window[ jsonp ];
            } catch(e) {}

            if ( head ) {
                head.removeChild( script );
            }
        };

        var ts = now();

        var ret = s.url.replace(rts, "$1_=" + ts + "$2");

        s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");

        s.url += (rquery.test(s.url) ? "&" : "?") + s.data;

        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        var script = document.createElement("script");
        script.src = s.url;

        head.insertBefore( script, head.firstChild );

        return undefined;

        function success() {
            if ( s.success ) {
                s.success.call( callbackContext, data, status );
            }

        }

        function complete() {
            if ( s.complete ) {
                s.complete.call( callbackContext, undefined, status);
            }


        }
    }
};

return jQuery;

})(window);
var simplegeo = (function($) {
    var version = '0.1';
    var host = 'api.simplegeo.com';
    var port = '80';
    var apiUrl = 'http://' + host + ':' + port + '/' + version;
    var endpoints = {
        record: '/records/layer/id.json',
        records: '/records/layer/ids.json',
        history: '/records/layer/id/history.json',
        nearby: '/records/layer/nearby/arg.json',
        nearbyAddress: '/nearby/address/lat,lon.json',
        densityDay: '/density/day/lat,lon.json',
        densityHour: '/density/day/hour/lat,lon.json',
        contains: '/contains/lat,lon.json',
        overlaps: '/overlaps/south,west,north,east.json',
        boundary: '/boundary/id.json'
    }

    var Client = function(token) {
        this.token = token;
    }

    Client.prototype = {
        request: function(path, data, callback) {
            data.token = this.token;
            data = $.param(data) + '&callback=?';
            $.ajax({
                url: apiUrl + path,
                dataType: 'json',
                data: data,
                success: function(response) {
                    if (response.error) {
                      var error = new Error(response.message);
                      error.code = response.code;
                      callback(error);
                    } else {
                      callback(null, response.data);
                    }
                },
                error: function(xhr, ajaxOptions, err) {
                    callback(err);
                }
            });
        },

        getRecord: function(layer, id, callback) {
            path = endpoints.record;
            path = path.replace('layer', layer).replace('id', id);
            return this.request(path, {}, callback);
        },

        getRecords: function(layer, ids, callback) {
            path = endpoints.records;
            idString = ids.join(',');
            path = path.replace('layer', layer).replace('ids', idString);
            return this.request(path, {}, callback);
        },

        getHistory: function(layer, id, data, callback) {
            if (callback === undefined) {
                callback = data;
                data = {};
            }
            path = endpoints.history;
            path = path.replace('layer', layer).replace('id', id);
            return this.request(path, data, callback);
        },

        getNearby: function(layer, lat, lon, data, callback) {
            if (callback === undefined) {
                callback = data;
                data = {};
            }
            path = endpoints.nearby;
            path = path.replace('layer', layer).replace('arg', lat + ',' + lon);
            return this.request(path, data, callback);
        },

        getNearbyGeohash: function(layer, geohash, data, callback) {
            if (callback === undefined) {
                callback = data;
                data = {};
            }
            path = endpoints.nearby;
            path = path.replace('layer', layer).replace('arg', geohash);
            return this.request(path, data, callback);
        },

        getNearbyAddress: function(lat, lon, callback) {
            path = endpoints.nearbyAddress;
            path = path.replace('lat', lat).replace('lon', lon);
            return this.request(path, {}, callback);
        },

        getDensity: function(lat, lon, day, hour, callback) {
            if (callback === undefined) {
                callback = hour;
                hour = undefined;
                path = endpoints.densityDay;
                path = path.replace('day', day).replace('lat', lat).replace('lon', lon);
            } else {
                path = endpoints.densityHour;
                path = path.replace('day', day).replace('hour', hour).replace('lat', lat).replace('lon', lon);
            }
            return this.request(path, {}, callback);
        },

        getContains: function(lat, lon, callback) {
            path = endpoints.contains;
            path = path.replace('lat', lat).replace('lon', lon);
            return this.request(path, {}, callback);
        },

        getOverlaps: function(south, west, north, east, data, callback) {
            if (callback === undefined) {
                callback = data;
                data = {};
            }
            path = endpoints.overlaps;
            path = path.replace('south', south).replace('west', west).replace('north', north).replace('east', east);
            return this.request(path, data, callback);
        },

        getBoundary: function(id, callback) {
            path = endpoints.boundary;
            path = path.replace('id', id);
            return this.request(path, {}, callback);
        }

    }
    return {
        Client: Client
    }
})(jQuery);
return simplegeo;
})(window);
