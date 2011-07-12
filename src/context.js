/**
 * Create a SimpleGeo Context Client
 * @see simplegeo.Client
 * @extends simplegeo.Client
 * @constructor
 */
simplegeo.ContextClient = function(token, options) {
  if (!(this instanceof simplegeo.ContextClient)) return new simplegeo.ContextClient(token, options);
  simplegeo.Client.call(this, token, options);
  this.name = 'ContextClient';
}

simplegeo.ContextClient.prototype = new simplegeo.Client();

/**
 * Retrieve table numbers for demographics data.
 * @param {String} q Search query
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>[
 * ["B06010", 
 *   [ "PLACE OF BIRTH BY INDIVIDUAL INCOME IN THE PAST 12 MONTHS (IN 2009 INFLATION-ADJUSTED DOLLARS) IN THE UNITED STATES", 
 *     "Universe:  Population 15 years and over in the United States"],
 *   [
 *     ["No income ", "B06010035"],
 *     ["With income:", "B06010036"],
 *     ...
 *     ["No income ", "B06010002"]
 *   ]
 * ],...]</pre></blockquote>
 *
 */
simplegeo.ContextClient.prototype.searchDemographicTables = function(q, callback) {
  var path = "/1.0/context/demographics/search.json";
  return this.request(path, {q: q}, callback);
}

/**
 * Retrieve context information for the location.
 * @param {Number} lat
 * @param {Number} lon
 * @param [options] See the <a href='https://simplegeo.com/docs/api-endpoints/simplegeo-context#demographics'>SimpleGeo Context documentation</a>
 *                  for the available options. Example: <code>{filter: "demographics.acs.B01001"}</code>
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   query: {
 *     latitude: 40.01695,
 *     longitude: -105.27742
 *   },
 *   timestamp: 1292958383.954,
 *   features: [...],
 *   demographics: {metro_score: 9}
 * }</pre></blockquote>
 *
 */
simplegeo.ContextClient.prototype.getContext = function(lat, lon, options, callback) {
  if (callback === undefined) {
    callback = options;
    options = {};
  }
  var path = "/1.0/context/" + lat + "," + lon + ".json";
  return this.request(path, options, callback);
}

/**
 * Retrieve context information for the location of an IP address.
 * @param {String} [ip] Use this ip as the lookup.
 *        Defaults to the IP address of the request if not specified.
 * @param [options] See the <a href='https://simplegeo.com/docs/api-endpoints/simplegeo-context#demographics'>SimpleGeo Context documentation</a>
 *                  for the available options. Example: <code>{filter: "demographics.acs.B01001"}</code>
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   query: {
 *     latitude: 37.4192,
 *     longitude: -122.0574,
 *     ip: "74.125.224.16"
 *   },
 *   timestamp: 1292958831.291,
 *   features: [...],
 *   demographics: {metro_score: 10}
 * }</pre></blockquote>
 */
simplegeo.ContextClient.prototype.getContextFromIP = function(ip, options, callback) {
  if (callback === undefined) {
    if (options === undefined) {
      callback = ip;
      ip = 'ip';
    } else {
      callback = options;
    }
    options = {};
  }
  var path = "/1.0/context/" + ip + ".json";
  return this.request(path, options, callback);
}

/**
 * Retrieve context information for an address
 * @param {String} address a mailing address to use as the point for the query.
 * @param [options] See the <a href='https://simplegeo.com/docs/api-endpoints/simplegeo-context#demographics'>SimpleGeo Context documentation</a>
 *                  for the available options. Example: <code>{filter: "demographics.acs.B01001"}</code>
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   query: {
 *     latitude: 37.772555,
 *     longitude: -122.405978,
 *     address: "41 Decatur Street, San Francisco, CA"
 *   },
 *   timestamp: 1292959054.122,
 *   features: [...],
 *   demographics: {metro_score: 10}
 * }</pre></blockquote>
 */
simplegeo.ContextClient.prototype.getContextFromAddress = function(address, options, callback) {
  var path = "/1.0/context/address.json";
  if (callback === undefined) {
    callback = options;
    options = {};
  }
  options["address"] = address;
  return this.request(path, options, callback);
}

