/**
 * @constructor
 */
var CreditCard = function() {
};

/**
 * @param {string}
 *          cardnumber - cards number
 * @returns credit cards type CC - Credit Cards MC - MasterCards VI - Visa AX -
 *          American Express DI - Discover
 */
CreditCard.prototype.getCardType = function(cardnumber) {
  return (/^5[1-5]/).test(cardnumber) ? 'CC/MC' : /^4/.test(cardnumber)
          ? 'CC/VI' : /^3[47]/.test(cardnumber) ? 'CC/AX' : /^6(?:011|5)/
                  .test(cardnumber) ? 'CC/DI' : /^(?:2131|1800|35)/
                  .test(cardnumber) ? 'CC/JC' : undefined;
};

/**
 * @param {string}
 *          message - will be shown
 * @deprecated
 */
CreditCard.prototype.cardValidate = function(cardnumber) {
    var type = this.getCardType(cardnumber),
    countryOfCards = {
      JP: ['CC/MC', 'CC/VI', 'CC/JC'],
      US: ['CC/MC', 'CC/VI', 'CC/AX', 'CC/DI'],
      WW: ['CC/MC', 'CC/VI', 'CC/AX']
    },
    country = OrderPath.util.getMetaContent('pathContext.country');
    switch (country) {
    case 'JP':
    case 'US':                        // CC/JC countryOfCards[US] ['CC/MC', 'CC/VI', 'CC/AX', 'CC/DI']
      return type && $.inArray(type, countryOfCards[country]) > -1;
    default:
      return type && $.inArray(type, countryOfCards['WW']) > -1;
    }
};

/**
 * @constructor
 * @param form
 *          {string} - form name or id starting with pound sign(#) or class
 *          starting with period(.)
 */
var Form = function(form) {
  this.form = (/^[#|\.]/).test(form) ? $(form) : $('form[name="' + name + '"]');
  this.creditcard = new CreditCard();
  this.rules = {};
};

/**
 * @param {string}
 *          name - rule name will be added
 * @param {function}
 *          func - concrete function
 */
Form.prototype.addRule = function(name, func) {
  this.rules[name] = func;

  func.call(this);
};

Form.prototype.preHandler = function() {
  // TODO add omniture tracking, e.g. oc("createPayBtn");
};

/**
 * Action will be done after form submition
 */
Form.prototype.postHandler = function() {
  this.form.find(
          'input[type="submit"], button[type="submit"], input[type="image"]')
          .prop('disabled', true).css({
            cursor: 'wait',
            backgroundColor: '#ccc'
          });
};

/**
 * @param {object}
 *          rules - map of rules to validate
 * @param {object}
 *          messages - map of messages to show
 * @param {function}
 *          handler - handler will be called(tracking, additional actions)
 */
Form.prototype.submit = function(rules, messages, preHandler, postHandler) {
  var that = this;
  this.form.validate({
    onclick: false,

    rules: rules,

    messages: messages,

    errorLabelContainer: '.errorMessage',

    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).removeClass(validClass);
      $('.serverMessage').hide();
    },

    submitHandler: function(form) {
      that.preHandler();
      if (preHandler !== undefined) {
        preHandler();
      }
      form.submit();
      if (postHandler !== undefined) {
        postHandler();
      }
      that.postHandler();
    }
  });
};