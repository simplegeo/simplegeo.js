var PlacesClient = function(token, options) {
  if (!(this instanceof PlacesClient)) return new PlacesClient(token, options);
  simplegeo.Client.call(this, token, options);
}

PlacesClient.prototype = new simplegeo.Client();

PlacesClient.prototype.getRecord = function(simplegeoid, callback) {
  var path = "/1.0/places/simplegeoid.json";
  path = path.replace('simplegeoid', simplegeoid);
  return this.request(path, {}, callback);
};

PlacesClient.prototype.search = function(lat, lon, options, callback) {
  var path = "/1.0/places/lat,lon.json";
  path = path.replace('lat', lat).replace('lon', lon);
  return this.request(path, options, callback);
}

simplegeo.PlacesClient = PlacesClient;
