/**
 * SimpleGeo Storage Client
 * @extends simplegeo.Client
 * @constructor
 */
simplegeo.StorageClient = function(token, options) {
  if (!(this instanceof simplegeo.StorageClient)) return new simplegeo.StorageClient(token, options);
  simplegeo.Client.call(this, token, options);
  this.name = 'StorageClient';
}

simplegeo.StorageClient.prototype = new simplegeo.Client();

var endpoints = {
  record: '/0.1/records/layer/id.json',
  records: '/0.1/records/layer/ids.json',
  history: '/0.1/records/layer/id/history.json',
  nearby: '/0.1/records/layer/nearby/arg.json',
  nearbyAddress: '/0.1/nearby/address/lat,lon.json',
  densityDay: '/0.1/density/day/lat,lon.json',
  densityHour: '/0.1/density/day/hour/lat,lon.json'
}

simplegeo.StorageClient.prototype.getRecord = function(layer, id, callback) {
    path = endpoints.record;
    path = path.replace('layer', layer).replace('id', id);
    return this.request(path, {}, callback);
};

simplegeo.StorageClient.prototype.getRecords = function(layer, ids, callback) {
    path = endpoints.records;
    idString = ids.join(',');
    path = path.replace('layer', layer).replace('ids', idString);
    return this.request(path, {}, callback);
};

simplegeo.StorageClient.prototype.getHistory = function(layer, id, data, callback) {
    if (callback === undefined) {
        callback = data;
        data = {};
    }
    path = endpoints.history;
    path = path.replace('layer', layer).replace('id', id);
    return this.request(path, data, callback);
};

simplegeo.StorageClient.prototype.getNearby = function(layer, lat, lon, data, callback) {
    if (callback === undefined) {
        callback = data;
        data = {};
    }
    path = endpoints.nearby;
    path = path.replace('layer', layer).replace('arg', lat + ',' + lon);
    return this.request(path, data, callback);
};

simplegeo.StorageClient.prototype.getNearbyGeohash = function(layer, geohash, data, callback) {
    if (callback === undefined) {
        callback = data;
        data = {};
    }
    path = endpoints.nearby;
    path = path.replace('layer', layer).replace('arg', geohash);
    return this.request(path, data, callback);
};

simplegeo.StorageClient.prototype.getNearbyAddress = function(lat, lon, callback) {
    path = endpoints.nearbyAddress;
    path = path.replace('lat', lat).replace('lon', lon);
    return this.request(path, {}, callback);
};

simplegeo.StorageClient.prototype.getDensity = function(lat, lon, day, hour, callback) {
    if (callback === undefined) {
        callback = hour;
        hour = undefined;
        path = endpoints.densityDay;
        path = path.replace('day', day).replace('lat', lat).replace('lon', lon);
    } else {
        path = endpoints.densityHour;
        path = path.replace('day', day).replace('hour', hour).replace('lat', lat).replace('lon', lon);
    }
    return this.request(path, {}, callback);
};
