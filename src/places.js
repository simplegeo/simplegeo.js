/**
 * Create a SimpleGeo Places Client
 * @see simplegeo.Client
 * @extends simplegeo.Client
 * @constructor
 */
simplegeo.PlacesClient = function(token, options) {
  if (!(this instanceof simplegeo.PlacesClient)) return new simplegeo.PlacesClient(token, options);
  simplegeo.Client.call(this, token, options);
}

simplegeo.PlacesClient.prototype = new simplegeo.Client();

/**
 * Search for places
 * @param lat
 * @param lon
 * @param [options] See the <a href='http://simplegeo.com/docs/api-endpoints/simplegeo-places#search'>SimpleGeo Places documentation</a>
 *                  for the available options.
 * @param callback See {@link callbacks}.
 */
simplegeo.PlacesClient.prototype.search = function(lat, lon, options, callback) {
  if (callback === undefined) {
    callback = options;
    options = {};
  }
  var path = "/1.0/places/lat,lon.json";
  path = path.replace('lat', lat).replace('lon', lon);
  return this.request(path, options, callback);
}

/**
 * Search for places
 * @param [ip] Use this ip as the lookup. Defaults to the IP address of the request
 * @param [options] See the <a href='http://simplegeo.com/docs/api-endpoints/simplegeo-places#search'>SimpleGeo Places documentation</a>
 *                  for the available options.
 * @param callback See {@link callbacks}.
 */
simplegeo.PlacesClient.prototype.searchFromIP = function(ip, options, callback) {
  if (arguments.length === 2) {
    // Check if the ip or the options were omitted 
    callback = options;
    if (ip.trim) {
      options = {};
    } else {
      options = ip;
      ip = 'ip';
    }
  } else if (arguments.length === 1) {
    callback = ip;
    ip = 'ip';
    options = {};
  }
  var path = "/1.0/places/" + ip + ".json";
  return this.request(path, options, callback);
}

/**
 * Search for places
 * @param address
 * @param [options] See the <a href='http://simplegeo.com/docs/api-endpoints/simplegeo-places#search'>SimpleGeo Places documentation</a>
 *                  for the available options.
 * @param callback See {@link callbacks}.
 */
simplegeo.PlacesClient.prototype.searchFromAddress = function(address, options, callback) {
  if (callback === undefined) {
    callback = options;
    options = {};
  }
  var path = "/1.0/places/address.json";
  options.address = address;
  return this.request(path, options, callback);
}

