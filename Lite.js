var Lite = (function() {
	/*
		Lite
	 */
	var Lite = function() {
		console.log("Lite created");
	};

	Lite.Version = '0.0.1';
	
	/* 
		View Constructor
	*/
	var View = Lite.View = function() {
		this.vid = _.uniqueId('v');
		this.initialize();
	};

	// Extend View
	_.extend(View.prototype, {
		parentElName: 'div',
		$el: {},
		template: '<div>View</div>',
		events: {},
		initialize: function() {
			// Save element
			this.$el = $(this.parentElName);

			console.log("View created");
		},
		render: function() {
			// forIn scope
			var self = this;
			
			this.$el.append(this.template);
			
			// Register events
			_.forIn(this.events, function(callback, key) {
				var keys = key.split(" ");
				self.registerEvent(keys[1], keys[0], callback);
			});
		},
		registerEvent: function(event, elEvent, callback) {
			var $elEvent = this.$el.find(elEvent);
			// Check if element exist
			if ($elEvent.length > 0) {
				// Check if event function exist for current $elEvent
				//if(_.has($elEvent, event)) {
				if ($elEvent[event]) {
					$elEvent.bind(event, callback);
				} else {
					console.log("Invalid Parameter : Event Name");
				}
			} else {
				console.log("Invalid Parameter : Element name");
			}
		}
	});

	/**
	 * JavaScript extend (backbone)
	 */
	var extend = function(protoProps, staticProps) {
		var parent = this;
		var child;

		if (protoProps && _.has(protoProps, 'constructor')) {
			child = protoProps.constructor;
		} else {
			child = function(){ return parent.apply(this, arguments); };
		}

		_.extend(child, parent, staticProps);

		var Surrogate = function(){ this.constructor = child; };
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();

		if (protoProps) _.extend(child.prototype, protoProps);

		child.__super__ = parent.prototype;

		return child;
	};

	View.extend = extend;

	/*
		Final return Lite object
	 */
	return Lite;
})();