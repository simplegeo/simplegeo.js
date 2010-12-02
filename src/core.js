var Client = function(token, options) {
    if (!(this instanceof Client)) return new Client(token, options);
    options = options || {};
    this.token = token;
    this.options = options;
    this.host = options.host || 'api.simplegeo.com';
    this.port = options.port || '80';

    this.apiUrl = 'http://' + this.host + ':' + this.port;
};

Client.prototype = {
    request: function(path, data, callback) {
        data.token = this.token;
        data = $.param(data) + '&callback=?';
        $.ajax({
            url: this.apiUrl + path,
            dataType: 'json',
            data: data,
            success: function(response) {
                if (response.error) {
                  var error = new Error(response.message);
                  error.code = response.code;
                  callback(error);
                } else {
                  callback(null, response.data);
                }
            },
            error: function(xhr, ajaxOptions, err) {
                callback(err);
            }
        });
    },
    
    getLocation: function(ipAddress, callback) {
        var path;
        if (callback === undefined) {
            callback = ipAddress;
            path = "/0.1/locate.json";
        } else {
            path = "/0.1/locate/" + ipAddress + ".json";
        }
        return this.request(path, {}, callback);
   }
};

simplegeo.Client = Client;
