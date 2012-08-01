/* Author:

*/

$(document).ready(function(){
	$('#example1').on('click',function(){
		$.notifications.requestPermission(function(){
			$.notifications.newNotification('img/logo.png','title','content').show();
		});
		
		return false;
	});	
	
});


