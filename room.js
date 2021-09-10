var fs = require('fs');
var rooms = new Map();

loadRoom = async() =>{
fs.readFile('room.txt',await function (err, filedata) {
    if (err) throw err;

    let room_data = filedata.toString();
    let room_lines = room_data.split('\n');

    room_lines.forEach((line) => {
        let dat = line.split(',');
        rooms.set(dat[0], [dat[1], dat[2]])
         console.log('dat',dat)
    })

    
    rooms.forEach((value, key) => {
        console.log('Room: ' + key + ' type: ' + value[0] + ' price: ' + value[1])
    })


});

}

saveRoom = () => {
    let buffer = '';
    rooms.forEach((value, key) => {
        if(key)
            buffer += key + " " + value + '\n';
    });
    fs.writeFile('room.txt', buffer, function(err) {
        if(err) throw err;
    });
}

room_detail = (room_id) => {
    if(rooms.has(room_id)) {
        return rooms.get(room_id);
    } else {
        throw 'Has no room';
        return undefined
    }
}

create_room = (room_id, type, price) => {
    rooms.set(rooms.size+1, [room_id, type, price])
    saveRoom()
    return `[${room_id} ${type} ${price}]`
}


module.exports = {
    loadRoom: loadRoom,
    room_detail: room_detail,
    create_room: create_room
};
loadRoom();