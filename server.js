var net = require('net')
var HOST = '127.0.0.1'
var PORT = 7777
var count = 0
var triAngel = {
    name : '',
    base : 0,
    high : 0,
    area : 0
}

net.createServer(function(sock) {
    console.log('Connected: '+sock.remoteAddress+' : '+sock.remotePort)
    sock.on('data',function(data){
        console.log('Client >> '+sock.remoteAddress+' : '+data)
        if(data == 'Connect'){
            triAngel.name = data
            sock.write('GetBase') 
        }
        else if(count == 1){
            triAngel.base = data
            sock.write('GetHigh') 
        }
        else if(count ==2){
            triAngel.high = data
            triAngel.area = +triAngel.base * +triAngel.high * 0.5
            sock.write('Area = '+triAngel.area) 
        }
        count++

    })
    sock.on('close ',function(data){
        console.log('Closed: '+sock.remoteAddress+' '+sock.remotePort)
    })
}).listen(PORT, HOST)

console.log('Server listening on '+HOST+' : '+PORT)