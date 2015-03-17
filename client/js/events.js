define(["client"],function(client){

	var socket = io.connect('http://192.168.1.90:8080');
	
	changeNick = function(){
					alert(client.nickname+' really suits you, please please dont change');
				};

	$("#submit").on("click",preSend);

	$("#chatInput").on("keydown",function(e){
        if ((e.keyCode == 32) && e.ctrlKey)
        {
            preSend();
        }

	});

	function preSend(){
		var list = $("<li>");
		var nick = client.nickname;
		var msg = $("#chatInput").val().replace(/\r\n|\r|\n/g,"<br />");

		//msg.replace(/\r\n|\r|\n/g,"<br />")
		var message="<b>"+nick+"</b>: "+msg;
		var chat = $("<span>").html(message);
		list.attr("style","text-align:right");
		chat.attr("style","background-color:#f9fb91");
		list.append(chat);
//	list.wrapInner("<b>"+client.nickname+"</b>: ");
		$("#ChatPane").append(list);
		$("#chatInput").val("");
		$('.emoticons').emoticonize();
		socket.emit("messageOut",{name:nick,text:msg});	
		$('#ChatContainer').animate({"scrollTop": $('#ChatContainer')[0].scrollHeight}, "slow");
	}
	window.changeNick = changeNick;
});