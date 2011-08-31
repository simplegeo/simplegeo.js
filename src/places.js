/**
 * Create a SimpleGeo Places Client
 * @see simplegeo.Client
 * @extends simplegeo.Client
 * @constructor
 */
simplegeo.PlacesClient = function(token, options) {
  if (!(this instanceof simplegeo.PlacesClient)) return new simplegeo.PlacesClient(token, options);
  simplegeo.Client.call(this, token, options);
  this.name = 'PlacesClient';
  this.placesVersion = '/1.0'
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
  var path = this.placesVersion + "/places/lat,lon.json";
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
  var path = this.placesVersion + "/places/" + ip + ".json";
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
  var path = this.placesVersion + "/places/address.json";
  options.address = address;
  return this.request(path, options, callback);
}



/**
 * Create a SimpleGeo Places 1.2 Client
 * @see simplegeo.PlacesClient
 * @extends simplegeo.PlacesClient
 * @constructor
 */
simplegeo.Places12Client = function(token, options) {
  if (!(this instanceof simplegeo.Places12Client)) return new simplegeo.Places12Client(token, options);
  simplegeo.PlacesClient.call(this, token, options);
  this.name = 'Places12Client';
  this.placesVersion = '/1.2'
}

simplegeo.Places12Client.prototype = new simplegeo.PlacesClient();

/**
 * Search for places
 * @param swLat
 * @param swLon
 * @param neLat
 * @param neLon
 * @param [options] See the <a href='http://simplegeo.com/docs/api-endpoints/simplegeo-places#search'>SimpleGeo Places documentation</a>
 *                  for the available options. Example: <code>{q: "Starbucks", radius: 10}</code>
 * @param callback See {@link callbacks}. Example response data:
 * <blockquote><pre>{
 *   total: 25,
 *   type: "FeatureCollection",
 *   features: [...]
 * }</pre></blockquote>
 */
simplegeo.Places12Client.prototype.searchFromBBox = function(swLat, swLon, neLat, neLon, options, callback) {
  if (callback === undefined) {
    callback = options;
    options = {};
  }
  var path = this.placesVersion + "/places/swlat,swlon,nelat,nelon.json";
  path = path.replace('swlat', swLat).replace('swlon', swLon).replace('nelat', neLat).replace('nelon', neLon)
  return this.request(path, options, callback);
}

/**
 * Fulltext search for places.
 * @param options See the <a href='http://simplegeo.com/docs/api-endpoints/simplegeo-places#search'>SimpleGeo Places documentation</a>
 *                  for the available options. Example: <code>{q: "Starbucks"}</code>
 * @param callback See {@link callbacks}. Example response data:
 * <blockquote><pre>{
 *   total: 25,
 *   type: "FeatureCollection",
 *   features: [...]
 * }</pre></blockquote>
 */
simplegeo.Places12Client.prototype.searchText = function(options, callback) {
  var path = this.placesVersion + "/places/search.json";
  return this.request(path, options, callback);
}
