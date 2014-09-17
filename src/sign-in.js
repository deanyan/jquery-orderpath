/**
 * @param {object} opts - call with your own options, default value
 * 
 *  domain: 'real.com',
 *  elem: '#signInFrame',
 *  container: '#signInContainer',
 *  url: $("meta[name='store2Url']").prop("content") + "/"+ $("meta[name='pathContext.userDataStoreKey']").prop("content") + "/signIn",
 *  overlay: '#overlay'
 * 
 */
var SignIn = function(opts) {
  this.elem = opts.elem;
  this.domain = opts.domain;
  this.container = opts.container;
  this.url = opts.url;
  this.overlay = opts.overlay;
  this.events = {
    '#open click': this.open,
    '#close click': this.close,
    '#signUp click': this.close
  };
  this.$elem = this;
};

/**
 * Call this method to initialize signIn function
 */
SignIn.prototype.init = function() {
  var assets = null, context = this;

  // document.domain = this.domain;

  $.each(this.events, function(evts, callback) {
    assets = evts.split(/\s+/);
    $(assets[0]).bind(assets[1], {
      ctx: context
    }, callback);
  });

  /**
   * This function should be there at all. We bind scroll event, to make
   * lightbox popup scrolling with background viewport(bugfix INT-1923)
   * container.height() / $(document).height() - ratio between document and
   * lightbox popup
   */
  $(window).scroll(
          function(event) {
            var container = $(context.container);
            if (container.length > 0) {
              container.css('marginTop', (container.height() / $(document).height() * $(window).scrollTop()) * -1);
            }
          });
};

/**
 * @param {object} event - event object
 * Create iframe on the fly, insert into lightbox
 */
SignIn.prototype.open = function(event) {
  var frame = $('<iframe />').prop({
    src: event.data.ctx.url,
    name: "signInFrame",
    id: "signInFrame",
    frameborder: "0",
    allowfullscreen: "",
    mozallowfullscreen: "",
    webkitallowfullscreen: "",
    hspace: "0",
    vspace: "0"
  });

  //(TODO: write a function to wrap lightbox, call lightbox function to append iframe rather than write HTML)
  $(event.data.ctx.container).find('.lightbox-outer > .lightbox-inner').append(frame);
  $(event.data.ctx.overlay).show();
  $(event.data.ctx.container).show();
  
  // Log omniture click event
  oc('signInLink');
};

/**
 * @param {object} event - event object
 * Rmove iframe, looks heavy operation. But to prevent history entry with 'src' set.
 */
SignIn.prototype.close = function(event) {
  $(event.data.ctx.elem).remove();
  $(event.data.ctx.container).hide();
  $(event.data.ctx.overlay).hide();
};

/**
 * @deprecated - Do NOT use this method. Not working now.
 */
SignIn.prototype.scroll = function(event) {
  var container = $(event.data.ctx.container);
  if (container.length > 0) {
    container.css('marginTop', (container.height() / $(document).height() * $(window).scrollTop()) * -1);
  }
};

$.signInFrame = function(options) {
  var defaults = {
    domain: 'real.com',
    elem: '#signInFrame',
    container: '#signInContainer',
    url: $("meta[name='store2Url']").prop("content") + "/"  + $("meta[name='pathContext.userDataStoreKey']").prop("content") + "/signIn",
    overlay: '#overlay'
  };

  var opts = $.extend(defaults, options || {});

  var signIn = new SignIn(opts);

  signIn.init();
};