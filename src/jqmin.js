/* jQmin
 *
 * Based on code from jQuery v1.4.2
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
var jQmin = (function(window, undefined){

function now() {
    return (new Date).getTime();
}

var document = window.document;

var jsc = now(),
    jsre = /=\?(&|$)/,
    rts = /(\?|&)_=.*?(&|$)/,
    rquery = /\?/,
    r20 = /%20/g,
    toString = Object.prototype.toString,
    jQuery = {
    fn: {jquery: '1.4.2-min', jquerymin: true},

    // See test/unit/core.js for details concerning isFunction.
    // Since version 1.3, DOM methods and functions like alert
    // aren't supported. They return false on IE (#2968).
    isFunction: function( obj ) {
        return toString.call(obj) === "[object Function]";
    },
    
    isArray: function( obj ) {
        return toString.call(obj) === "[object Array]";
    },

    // args is for internal usage only
    each: function( object, callback, args ) {
        var name, i = 0,
            length = object.length,
            isObj = length === undefined || jQuery.isFunction(object);

        if ( args ) {
            if ( isObj ) {
                for ( name in object ) {
                    if ( callback.apply( object[ name ], args ) === false ) {
                        break;
                    }
                }
            } else {
                for ( ; i < length; ) {
                    if ( callback.apply( object[ i++ ], args ) === false ) {
                        break;
                    }
                }
            }

        // A special, fast, case for the most common use of each
        } else {
            if ( isObj ) {
                for ( name in object ) {
                    if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
                        break;
                    }
                }
            } else {
                for ( var value = object[0];
                    i < length && callback.call( value, i, value ) !== false; value = object[++i] ) {}
            }
        }

        return object;
    },

    // Serialize an array of form elements or a set of
    // key/values into a query string
    param: function( a ) {
        var s = [];
        
        // If an array was passed in, assume that it is an array of form elements.
        if ( jQuery.isArray(a) || a.jquery ) {
            // Serialize the form elements
            jQuery.each( a, function() {
                add( this.name, this.value );
            });
            
        } else {
            // encode params recursively.
            for ( var prefix in a ) {
                buildParams( prefix, a[prefix] );
            }
        }

        // Return the resulting serialization
        return s.join("&").replace(r20, "+");

        function buildParams( prefix, obj ) {
            if ( jQuery.isArray(obj) ) {
                // Serialize array item.
                jQuery.each( obj, function( i, v ) {
                    if ( /\[\]$/.test( prefix ) ) {
                        // Treat each array item as a scalar.
                        add( prefix, v );
                    } else {
                        // If array item is non-scalar (array or object), encode its
                        // numeric index to resolve deserialization ambiguity issues.
                        // Note that rack (as of 1.0.0) can't currently deserialize
                        // nested arrays properly, and attempting to do so may cause
                        // a server error. Possible fixes are to modify rack's
                        // deserialization algorithm or to provide an option or flag
                        // to force array serialization to be shallow.
                        buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v );
                    }
                });
                    
            } else if ( obj != null && typeof obj === "object" ) {
                // Serialize object item.
                jQuery.each( obj, function( k, v ) {
                    buildParams( prefix + "[" + k + "]", v );
                });
                    
            } else {
                // Serialize scalar item.
                add( prefix, obj );
            }
        }

        function add( key, value ) {
            // If value is a function, invoke it and return its value
            value = jQuery.isFunction(value) ? value() : value;
            s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        }
    },

    ajax: function(s) {
        var jsonp, data, status,
                callbackContext = s;

        // convert data if not already a string
        if ( s.data && typeof s.data !== "string" ) {
            s.data = jQuery.param( s.data );
        }

        // Build temporary JSONP function
        jsonp = s.jsonpCallback || ("jsonp" + jsc++);

        // Replace the =? sequence both in the query string and the data
        if ( s.data ) {
            s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
        }

        s.url = s.url.replace(jsre, "=" + jsonp + "$1");

        // Handle JSONP-style loading
        window[ jsonp ] = window[ jsonp ] || function( tmp ) {
            data = tmp;
            success();
            complete();
            // Garbage collect
            window[ jsonp ] = undefined;

            try {
                delete window[ jsonp ];
            } catch(e) {}

            if ( head ) {
                head.removeChild( script );
            }
        };

        var ts = now();

        // try replacing _= if it is there
        var ret = s.url.replace(rts, "$1_=" + ts + "$2");

        // if nothing was replaced, add timestamp to the end
        s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");

        // If data is available, append data to url for get requests
        s.url += (rquery.test(s.url) ? "&" : "?") + s.data;

        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        var script = document.createElement("script");
        script.src = s.url;
        
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        // This arises when a base node is used (#2709 and #4378).
        head.insertBefore( script, head.firstChild );

        // We handle everything using the script element injection
        return undefined;

        function success() {
            // If a local callback was specified, fire it and pass it the data
            if ( s.success ) {
                s.success.call( callbackContext, data, status );
            }

            // if ( s.global ) {
            //     trigger( "ajaxSuccess", [xhr, s] );
            // }
        }

        function complete() {
            // Process result
            if ( s.complete ) {
                s.complete.call( callbackContext, undefined, status);
            }

            // The request was completed
            // if ( s.global ) {
            //     trigger( "ajaxComplete", [xhr, s] );
            // }

            // Handle the global AJAX counter
            // if ( s.global && ! --jQuery.active ) {
            //     jQuery.event.trigger( "ajaxStop" );
            // }
        }
    }
};

return jQuery;

})(window);
