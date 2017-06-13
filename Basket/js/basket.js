var basket = {
	cartItems: [{
		'product': 'Cotton T-Shirt, Medium',
		'price': 1.99,
		'quantity': 1,
		'selector': 'item_1'
	}, {
		'product': 'Baseball Cap, One Size',
		'price': 2.99,
		'quantity': 2,
		'selector': 'item_2'
	}, {
		'product': 'Swim Shorts, Medium',
		'price': 3.99,
		'quantity': 1,
		'selector': 'item_3'
	}],
	//subttotal stored in global space
	subtotal : 0,

	//common function which could be called to update totals and VAT
	updateTotal: function () {
		$('#subTotal').html('&pound;' + this.subtotal.toFixed(2));
		$('#vat').html('&pound;' + (this.subtotal/5).toFixed(2));
		$('#total').html('&pound;' + (this.subtotal*6/5).toFixed(2));
		this.isSubmitValid();
	},

	//Possible Best way to recalculate totals,
	//instead of running loops just find the difference in quantity
	reCalculateTotal: function (price, changedQuantity) {
		this.subtotal += price * changedQuantity;
		this.updateTotal();
	},
	initialize: function () {
		//Actual rendering, run through the list and render the rows
		for (var itemCount in this.cartItems) {
			var currentRow = this.cartItems[itemCount],
			rowClass = new RowClass(currentRow);
			rowClass.initialize();
			//keep calculating total while rendering, so we can save a loop
			this.subtotal += currentRow.price * currentRow.quantity;
		}
	},
	isSubmitValid: function () {
		if (this.cartItems.length > 0 && $('.invalid_input').length === 0) {
			$('.basket-submit').prop('disabled', false);
		} else {
			$('.basket-submit').prop('disabled', 'disabled');
		}
	}
};
$(function () {
	basket.initialize();
});
