/**
 * SimpleGeo Context Client
 * @extends simplegeo.Client
 * @constructor
 */
simplegeo.ContextClient = function(token, options) {
  if (!(this instanceof simplegeo.ContextClient)) return new simplegeo.ContextClient(token, options);
  simplegeo.Client.call(this, token, options);
}

simplegeo.ContextClient.prototype = new simplegeo.Client();

/**
 * Retrieve context information for the location
 * @param lat
 * @param lon
 * @param callback
 */
simplegeo.ContextClient.prototype.getContext = function(lat, lon, callback) {
  var path = "/1.0/context/" + lat + "," + lon + ".json";
  return this.request(path, {}, callback);
}

/**
 * Retrieve context information for the location
 * @param [ip] Use this ip as the lookup.
 *        Defaults to the IP address of the request
 * @param callback
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
 * Retrieve context information for the address
 * @param address
 * @param callback
 */
simplegeo.ContextClient.prototype.getContextFromAddress = function(address, callback) {
  var path = "/1.0/context/address.json";
  return this.request(path, {address: address}, callback);
}

