/**
 * Create a SimpleGeo Storage Client
 * @see simplegeo.Client
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
  layers: '/0.1/layers.json',
  layer: '/0.1/layers/name.json'
}

/**
 * Retrieve a record.
 * @param {String} layer
 * @param {String} id
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   "id": "1",
 *   "geometry": {
 *     "coordinates": [
 *       -105.27742,
 *       40.016950
 *     ],
 *     "type": "Point"
 *   },
 *   "properties": {
 *     "layer": "com.simplegeo.example",
 *   },
 *   "type": "Feature",
 *   "created": 1275929679,
 *   "layerLink": {
 *     "href": "http://api.simplegeo.com/0.1/layer/com.simplegeo.example.json"
 *   },
 *   "selfLink": {
 *     "href": "http://api.simplegeo.com/0.1/records/com.simplegeo.example/1.json"
 *   }
 * }</pre></blockquote>
 */
simplegeo.StorageClient.prototype.getRecord = function(layer, id, callback) {
    path = endpoints.record;
    path = path.replace('layer', layer).replace('id', id);
    return this.request(path, {}, callback);
};

/**
 * Retrieve a list of records.
 * @param {String} layer
 * @param {Array} ids
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   "features":[...],
 *   "type": "FeatureCollection",
 * }</pre></blockquote>
 */
simplegeo.StorageClient.prototype.getRecords = function(layer, ids, callback) {
    path = endpoints.records;
    idString = ids.join(',');
    path = path.replace('layer', layer).replace('ids', idString);
    return this.request(path, {}, callback);
};

/**
 * Retrieve the history of a record.
 * @param {String} layer
 * @param {String} id
 * @param {Object} [options] See <a href='http://simplegeo.com/docs/api-endpoints/simplegeo-storage#record-history'>SimpleGeo Storage documentation</a>
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   "geometries": [
 *     {
 *       "coordinates": [-105.27742, 40.016950],
 *       "created": 1275929679,
 *       "type": "Point"
 *     }
 *   ],
 *   "type": "GeometryCollection"
 * }</pre></blockquote>
 */
simplegeo.StorageClient.prototype.getHistory = function(layer, id, options, callback) {
    if (callback === undefined) {
        callback = options;
        options = {};
    }
    path = endpoints.history;
    path = path.replace('layer', layer).replace('id', id);
    return this.request(path, options, callback);
};

/**
 * Query for records near a point.
 * @param {String} layer
 * @param {Number} lat
 * @param {Number} lon
 * @param {Object} [options] See <a href='http://simplegeo.com/docs/api-endpoints/simplegeo-storage#nearby'>SimpleGeo Storage documentation</a>
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   "features":[...],
 *   "type": "FeatureCollection",
 *   "next_cursor": "eyJpZCI6IjE="
 * }</pre></blockquote>
 */
simplegeo.StorageClient.prototype.getNearby = function(layer, lat, lon, options, callback) {
    if (callback === undefined) {
        callback = options;
        options = {};
    }
    path = endpoints.nearby;
    path = path.replace('layer', layer).replace('arg', lat + ',' + lon);
    return this.request(path, options, callback);
};

/**
 * Query for records near the location of an IP address
 * @param {String} layer
 * @param {String} [ip] Use this IP as the lookup.
 *        Defaults to the IP address of the request if not specified
 * @param {Object} [options] See <a href='http://simplegeo.com/docs/api-endpoints/simplegeo-storage#nearby'>SimpleGeo Storage documentation</a>
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   "features":[...],
 *   "type": "FeatureCollection",
 *   "next_cursor": "eyJpZCI6IjE="
 * }</pre></blockquote>
 */
simplegeo.StorageClient.prototype.getNearbyFromIP = function(layer, ip, options, callback) {
    if (arguments.length === 3) {
      // Check if the ip or the options were omitted
      callback = options;
      if (ip.trim) {
        options = {};
      } else {
        options = ip;
        ip = 'ip';
      }
    } else if (arguments.length === 2) {
      callback = ip;
      ip = 'ip';
      options = {};
    }
    path = endpoints.nearby;
    path = path.replace('layer', layer).replace('arg', ip);
    return this.request(path, options, callback);
};

/**
 * Query for records near an address
 * @param {String} layer
 * @param {String} address a mailing address to use as the point for the query.
 * @param {Object} [options] See <a href='http://simplegeo.com/docs/api-endpoints/simplegeo-storage#nearby'>SimpleGeo Storage documentation</a>
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   "features":[...],
 *   "type": "FeatureCollection",
 *   "next_cursor": "eyJpZCI6IjE="
 * }</pre></blockquote>
 */
simplegeo.StorageClient.prototype.getNearbyFromAddress = function(layer, address, options, callback) {
    if (callback === undefined) {
      callback = options;
      options = {};
    }
    path = endpoints.nearby;
    path = path.replace('layer', layer).replace('arg', 'address');
    options.address = address
    return this.request(path, options, callback);
}

simplegeo.StorageClient.prototype.getNearbyGeohash = function(layer, geohash, options, callback) {
    if (callback === undefined) {
        callback = options;
        options = {};
    }
    path = endpoints.nearby;
    path = path.replace('layer', layer).replace('arg', geohash);
    return this.request(path, options, callback);
};

/**
 * Get the information about a layer.
 * @param {String} layer
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   "name": "com.simplegeo.example",
 *   "title": "An Example Layer",
 *   "description": "Just for an example...",
 *   "public": false,
 *   "created": 1299547732,
 *   "updated": 1299547732
 * }</pre></blockquote>
 */
simplegeo.StorageClient.prototype.getLayer = function(layer, callback) {
  path = endpoints.layer;
  path = path.replace('name', layer);
  return this.request(path, {}, callback);
};

/**
 * Get the list of layers accessible to the authenticated user.
 * @param {Function} callback See {@link callbacks}.
 * Example response data:
 * <blockquote><pre>{
 *   "layers":[...]
 * }</pre></blockquote>
 */
simplegeo.StorageClient.prototype.getLayers = function(options, callback) {
    if (callback === undefined) {
        callback = options;
        options = {};
    }
    path = endpoints.layers;
    return this.request(path, options, callback);
};
