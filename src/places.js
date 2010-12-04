/**
 * SimpleGeo Places Client
 * @extends Client
 * @constructor
 */
var PlacesClient = function(token, options) {
  if (!(this instanceof PlacesClient)) return new PlacesClient(token, options);
  simplegeo.Client.call(this, token, options);
}

PlacesClient.prototype = new simplegeo.Client();

/**
 * Look up a place
 * @param handle
 * @param callback
 */
PlacesClient.prototype.getRecord = function(handle, callback) {
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
PlacesClient.prototype.search = function(lat, lon, options, callback) {
  var path = "/1.0/places/lat,lon.json";
  path = path.replace('lat', lat).replace('lon', lon);
  return this.request(path, options, callback);
}

simplegeo.PlacesClient = PlacesClient;
