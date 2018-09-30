const Discord = require('discord.js');
const client = new Discord.Client();
var http = require('http'); 

// 2. http 모듈로 서버를 생성한다.
//    아래와 같이 작성하면 서버를 생성한 후, 사용자로 부터 http 요청이 들어오면 function 블럭내부의 코드를 실행해서 응답한다.


const confix = ",,";

var room = {};
var user = {};

function Get_token(length){
    //edit the token allowed characters
    var a = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

client.on('ready', () => {
	console.log(`${client.user.username}이 ${client.guilds.size}개의 서버에서 활동 중 입니다.`);
	client.user.setActivity(`,,help|${client.guilds.size}:서버`);
});
client.on('message', msg => {
	if(msg.content==confix+"입장"){
		var find = false;
		var keys = Object.keys(user);

		for(var i=0;i<keys.length;i++){
			if(user[keys[i]]==null){
				msg.author.send("랜챗 상대를 찾았습니다.\n봇에게 챗을 보내면 랜챗 상대한테 전송됩니다.`,,나가기`로 나갈 수 있습니다.\n------------------------------------");
				room[keys[i]] = msg.author.id;
				room[msg.author.id] = keys[i];
				client.users.get(keys[i]).send("랜챗 상대를 찾았습니다.\n봇에게 챗을 보내면 랜챗 상대한테 전송됩니다.`,,나가기`로 나갈 수 있습니다.\n------------------------------------");
				delete user[keys[i]];
				find = true;
				break;
			}
		}

		if(find == false){
			msg.author.send("랜챗 방 생성 >> 랜챗유저 기다리는 중");
			user[msg.author.id] = null;
		}
		console.log(user);
		console.log(room);	
	}
	else if(msg.content == confix+"나가기"){
		msg.author.send("------------------------------------\n랜챗을 나가셨습니다");
		if(user[msg.author.id]){
			delete user[msg.author.id];
		}else{
			if(room[msg.author.id]){
				client.users.get(room[msg.author.id]).send("------------------------------------\n랜챗을 나가셨습니다.");
				delete room[msg.author.id];
				if(room[room[msg.author.id]]){
					delete room[room[msg.author.id]];
				}
			}
			
			
		}

	}
	else if(msg.content == confix+"help"){
		msg.channel.send("DM으로 전송 했습니다.");
		msg.author.send("```\n,,help // 명령어를 알수 있습니다\n"+
						",,입장 // 랜챗에 입장이 가능합니다.\n"+
						",,나가기 // 랜챗을 나갈 수 있습니다.\n```"+
						"개발자 채널 : https://discord.gg/TrWYhpt"
						);
	}
	else if(msg.channel.type == "dm"){
		if(room[msg.author.id]){
			client.users.get(room[msg.author.id]).send("낯선 상대 : "+msg.content);
		}
	}

});



client.login(process.env.token);
var server = http.createServer(function(request,response){ 

    response.writeHead(200,{'Content-Type':'text/html'});
    response.end('랜챗봇입니다!');

});

// 3. listen 함수로 8080 포트를 가진 서버를 실행한다. 서버가 실행된 것을 콘솔창에서 확인하기 위해 'Server is running...' 로그를 출력한다
server.listen(process.env.PORT || 3000,"0.0.0.0", function(){ 
    console.log('Server is running...');
});
