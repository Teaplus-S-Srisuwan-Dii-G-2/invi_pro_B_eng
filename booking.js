var fs = require('fs');
var bookings = new Map();

loadBooking = async () => {
    fs.readFile('booking.txt', await function (err, filedata) {
        if (err) throw err;
        let booking_data = filedata.toString();
        let booking_lines = booking_data.split('\n');

        booking_lines.forEach((line) => {
            let dat = line.split(',');
            bookings.set(dat[0], [dat[1], dat[2], dat[3]])
            // console.log('dat',dat)
        })

        bookings.forEach((value, key) => {
            console.log('Booking: ' + key + ' Customer: ' + value[0] + ' Checkin: ' + value[1] + ' Checkout: ' + value[2])
        })
    });
}

saveBooking = () => {
    let buffer = '';
    bookings.forEach((value, key) => {
        if (key)
            buffer += key + " " + value + '\n';
    });
    fs.writeFile('booking.txt', buffer, function (err) {
        if (err) throw err;
    });
}

create_booking = (room_id, customer_id, checkin_date, checkout_date) => {
    bookings.set(bookings.size + 1, [room_id, customer_id, checkin_date, checkout_date])
    saveBooking()
    return `[${room_id} ${customer_id} ${checkin_date} ${checkout_date}]`
}

module.exports = {
    loadBooking: loadBooking,
    create_booking: create_booking
};