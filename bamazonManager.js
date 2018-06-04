//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT
//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT
//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT
//THIS IS NOT COMPLETE    PLACEHOLDER CODE TO PLAY AROUND WITH HOW TO CREATE THIS CONCEPT

var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazon'
});

function displayActions() {

	inquirer.prompt([
		{
			type: 'list',
			name: 'option',
			message: 'Please select an option:',
			choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
			filter: function (val) {
				if (val === 'View Products for Sale') {
					return 'sale';
				} else if (val === 'View Low Inventory') {
					return 'lowInventory';
				} else if (val === 'Add to Inventory') {
					return 'addInventory';
				} else if (val === 'Add New Product') {
					return 'newProduct';
				} else {
					console.log('ERROR: Invalid, choose again plase!');
					initiateBamazon();
				}
			}
		}
	]).then(function(input) {
	
		if (input.option ==='sale') {
			displayInventory();
		} else if (input.option === 'lowInventory') {
			viewLowInventory();
		} else if (input.option === 'addInventory') {
			addInventory();
		} else if (input.option === 'newProduct') {
			createNewProduct();
		} else {
			console.log('ERROR: Invalid, choose again plase!');
			initiateBamazon();
		}
	})
}

function displayInventory() {
	
	queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Products Listed Below: ');
		console.log('-----------------------------------\n');

		var stockList = '';
		for (var i = 0; i < data.length; i++) {
			stockList = '';
			stockList += 'Item ID: ' + data[i].item_id + '  ||  ';
			stockList += 'Product Name: ' + data[i].product_name + '  ||  ';
			stockList += 'Department Name: ' + data[i].department_name + '  ||  ';
			stockList += 'Price: $' + data[i].price + '  ||  ';
			stockList += 'Quantity: ' + data[i].stock_quantity + '\n';

			console.log(stockList);
		}

	  	console.log("---------------------------------------------------------------------\n");

		connection.end();
	})
}

function viewLowInventory() {
	
	queryStr = 'SELECT * FROM products WHERE stock_quantity < 5';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Low Inventory Items (below 5): ');
		console.log('---------------------------------\n');

		var stockList = '';
		for (var i = 0; i < data.length; i++) {
			stockList = '';
			stockList += 'Item ID: ' + data[i].item_id + '  ||  ';
			stockList += 'Product Name: ' + data[i].product_name + '  ||  ';
			stockList += 'Department: ' + data[i].department_name + '  ||  ';
			stockList += 'Price: $' + data[i].price + '  ||  ';
			stockList += 'Quantity: ' + data[i].stock_quantity + '\n';

			console.log(stockList);
		}

	  	console.log("---------------------------------------------------------------------\n");

		connection.end();
	})
}

function checkSelection(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a positive, valid number. Thank you!';
	}
}

function validateNumeric(value) {
	var number = (typeof parseFloat(value)) === 'number';
	var positive = parseFloat(value) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Please enter a positive, valid number. Thank you!'
	}
}

function addInventory() {
	
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID:',
			validate: checkSelection,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to add?',
			validate: checkSelection,
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var addQ = input.quantity;

		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				addInventory();

			} else {
				var productData = data[0];

				console.log('Updating Inventory...');

				var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQ) + ' WHERE item_id = ' + item;
				
				connection.query(updateQueryStr, function(err, data) {
					if (err) throw err;

					console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQ) + '.');
					console.log("\n---------------------------------------------------------------------\n");

					connection.end();
				})
			}
		})
	})
}

function createNewProduct() {
	
	inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
			message: 'Please enter the new product name.',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'Which department does the new product belong to?',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the unit price?',
			validate: validateNumeric
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items are currently in stock?',
			validate: checkSelection
		}
	]).then(function(input) {

		console.log('Adding New Item to Inventory: \n    product_name = ' + input.product_name + '\n' +  
									   '    department_name = ' + input.department_name + '\n' +  
									   '    price = ' + input.price + '\n' +  
									   '    stock_quantity = ' + input.stock_quantity);

		var queryStr = 'INSERT INTO products SET ?';

		connection.query(queryStr, input, function (error, results, fields) {
			if (error) throw error;

			console.log('New product has been added to the inventory under Item ID ' + results.insertId + '.');
			console.log("\n---------------------------------------------------------------------\n");

			connection.end();
		});
	})
}

function initiateBamazon() {

	displayActions();
}

initiateBamazon();