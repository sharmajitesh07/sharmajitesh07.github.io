//class to render each row
function RowClass (rowData) {
	this.rowData = rowData;
}

/*any functions decalred in function declaration would have been available in all instances
put them in prototype so that they could be reused!!*/
RowClass.prototype = {
	/* a simple hash to make code more readable
	tells which method to be called on event on some selector*/
	events: {
		'keyup .quantityBox': 'handleQuantityChange',
		'click .deleteIcon': 'deleteHandler',
		'click .upscale': 'changeQuantity',
		'click .downscale': 'changeQuantity'
	},
	changeQuantity : function (event) {
		event.preventDefault();
		var target = $(event.target),
        increment = target.hasClass('upscale') ? 1 : -1,
        targetInput = target.siblings('input'),
        newQty = Number(targetInput.val()) + increment;

        if (targetInput.hasClass('invalid_input') || newQty < 1 || newQty > 10) {
        	return;
        }

        this.rowData.quantity = newQty;
        targetInput.val(newQty);
        var cost = this.rowData.price * this.rowData.quantity;
		//don't query in whole document, just in the view is enuf !!
		this.currentView.find('.costField').html('&pound;' + cost.toFixed(2));
		basket.reCalculateTotal(this.rowData.price, increment);
	},
	/*Method to handle quantity Changed*/
	handleQuantityChange: function (event) {
		var originalQuantity = this.rowData.quantity;
		var valid = this.isValid(event.target.value, event.target);
		if (valid) {
			this.rowData.quantity = Number(event.target.value);
		} else {
			this.rowData.quantity = Number(0);
		}
		
		var cost = this.rowData.price * this.rowData.quantity;
		//don't query in whole document, just in the view is enuf !!
		this.currentView.find('.costField').html('&pound;' + cost.toFixed(2));
		basket.reCalculateTotal(this.rowData.price, this.rowData.quantity-originalQuantity);
	},
	isValid: function (newQuantity) {
		var isValid = !!newQuantity.match(/^([1-9]|10)$/),
		target = this.currentView.find('.quantityBox');

        if (isValid) {
        	target.removeClass('invalid_input');
        } else {
        	target.addClass('invalid_input');
        }

        return isValid;
	},
	/*delete hanling*/
	deleteHandler: function () {
		basket.cartItems.splice(basket.cartItems.indexOf(this.rowData), 1);
		/*Remove all events on the view so that it can be garbage collected*/
		this.currentView.off();
		this.currentView.remove();
		basket.reCalculateTotal(this.rowData.price, -this.rowData.quantity);
	},
	subscribeToEvents: function () {
		//The reason how the hash works
		var that = this,
		eventName = null,
		element = null,
		eventHash = this.events;
		//run a loop through the hash and attach relevant events
		for (var thisEvent in eventHash) {
			eventName = thisEvent.split(' ')[0];
			element = thisEvent.split(eventName + ' ')[1];
			/*closure !! handle thisEvent cautiously,
			 else it will point to last value*/
			(function () {
				var currentEvent = thisEvent;
				that.currentView.find(element).on(eventName, function (event) {
					that[eventHash[currentEvent]](event);
				});
			})();
			
		}
	},
	placePlusMinusButtons: function () {
		this.currentView.find('.quantity')
		.append($('<a/>', {
            'class': 'upscale',
            href: 'javascript:void(0)',
            text: '+'
        }))
		.append($('<a/>', {
            'class': 'downscale',
            href: 'javascript:void(0)',
            text: '-'
        }));
	},
	initialize: function () {
		//update the new UI for efficient querying 
		this.currentView = $('#' + this.rowData.selector);
		this.placePlusMinusButtons();
		//enable what is written in event hash
		this.subscribeToEvents();
		return this;
	}
}