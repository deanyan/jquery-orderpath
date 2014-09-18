requirejs.config({
  baseUrl: 'js',

  paths: {
    'jquery.cookie': '/sites/all/themes/realplayer/js/vendor/jquery.cookie',
    'en_promo': '/sites/all/themes/realplayer/js/en_promo'
  }

//  shim: {
//    jquery: {
//      exports: '$'
//    },
//
//    'jquery.cookie': ['jquery']
//  }
});

require(['en_promo', 'jquery.cookie'], function(enPromo) {
  var country = jQuery.cookie('country'), euCountryList = ['at', 'be', 'bg', 'cy',
      'cz', 'dk', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'it', 'lv', 'lt', 'lu',
      'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'si', 'es', 'se', 'ie']; // except
  // gb, which
  // is
  // supposed
  // to be a
  // non-EU
  // country

  if (jQuery.inArray(country, euCountryList) !== -1) {
    country = 'eu';
  } else if (country === 'gb') {
    country = 'gb';
  } else {
    country = 'row';
  }
  
  var distPrice = (country === 'eu') ? enPromo[country].distPrice
          + " " + enPromo[country].currencyUnit : enPromo[country].currencyUnit
          + enPromo[country].distPrice,

  fullPrice = (country === 'eu') ? enPromo[country].fullPrice
          + " " + enPromo[country].currencyUnit : enPromo[country].currencyUnit
          + enPromo[country].fullPrice,

  rpp = (country === 'eu') ? enPromo[country].rpp
          + " " + enPromo[country].currencyUnit : enPromo[country].currencyUnit
          + enPromo[country].rpp;

  jQuery('.i18n-rpp').html(rpp);
  jQuery('.i18n-full-price').html(fullPrice);
  jQuery('.i18n-dist-price').html(distPrice);
  jQuery('.i18n-order').attr('href',jQuery('.i18n-order').attr('href').replace('pathKey',enPromo[country].pathKey));
});
