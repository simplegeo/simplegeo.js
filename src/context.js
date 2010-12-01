var ContextClient = function(token) {
  simplegeo.Client.call(this, token);
}

ContextClient.prototype = new simplegeo.Client();

ContextClient.prototype.getContext = function(lat, lon, callback) {
  var path = "/context/lat,lon.json";
  path = path.replace('lat', lat).replace('lon', lon);
  return this.request(path, {}, callback);
}

simplegeo.ContextClient = ContextClient;
