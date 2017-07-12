// $().ready(function() {

// });
var paths = [];
function makeActive(id) {
	$('#homeTab').prop('class', '');
	$('#usersTab').prop('class', '');
	$('#vendorsTab').prop('class', '');
	$('#productsTab').prop('class', '');
	$('#requestsTab').prop('class', '');
	$('#reviewTab').prop('class', '');
	$('#aboutTab').prop('class', '');
	$('#loginTab').prop('class', '');
	
	switch(id) {
		case 1:
			$('#homeTab').prop('class', 'active');
			break;
		case 2:
			$('#usersTab').prop('class', 'active');
			break;
		case 3:
			$('#vendorsTab').prop('class', 'active');
			break;
		case 4:
			$('#productsTab').prop('class', 'active');
			break;
		case 5:
			$('#requestsTab').prop('class', 'active');
			break;
		case 6:
			$('#reviewTab').prop('class', 'active');
			break;
		case 7:
			$('#aboutTab').prop('class', 'active');
			break;
		case 8:
			$('#loginTab').prop('class', 'active');
	}
}

function clearLoginInputs() {
	$('#login-username').val('');
	$('#login-password').val('');
}