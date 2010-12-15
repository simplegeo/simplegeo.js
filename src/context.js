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
