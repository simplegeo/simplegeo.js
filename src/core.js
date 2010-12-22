var simplegeo = window.simplegeo;

if (simplegeo === undefined) {
  /**
   * The top-level SimpleGeo namespace. All Clients are registered on
   * this object.
   *
   * @namespace
   */
  simplegeo = {};

  /**
   * (Documentation only, not a namespace).
   * <p>Callback functions are used for most of the methods on each of the
   * Clients. Every callback function should be defined as:</p>
   *
   * <blockquote><code>function(err, data) { ... }</code></blockquote>
   *
   * <p>If there is an error, the client will call the callback with only
   * the error:</p>
   *
   * <blockquote><code>callback(err);</code></blockquote>
   *
   * <p>If no error occured, the callback will be called with only the
   * data:</p>
   *
   * <blockquote><code>callback(null, data);</code></blockquote>
   *
   * Here is an example of how your callback should look for each function:
   *
   * <blockquote><pre>client.getLocation(function(err, position) {
   *   if (err) {
   *     // Do something with the error
   *   } else {
   *     // Do something with the data
   *   }
   * });</pre></blockquote>
   *
   * @name callbacks
   * @namespace
   */
}
