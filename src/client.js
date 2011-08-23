if (simplegeo.Client === undefined) {
  /**
   * This is a the base SimpleGeo Client, which contains common functionality
   * that is used by the various product-oriented clients
   * @param token a SimpleGeo JSONP token
   * @param [options] an Object containing connection options
   * @param [options.host="api.simplegeo.com"] the SimpleGeo API host
   * @param [options.port="80"] the port of the SimpleGeo API host
   * @constructor
   */
  simplegeo.Client = function(token, options) {
      if (!(this instanceof simplegeo.Client)) return new simplegeo.Client(token, options);
      options = options || {};
      this.token = token;
      this.options = options;
      this.proto = options.proto || 'https';
      this.host = options.host || 'api.simplegeo.com';
      this.port = options.port || (this.proto === 'https' ? '443' : '80');

      var jqueryVersion = parseFloat($.fn.jquery.match(/^[0-9]+\.[0-9]+/)[0]),
          jqueryMin = $.fn.jquerymin;
      if (options.cors && jqueryMin) {
        throw new Error("You cannot use CORS unless you use the jQuery version of the SimpleGeo client");
      }
      this.cors = options.cors || ((!jqueryMin && jqueryVersion >= 1.4) ? 'auto' : false);

      this.apiUrl = this.proto + '://' + this.host + ':' + this.port;
      this.name = 'Client';
  };

  var navigator = window.navigator;

  simplegeo.Client.prototype = {
      request: function(path, data, callback) {
        if (this.cors) {
          this.requestCORS(path, data, callback);
        } else {
          this.requestJSONP(path, data, callback);
        }
      },

      requestCORS: function(path, data, callback) {
          var self = this;
          data.token = this.token;
          try {
            $.ajax({
                url: this.apiUrl + path,
                dataType: 'json',
                data: $.param(data, true),
                success: function(response) {
                    callback(null, response);
                },
                error: function(xhr, textStatus, err) {
                    // err will be undefined if this is an HTTP error
                    if (!err) {
                      var err = {
                        error: true,
                        code: xhr.status
                      }

                      try {
                        err.message = JSON.parse(responseText).message;
                      } catch (e) {
                        err.message = xhr.statusText;
                      }

                      callback(err);
                    } else {
                      if (window.console) console.error(path, xhr, textStatus, err);
                      if (self.cors === 'auto') {
                        // Fall back to JSONP if CORS fails
                        self.cors = false;
                        self.requestJSONP(path, data, callback);
                      } else {
                        callback(err);
                      }
                    }
                }
            });
          } catch (err) {
            if (window.console) console.error(path, xhr, textStatus, err);
            if (self.cors === 'auto') {
              // Fall back to JSONP if CORS fails
              self.cors = false;
              self.requestJSONP(path, data, callback);
            } else {
              throw err;
            }
          }
      },

      requestJSONP: function(path, data, callback) {
          data.token = this.token;
          data = $.param(data, true) + '&callback=?';
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
       * @param [options]
       * @param callback See {@link callbacks}. Example response data:
       * <blockquote><pre>{
       *   geometry: {...},
       *   type: "Feature",
       *   properties: {...},
       *   id: "SG_5vDxvpHBYacPoMwaYaGgVP"
       * }</pre></blockquote>
       */
      getFeature: function(handle, options, callback) {
          if (callback === undefined) {
            callback = options;
            options = {};
          }
          var path = "/1.0/features/" + handle + ".json";
          return this.request(path, options, callback);
      },

      /**
       * Returns a list of the available feature categories.
       * @param callback See {@link callbacks}. Example response data:
       * <blockquote><pre>[
       *   {
       *     category: "Administrative",
       *     category_id: "10100100",
       *     type: "Region",
       *     subcategory: "Consolidated City",
       *   },
       *   ...
       * ]</pre></blockquote>
       */
      getFeatureCategories: function(callback) {
          var path = "/1.0/features/categories.json";
          return this.request(path, {}, callback);
      },

      /**
       * Use the navigator.geolocation API to get updates about the location.
       * If the user denys the applications request for location information,
       * and error will be fired to the callback.
       * @param [options] <a href='http://dev.w3.org/geo/api/spec-source.html#position_options_interface'>W3C Geolocation PositionOptions</a>
       * @param callback See {@link callbacks}.
       * The data passed to the callback matches the <a href='http://dev.w3.org/geo/api/spec-source.html#position_interface'>W3C Geolocation Position Interface</a>.
       */
      watchLocationFromBrowser: function(options, callback) {
          var self = this;
          if (callback === undefined) {
              callback = options;
              options = {};
          }
          if (navigator && navigator.geolocation) {
              navigator.geolocation.watchPosition(function(position) {
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
       * @param [options] <a href='http://dev.w3.org/geo/api/spec-source.html#position_options_interface'>W3C Geolocation PositionOptions</a>
       * @param callback See {@link callbacks}.
       * The data passed to the callback matches the <a href='http://dev.w3.org/geo/api/spec-source.html#position_interface'>W3C Geolocation Position Interface</a>.
       */
      getLocationFromBrowser: function(options, callback) {
          var self = this;
          if (callback === undefined) {
              callback = options;
              options = {};
          }
          if (navigator && navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
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
       * @param callback See {@link callbacks}.
       * The data passed to the callback matches the <a href='http://dev.w3.org/geo/api/spec-source.html#position_interface'>W3C Geolocation Position Interface</a>.
       */
      getLocationFromIP: function(ipAddress, callback) {
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
                        longitude: data.geometry.coordinates[0],
                        accuracy: 100000
                      },
                      timestamp: new Date(),
                      source: "simplegeo"
                  }

                  callback(null, o);
              }
          });
      },

      /**
       * First try get the location from the browser (this will usually ask
       * the user to approve). If that fails or the user denies the request,
       * fall back to doing an IP based lookup for the location
       * @param [options] <a href='http://dev.w3.org/geo/api/spec-source.html#position_options_interface'>W3C Geolocation PositionOptions</a>
       * @param callback See {@link callbacks}.
       * The data passed to the callback matches the <a href='http://dev.w3.org/geo/api/spec-source.html#position_interface'>W3C Geolocation Position Interface</a>.
       */
      getLocation: function(options, callback) {
        var self = this;
        if (callback === undefined) {
            callback = options;
            options = {};
        }
        self.getLocationFromBrowser(options, function(err, position) {
          if (err) {
            self.getLocationFromIP(callback);
          } else {
            callback(null, position);
          }
        });
      }

  };
}
