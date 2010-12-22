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
 *                  for the available options. Example: <code>{q: "Starbucks", radius: 10}</code>
 * @param callback See {@link callbacks}. Example response data:
 * <blockquote><pre>{
 *   total: 25,
 *   type: "FeatureCollection",
 *   features: [...]
 * }</pre></blockquote>
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
 * Search for places near the location of an IP address
 * @param [ip] Use this IP as the lookup.
 *        Defaults to the IP address of the request if not specified
 * @param [options]
 * @param callback See {@link simplegeo.PlacesClient#search} for examples of
 *                 <code>options</code> and <code>callback</code>.
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
 * Search for places near an address
 * @param address a mailing address to use as the point for the query.
 * @param [options]
 * @param callback See {@link simplegeo.PlacesClient#search} for examples of
 *                 <code>options</code> and <code>callback</code>.
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

