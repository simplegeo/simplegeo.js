/**
 * SimpleGeo Places Client
 * @extends simplegeo.Client
 * @constructor
 */
simplegeo.PlacesClient = function(token, options) {
  if (!(this instanceof simplegeo.PlacesClient)) return new simplegeo.PlacesClient(token, options);
  simplegeo.Client.call(this, token, options);
}

simplegeo.PlacesClient.prototype = new simplegeo.Client();

/**
 * Look up a place
 * @param handle
 * @param callback
 */
simplegeo.PlacesClient.prototype.getRecord = function(handle, callback) {
  var path = "/1.0/places/" + handle + ".json";
  return this.request(path, {}, callback);
};

/**
 * Search for places
 * @param lat
 * @param lon
 * @param options
 * @param [options.q]
 * @param [options.category]
 * @param callback
 */
simplegeo.PlacesClient.prototype.search = function(lat, lon, options, callback) {
  var path = "/1.0/places/lat,lon.json";
  path = path.replace('lat', lat).replace('lon', lon);
  return this.request(path, options, callback);
}
