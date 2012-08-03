/* Author:

*/

$(document).ready(function(){
	$('#example1').on('click',function(){
		$.notifications.requestPermission(function(){
			var notify = $.notifications.newNotification('img/logo.png','title','content');
			if(notify !== false){
				notify.show();
			}
		});
		
		return false;
	});	
	
	$('#example2').on('click',function(){
		$.notifications.notificationPrompt();
		
		return false;
	});	
});


