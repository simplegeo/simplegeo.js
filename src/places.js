var PlacesClient = function(token) {
  simplegeo.Client.call(this, token);
}

PlacesClient.prototype = new simplegeo.Client();

PlacesClient.prototype.getRecord = function(simplegeoid, callback) {
  var path = "/places/simplegeoid.json";
  path = path.replace('simplegeoid', simplegeoid);
  return this.request(path, {}, callback);
};

PlacesClient.prototype.search = function(lat, lon, options, callback) {
  var path = "/places/lat,lon.json";
  path = path.replace('lat', lat).replace('lon', lon);
  return this.request(path, options, callback);
}

simplegeo.PlacesClient = PlacesClient;
