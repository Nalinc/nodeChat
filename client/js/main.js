require(["client","jQuery","events","emoticons","popover"],function(client){

	console.log(client.nickname);
	client.clogs();
});



require.config({
	paths:{
		'jQuery':'lib/jquery-1.11.1.min',
		'emoticons':'lib/jquery.cssemoticons.min',
		'popover':'lib/jquery.webui-popover'
	},
	shim:{
		'client':{
			deps:['jQuery','popover'],
			exports: 'client'
		},
		'events':{
			deps:['jQuery','client']
		},
		'emoticons':{
			deps:['jQuery']
		},
		'popover':{
			deps:['jQuery','emoticons']
		}
	}


});