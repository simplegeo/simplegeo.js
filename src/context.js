/**
 * SimpleGeo Context Client
 * @extends Client
 * @constructor
 */
var ContextClient = function(token, options) {
  if (!(this instanceof ContextClient)) return new ContextClient(token, options);
  simplegeo.Client.call(this, token, options);
}

ContextClient.prototype = new simplegeo.Client();

/**
 * Retrieve context information for the location
 * @param lat
 * @param lon
 * @param callback
 */
ContextClient.prototype.getContext = function(lat, lon, callback) {
  var path = "/1.0/context/" + lat + ", " + lon + ".json";
  return this.request(path, {}, callback);
}

simplegeo.ContextClient = ContextClient;
