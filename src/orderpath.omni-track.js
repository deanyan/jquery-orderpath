OrderPath.omnitrack = (function(pub) {
  var channel = ['checkout', 'proforma', 'receipt', 'download', 'notice',
      'error', 'fyp'];

  var trackingFields = null; omnitureCookie = undefined, omnitureEnabled = false, cxljzmnyjsgz = undefined;

  try {
    trackingFields = OrderPath.omnitrack.settings;
    omnitureCookie = getCookie("writeOmniture");
    omnitureEnabled = (trackingFields.useOmni && omnitureCookie) ? true
            : trackingFields.useOmni ? false : omnitureCookie ? true : false;
    cxljzmnyjsgz = getCookie("cxljzmnyjsgz");
    
    if(cxljzmnyjsgz === ".") {
      cxljzmnyjsgz = "";
    }
  } catch (e) {
    throw ReferenceError('Fail to load omniture fields variable, please check sever setttings.'
            + e);
  }
  // (function() {
  // $
  // .ajax({
  // url: OrderPath.util.getStoreURL,
  // type: 'GET',
  // dataType: 'json',
  // async: false,
  // success: function(data) {
  // trackingFields = data;
  // },
  // error: function(data) {
  // throw new SyntaxError(
  // 'Fail to get JSON data from server, please verify server settings.');
  // }
  // });
  // })();

  function _pageView(options) {
    // Return if omniture closed
    if (!omnitureEnabled) { return; }
    
    var pageName = trackingFields.orderpathId + options.pageName
            + cxljzmnyjsgz
            , paymentType = 'unknown'
            , cuntr = 'unknown'
            , prod = ';unknown'
            , errorType = [
                     trackingFields.orderpathId, 
                     options.pageName,
                    trackingFields.paymentType,
                      trackingFields.errorType,
                        trackingFields.errorMessage
                        ].join('.')
          , userType = [
                         trackingFields.orderpathId
                         , options.pageName
                         , trackingFields.userType
                         ].join('.');
    
    var pageNameList = ['checkout.create', 'checkout.update', 'proforma',
        'receipt', 'techDiff', 'techDiff.checkout'];

    if ($.inArray(options.pageName, pageNameList) > -1) {
      paymentType = [trackingFields.orderpathId, options.pageName,
          trackingFields.paymentType].join('.');
      cuntr = [trackingFields.orderpathId, options.pageName,
          trackingFields.country].join('.');
    }

    // Invoke omniturePageView defined in omniture-pkg.js file
    omniturePageView(trackingFields.omniAccount, options.channel, pageName,
            prod, options.events, trackingFields.pcode, trackingFields.cpath,
            trackingFields.rsrc, trackingFields.lsrc, '', // no discode at all
            trackingFields.opage, '', errorType, trackingFields.src, userType,
            paymentType, cuntr, trackingFields.guid,
            trackingFields.playerVersion);
  }

  function _clickThrough(options) {
    $('a[data-omni-link], input[data-omni-link], button[data-omni-link]').each(
            function() {
              $(this).bind(
                      'click.omnitrack',
                      function() {
                        // Return if omniture closed
                        if (!omnitureEnabled) { return; }
                        omnitureClick(trackingFields.omniAccount, [
                            trackingFields.orderpathId,
                            $(this).data('omniLink')].join('.'));
                        window.setTimeout(function() {
                        }, options.delay);
                      });
            });
  }

  pub.ctpv = function(options) {
    var defaults = {
      channel: $('meta[name="channel"]').prop('content'),
      pageName: $('meta[name="pageid"]').prop('content'),
      events: '',
      delay: 1 * 1000
    };
    var opts = $.extend({}, defaults, options);
    // Call pageView function onload
    _pageView(opts);
    // Call clickThrough every time button with [data-omni-link] click
    _clickThrough(opts);
  };
  return pub;
})(OrderPath.omnitrack || {});

// Invoke omni-track function
OrderPath.omnitrack.ctpv({});
