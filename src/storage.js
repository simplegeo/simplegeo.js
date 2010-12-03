var endpoints = {
  record: '/0.1/records/layer/id.json',
  records: '/0.1/records/layer/ids.json',
  history: '/0.1/records/layer/id/history.json',
  nearby: '/0.1/records/layer/nearby/arg.json',
  nearbyAddress: '/0.1/nearby/address/lat,lon.json',
  densityDay: '/0.1/density/day/lat,lon.json',
  densityHour: '/0.1/density/day/hour/lat,lon.json',
  contains: '/0.1/contains/lat,lon.json',
  overlaps: '/0.1/overlaps/south,west,north,east.json',
  boundary: '/0.1/boundary/id.json'
}

var Client = simplegeo.Client;

Client.prototype.getRecord = function(layer, id, callback) {
    path = endpoints.record;
    path = path.replace('layer', layer).replace('id', id);
    return this.request(path, {}, callback);
};

Client.prototype.getRecords = function(layer, ids, callback) {
    path = endpoints.records;
    idString = ids.join(',');
    path = path.replace('layer', layer).replace('ids', idString);
    return this.request(path, {}, callback);
};

Client.prototype.getHistory = function(layer, id, data, callback) {
    if (callback === undefined) {
        callback = data;
        data = {};
    }
    path = endpoints.history;
    path = path.replace('layer', layer).replace('id', id);
    return this.request(path, data, callback);
};

Client.prototype.getNearby = function(layer, lat, lon, data, callback) {
    if (callback === undefined) {
        callback = data;
        data = {};
    }
    path = endpoints.nearby;
    path = path.replace('layer', layer).replace('arg', lat + ',' + lon);
    return this.request(path, data, callback);
};

Client.prototype.getNearbyGeohash = function(layer, geohash, data, callback) {
    if (callback === undefined) {
        callback = data;
        data = {};
    }
    path = endpoints.nearby;
    path = path.replace('layer', layer).replace('arg', geohash);
    return this.request(path, data, callback);
};

Client.prototype.getNearbyAddress = function(lat, lon, callback) {
    path = endpoints.nearbyAddress;
    path = path.replace('lat', lat).replace('lon', lon);
    return this.request(path, {}, callback);
};

Client.prototype.getDensity = function(lat, lon, day, hour, callback) {
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

Client.prototype.getContains = function(lat, lon, callback) {
    path = endpoints.contains;
    path = path.replace('lat', lat).replace('lon', lon);
    return this.request(path, {}, callback);
};

Client.prototype.getOverlaps = function(south, west, north, east, data, callback) {
    if (callback === undefined) {
        callback = data;
        data = {};
    }
    path = endpoints.overlaps;
    path = path.replace('south', south).replace('west', west).replace('north', north).replace('east', east);
    return this.request(path, data, callback);
};

Client.prototype.getBoundary = function(id, callback) {
    path = endpoints.boundary;
    path = path.replace('id', id);
    return this.request(path, {}, callback);
};
