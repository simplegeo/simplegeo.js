/**
 * Create a SimpleGeo Context Client
 * @see simplegeo.Client
 * @extends simplegeo.Client
 * @constructor
 */
simplegeo.ContextClient = function(token, options) {
  if (!(this instanceof simplegeo.ContextClient)) return new simplegeo.ContextClient(token, options);
  simplegeo.Client.call(this, token, options);
}

simplegeo.ContextClient.prototype = new simplegeo.Client();

/**
 * Retrieve context information for the location.
 * @param {Number} lat
 * @param {Number} lon
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
simplegeo.ContextClient.prototype.getContext = function(lat, lon, callback) {
  var path = "/1.0/context/" + lat + "," + lon + ".json";
  return this.request(path, {}, callback);
}

/**
 * Retrieve context information for the location of an IP address.
 * @param {String} [ip] Use this ip as the lookup.
 *        Defaults to the IP address of the request if not specified.
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
simplegeo.ContextClient.prototype.getContextFromIP = function(ip, callback) {
  if (callback === undefined) {
    callback = ip;
    ip = 'ip';
  }
  var path = "/1.0/context/" + ip + ".json";
  return this.request(path, {}, callback);
}

/**
 * Retrieve context information for an address
 * @param {String} address a mailing address to use as the point for the query.
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
simplegeo.ContextClient.prototype.getContextFromAddress = function(address, callback) {
  var path = "/1.0/context/address.json";
  return this.request(path, {address: address}, callback);
}

