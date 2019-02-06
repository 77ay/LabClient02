var net = require('net')
var HOST = '127.0.0.1'
var PORT = 7777
var count = 0
var client = new net.Socket()
client.connect(PORT, HOST, function() {
    console.log('Connected To: '+HOST+' : '+PORT)
    client.write('Connect')
})

client.on('data', function(data) {
    console.log('Server >> '+data)
    if(count == 0){
        client.write('10')
    }
    else if(count == 1){
        client.write('20')
    }
    else{
        client.destroy()
    }
    count++
})

client.on('close', function() {
    console.log('Disconnected')
})