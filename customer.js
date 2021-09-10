var fs = require('fs');
var customers = new Map();

loadCustomer = async() =>{
fs.readFile('customer.txt',await function (err, filedata) {
    if (err) throw err;

    let customer_data = filedata.toString();
    let customer_lines = customer_data.split('\n');

    customer_lines.forEach((line) => {
        let dat = line.split(',');
        customers.set(dat[0], [dat[1], dat[2], dat[3]])
        // console.log('dat',dat)
    })

    
    customers.forEach((value, key) => {
        console.log('Customer: ' + key + ' First name: ' + value[0] + ' Last name: ' + value[1] + ' Phone: ' + value[2])
    })


});

}

saveCustomer = () => {
    let buffer = '';
    customers.forEach((value, key) => {
        if(key)
            buffer += key + " " + value + '\n';
    });
    fs.writeFile('customer.txt', buffer, function(err) {
        if(err) throw err;
    });
}

customer_detail = (customer_id) => {
    if(customers.has(customer_id)) {
        return customers.get(customer_id);
    } else {
        throw 'Has no customer';
        return undefined
    }
}

create_customer = (customer_id, first_name, last_name, phone) => {
    customers.set(customers.size+1, [customer_id, first_name, last_name, phone])
    saveCustomer()
    return `[${customer_id} ${first_name} ${last_name} ${phone}]`
}


module.exports = {
    loadCustomer: loadCustomer,
    customer_detail: customer_detail,
    create_customer: create_customer 
};