/**
 * This is a client
 * @param token a SimpleGeo JSONP token
 * @param [options] an Object containing connection options
 * @param [options.host="api.simplegeo.com"] the SimpleGeo API host
 * @param [options.port="80"] the port of the SimpleGeo API host
 * @constructor
 */
var Client = function(token, options) {
    if (!(this instanceof Client)) return new Client(token, options);
    options = options || {};
    this.token = token;
    this.options = options;
    this.host = options.host || 'api.simplegeo.com';
    this.port = options.port || '80';

    this.apiUrl = 'http://' + this.host + ':' + this.port;
};

var navigator = window.navigator;

Client.prototype = {
    request: function(path, data, callback) {
        data.token = this.token;
        data = $.param(data) + '&callback=?';
        $.ajax({
            url: this.apiUrl + path,
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

    /**
     * Returns a given feature.
     * @param handle A SimpleGeo handle for an object (looks like "SG_...")
     * @param callback
     */
    getFeature: function(handle, callback) {
        var path = "/1.0/features/" + handle + ".json";
        return this.request(path, {}, callback);
    },

    /**
     * Use the navigator.geolocation API to get updates about the location.
     * If the user denys the applications request for location information,
     * and error will be fired to the callback.
     * @param [options]
     * @param callback
     */
    watchLocationHTML5: function(options, callback) {
        var self = this;
        if (callback === undefined) {
            callback = options;
            options = {};
        }
        if (navigator && navigator.geolocation) {
            navigator.geolocation.watchPosition(function(position) {
                position.source = "navigator";
                callback(null, position);
            }, function(err) {
                callback(err);
            }, options);
        } else {
            callback(new Error("navigator.geolocation not available"));
        }
    },

    /**
     * Use the navigator.geolocation API to get the location.
     * If the user denys the applications request for location information,
     * and error will be fired to the callback.
     * @param [options]
     * @param callback
     */
    getLocationHTML5: function(options, callback) {
        var self = this;
        if (callback === undefined) {
            callback = options;
            options = {};
        }
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                position.source = "navigator";
                callback(null, position);
            }, function(err) {
                callback(err);
            }, options);
        } else {
            callback(new Error("navigator.geolocation not available"));
        }
    },

    /**
     * Use the SimpleGeo API to get an estimate of the user's location
     * by using the IP address of the request.
     * @param [ipAddress] an IP address to use instead of the request's IP address
     * @param callback
     */
    getLocationIP: function(ipAddress, callback) {
        var path;
        if (callback === undefined) {
            callback = ipAddress;
            path = "/0.1/locate.json";
        } else {
            path = "/0.1/locate/" + ipAddress + ".json";
        }
        return this.request(path, {}, function(err, data) {
            if (err) {
                callback(err);
            } else {
                var o = {
                    coords: {
                      latitude: data.geometry.coordinates[1],
                      longitude: data.geometry.coordinates[0]
                    },
                    source: "simplegeo"
                }

                callback(null, o);
            }
        });
   }
};

simplegeo.Client = Client;
