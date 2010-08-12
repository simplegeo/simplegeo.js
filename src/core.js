var simplegeo = (function($) {
    var version = '0.1';
    var host = 'api.simplegeo.com';
    var port = '80';
    var apiUrl = 'http://' + host + ':' + port + '/' + version;
    var endpoints = {
        record: '/records/layer/id.json',
        records: '/records/layer/ids.json',
        history: '/records/layer/id/history.json',
        nearby: '/records/layer/nearby/arg.json',
        nearbyAddress: '/nearby/address/lat,lon.json',
        densityDay: '/density/day/lat,lon.json',
        densityHour: '/density/day/hour/lat,lon.json',
        contains: '/contains/lat,lon.json',
        overlaps: '/overlaps/south,west,north,east.json',
        boundary: '/boundary/id.json'
    }

    var Client = function(token) {
        this.token = token;
    }

    Client.prototype = {
        request: function(path, data, callback) {
            data.token = this.token;
            data = $.param(data) + '&callback=?';
            $.ajax({
                url: apiUrl + path,
                dataType: 'json',
                data: data,
                success: function(data) {
                    callback(data);
                }
            });
        },
        
        getRecord: function(layer, id, callback) {
            path = endpoints.record;
            path = path.replace('layer', layer).replace('id', id);
            return this.request(path, {}, callback);
        },

        getRecords: function(layer, ids, callback) {
            path = endpoints.records;
            idString = ids.join(',');
            path = path.replace('layer', layer).replace('ids', idString);
            return this.request(path, {}, callback);
        },

        getHistory: function(layer, id, data, callback) {
            if (callback === undefined) {
                callback = data;
                data = {};
            }
            path = endpoints.history;
            path = path.replace('layer', layer).replace('id', id);
            return this.request(path, data, callback);
        },

        getNearby: function(layer, lat, lon, data, callback) {
            if (callback === undefined) {
                callback = data;
                data = {};
            }
            path = endpoints.nearby;
            path = path.replace('layer', layer).replace('arg', lat + ',' + lon);
            return this.request(path, data, callback);
        },

        getNearbyGeohash: function(layer, geohash, data, callback) {
            if (callback === undefined) {
                callback = data;
                data = {};
            }
            path = endpoints.nearby;
            path = path.replace('layer', layer).replace('arg', geohash);
            return this.request(path, data, callback);
        },

        getNearbyAddress: function(lat, lon, callback) {
            path = endpoints.nearbyAddress;
            path = path.replace('lat', lat).replace('lon', lon);
            return this.request(path, {}, callback);
        },

        getDensity: function(lat, lon, day, hour, callback) {
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
        },

        getContains: function(lat, lon, callback) {
            path = endpoints.contains;
            path = path.replace('lat', lat).replace('lon', lon);
            return this.request(path, {}, callback);
        },

        getOverlaps: function(south, west, north, east, data, callback) {
            if (callback === undefined) {
                callback = data;
                data = {};
            }
            path = endpoints.overlaps;
            path = path.replace('south', south).replace('west', west).replace('north', north).replace('east', east);
            return this.request(path, data, callback);
        },

        getBoundary: function(id, callback) {
            path = endpoints.boundary;
            path = path.replace('id', id);
            return this.request(path, {}, callback);
        }

    }
    return {
        Client: Client
    }
})(jQuery);
