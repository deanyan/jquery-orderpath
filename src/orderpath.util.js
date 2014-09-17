OrderPath.util = (function(pub) {
  pub.getMetaContent = function(name) {
    var content = '';
    return name && (content = $('meta[name="' + name + '"]').prop('content'))
            ? content : '';
  };

  var lang = pub.getMetaContent('pathContext.language'), country = pub
          .getMetaContent('pathContext.country'), pathId = pub
          .getMetaContent('pathContext.pathId'), host = window.location.hostname;

  pub.getCurrentURL = function() {
    return ['/', host, 'rn', pathId, lang, country].join('/');
  };

  pub.getCheckoutURL = function() {
    return [pub.getMetaContent('checkoutUrl'), pathId, lang, country].join('/');
  };

  pub.getStoreURL = function() {
    return [pub.getMetaContent('store2Url'), pathId, lang, country].join('/');
  };

  return pub;
})(OrderPath.util || {});