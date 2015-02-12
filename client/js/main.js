require(["client","jQuery","events","emoticons"],function(client){

	console.log(client.nickname);
	client.clogs();
});



require.config({
	paths:{
		'jQuery':'lib/jquery-1.11.1.min',
		'emoticons':'lib/jquery.cssemoticons.min'
	},
	shim:{
		'client':{
			deps:['jQuery'],
			exports: 'client'
		},
		'events':{
			deps:['jQuery','client']
		},
		'emoticons':{
			deps:['jQuery']
		}
	}


});