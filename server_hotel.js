var http = require('http');
var url = require('url');

const {loadRoom,room_detail, create_room} = require('./room');
const {loadCustomer,customer_detail, create_customer} = require('./customer');
const {create_booking, booking_status} = require('./booking');

loadRoom();
loadCustomer();

//local host
http.createServer(function (req, res) {

    var request_path = url.parse(req.url, true);
    var message = '';
    var data;
    var status = 200;


    switch(request_path.pathname) {
        case '/room_detail':
            try {
                data = room_detail(request_path.query.room_id);
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/customer_detail':
            try {
                data = customer_detail(request_path.query.customer_id);
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/create_room':
            try {
                data = create_room(request_path.query.room_id, request_path.query.type, request_path.query.price);
                message += 'Created!!'
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/create_customer':
            try {
                data = create_customer(request_path.query.customer_id, request_path.query.first_name, request_path.query.last_name, request_path.query.phone);
                message += 'Created!!'
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/create_booking':
            try {
                data = create_booking(request_path.query.checkin_date, request_path.query.checkout_date, total_price);
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;

        case '/booking_status':
            try {
                data = booking_status(request_path.query.status);
            } catch(err) {
                message += err;
                console.log(err);
            }
            break;
    }

    let response_object = {
        statusCode: status,
        message: message,
        data: data
    };

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(response_object));

}).listen(8080);
console.log('Hotel application is running on port 8080.');