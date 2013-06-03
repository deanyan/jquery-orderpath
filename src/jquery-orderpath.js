/*
 * jquery-orderpath
 * https://github.com/deanyan/jquery-orderpath
 *
 * Copyright (c) 2013 Dean Yan
 * Licensed under the MIT license.
 */

;(function($, window, document, undefined){

	var methods = {
		
		validate : function(options) {
			
			var defaults = {
				elements : ['input', 'select', 'textarea'],
				skip : ['submit', 'image'],
				callback : function(){}
			};	
			
		    this.each(function(){
	
				var opts = {}, skip = '', elements = '';
				
				opts.elements = $.merge(defaults.elements, options.elements);
				opts.skip = $.merge(defaults.skip, options.skip);
				opts.callback = options.callback || defaults.callback;
				
				var $form = $(this);
				
				for(var i = 0, l = opts.elements.length; i < l; i++ ){
					elements = elements + (opts.elements[i]);
					if(i < l - 1) {
						elements += ',';
					}
				}
				
				var inputs = $form.find(elements).filter(function(){
					
					if(this.id && $.inArray('#' + this.id, opts.skip) >= 0 
						|| this.className && $.inArray('.' + this.className, opts.skip) >= 0 
						|| this.type && $.inArray(this.type, opts.skip) >= 0){
							return false;
						}
					return true;
				});
			
				$form.data('reservedFields', inputs);
				
				$form.submit(function(){
					//methods['_worker'].apply($form, arguments);
					$form.data('invalidSubmit', false);
					
					$form.data('reservedFields').each(function(){
				
						var $this = $(this),
							data = $this.data('message');
						
						if($this.data('required')){
							if(!$this.val().trim()) {
							
								if(!data) {
									opts.callback($this);
								}
								
								$form.data('invalidSubmit', true);
								
							}else {
									
								if(data) {
									data.remove();
									$this.removeData('message');
								}
							}
						}
					});
					
					return !$form.data('invalidSubmit');
				});
			});
		},
		
		/*
		_worker: function(){
			var $form = this;
			$form.data('invalidSubmit', false);
			
			this.data('reservedFields').each(function(){
				
					var $this = $(this),
						data = $this.data('message');
					
					if($this.data('required')){
						if(!$this.val().trim()) {
						
							if(!data) {
								console.log(opts.callback);
								//opts.callback($this);						
							}
							
							$form.data('invalidSubmit', true);
							
						}else {
								
							if(data) {
								data.remove();
								$this.removeData('message');
							}
						}
					}
			});
		},
		*/
		
		labelOver: function(options) {
			var defaults = {opacity: 0.5};
			
			var o = $.extend({}, defaults, options);
			
			/*
				HTML5 New Input Types
				---------------------
				color
				date
				datetime
				datetime-local
				email
				month
				number
				range
				search
				tel
				time
				url
				week
			*/
			
			var validFields = ['text', 
				               'password', 
				               'email',
								'color',
								'date',
								'datetime',
								'datetime-local',
								'number',
								'time',
				               'url', 
				               'tel', 
				               'search',
							   'range',
							   'month',
							   'week'];
							   // We only make above type fields run.
		
			return this.each(function(){
			
				var label = jQuery(this),
					f = label.attr('for'),
					that = this;
				
				if (f) {
					
					var input = jQuery('#' + f);
					
					if(!input.attr('type') || $.inArray(input.attr('type'), validFields) != -1){
					
						this.fadeOut = function() {
					
						  label.css({ opacity: o.opacity });
						}
						
						this.fadeIn = function() {
						  if (input.val() == ''){
							  label.css({ display: 'block',opacity: 1.0 });
						  }
						}
						
						this.hide = function(){
							label.css({ display: 'none' });
						}
						
						// handlers
						input.focus(this.fadeOut);
						input.blur(this.fadeIn);
						
						input.keydown(function(event){
							
							if(event.which !== 9){
								that.hide();
							}
						});
					  
						label.click(function(){ input.focus() });
						
						if (input.val() != '') {
							this.hide(); 
						}
					}
				}
			});
		},
		
		/*
		 * Didn't use now.
		 */
		destory: function(){
			return this.each(function(){
				var $this = $(this),
					data = $this.data('message');
				
				data.remove();
				$this.removeData('message');
			});
		}
	};
	/*
	 * jQuery plugin methods namespace.
	 */
	 
	$.fn.orderpath = function(method){
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof method == 'object' || !method){
			return methods.init.apply(this, arguments);
		}else {
			$.error('Method' + method + 'does not exist on jQuery orderpath');
		}
	};
})(jQuery, window, document);