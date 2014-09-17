OrderPath.i18n = (function(pub) {
  var bundle = null;

  // Immediate function to initialize all i18n text from server
  (function() {
    var url = OrderPath.util.getCurrentURL() + '/client/i18nresources';
    $
            .ajax({
              url: url,
              type: 'GET',
              dataType: 'json',
              async: false,
              // As of jQuery 1.8, the use of async: false with jqXHR
              // ($.Deferred) is deprecated; you must use the
              // success/error/complete callback options instead of the
              // corresponding methods of the jqXHR object such as
              // jqXHR.done() or the deprecated jqXHR.success().
              success: function(data) {
                bundle = data;
                // Redefine _getBundle function when we're done with getJSON
                // with success.
                // deprecated: nice try but using immediate function in the
                // end
                // _getBundle = function() {
                // return bundle;
                // };
              },
              error: function(data) {
                throw new SyntaxError(
                        'Fail to get JSON data from server, please verify server settings.');
              }
            });

  })();

  pub.text = function(key) {
    if (key && typeof key === 'string') { return (bundle) && bundle[key]
            ? bundle[key] : ''; }
  };

  return pub;
})(OrderPath.i18n || {});
