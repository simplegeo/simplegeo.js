var ContextClient = function(token, options) {
  if (!(this instanceof ContextClient)) return new ContextClient(token, options);
  simplegeo.Client.call(this, token, options);
}

ContextClient.prototype = new simplegeo.Client();

ContextClient.prototype.getContext = function(lat, lon, callback) {
  var path = "/1.0/context/lat,lon.json";
  path = path.replace('lat', lat).replace('lon', lon);
  return this.request(path, {}, callback);
}

simplegeo.ContextClient = ContextClient;
