define(function(){

	$(document).ready(function(){
		nickname = prompt("Choose your nickname");	
		$("#panal--nick").html("<b>Hello "+nickname+"</b>");
     	var emoji = ":-) :-) :) :o) :c) :^) :-D :-( :-9 ;-) :-P :-p :-Þ :-b :-O :-/ :-X :-# :'( B-) 8-) :-\\ ;*( :-* :] :> =] =) 8) :} :D 8D XD xD =D :( :< :[ :{ =( ;) ;] ;D :P :p =P =p :b :Þ :O 8O :/ =/ :S :# :X B) O:) <3 ;( >:) >;) >:( O_o O_O o_o 0_o T_T ^_^ ?-) [+=..] ";
     //   $('.emoticons').emoticonize();
     	$('#pop').webuiPopover({
	     		title: 'Available emoticons',
	        	content:'<div class="emoticons">'+ emoji +'</div>',
	        	constrains: 'vertical',
        }).on('click',function(){
        		$('.emoticons').emoticonize();
        });

	});

	socket = io.connect('http://192.168.1.90:8080');
	socket.emit('join',nickname);

	socket.on("AddMessage",function(data){
			var list = $("<li>");
			var chat = $("<span>").html("<b>"+data.name+"</b>: "+data.text);
			list.append(chat);

			$("#ChatPane").append(list);
			$('.emoticons').emoticonize();
			$('#ChatContainer').animate({"scrollTop": $('#ChatContainer')[0].scrollHeight}, "slow");
		});

	socket.on("addUser",function(data){
			var list = $("<li>");
			var uList = list.text(data);
			$("#UserPane").append(uList);
			var msg = $("<span>").html("<span style='color:green;'>"+data+" Joined the chat </span>");
			var joinMsg = $("<li>").append(msg);
			joinMsg.attr("style","text-align:center");
			$("#ChatPane").append(joinMsg);

	});

	socket.on("addAllUsers",function(data){
		console.log(data);
			for(var i in data)
			{
				var list = $("<li>");
				var uList = list.text(data[i]);
				$("#UserPane").append(uList);				
			}
	});	

	socket.on("addAllMessage",function(data){
			for(var i in data)
			{
				var list = $("<li>");
			if(data[i].name !== null)
				 chat = $("<span>").html("<b>"+data[i].name+"</b>: "+data[i].text);
			else
			{
				 chat = $("<span>").html(data[i].text);
				list.attr("style","text-align:center");				
			}

				list.append(chat);
				$("#ChatPane").append(list);				
			}
			$('.emoticons').emoticonize();	
			$('#ChatContainer').animate({"scrollTop": $('#ChatContainer')[0].scrollHeight}, "slow");					
	});	

	socket.on("removeUser",function(Nick){
			var listItems = $("#UserPane li");
			listItems.each(function(data) {
			    if($(this).html() == Nick)
			    	$(this).remove();
			    console.log(Nick);
			});		

			var msg = $("<span>").html("<span style='color:red;'>"+Nick+" Left the chat </span>");
			var removalMsg = $("<li>").append(msg);
			removalMsg.attr("style","text-align:center");
			$("#ChatPane").append(removalMsg);
			// socket.emit("messageOut",{name:null,text:removalMsg});
	});	

	 return {
		nickname: nickname,
		clogs: function(){
					console.log("User "+nickname+" joined!");
				}
	};
 
});



