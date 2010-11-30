var version = '0.1';
var host = 'api.simplegeo.com';
var port = '80';
var apiUrl = 'http://' + host + ':' + port + '/' + version;

var Client = function(token) {
    this.token = token;
};

Client.prototype = {
    request: function(path, data, callback) {
        data.token = this.token;
        data = $.param(data) + '&callback=?';
        $.ajax({
            url: apiUrl + path,
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
            path = "/locate.json";
        } else {
            path = "/locate/" + ipAddress + ".json";
        }
        return this.request(path, {}, callback);
   }
};

var simplegeo = {
    Client: Client
};
