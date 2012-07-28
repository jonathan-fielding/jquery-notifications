// jQuery Notifications v1.0
// A easy way to use notifications across browsers
// by Jonathan Fielding

(function( $ ){

  $.notifications = function() {  

    var settings = {
	};

    var checkNotifications = function(native, polyfill) {
    	if (window.webkitNotifications) {
    		return native();
    	}
    	else {
    		return polyfill();
    	}
    };
    
    var notificationPrompt = function(){
    	if(!nativeCheckPermissions()){
	    	$('body').append('<div class="ntfy_overlay"></div><div class="ntfy_request"><p>This website would like to display desktop notifications, your browser will now ask your permission</p> <a href="#">close</a></div>');
	    	$('.ntfy_request a,.ntfy_overlay').click(function(){
	    		nativeRequestPermissions()
	    		$('.ntfy_request, .ntfy_overlay').remove();
	    	});
    	}
    };
    
    var nativeRequestPermissions = function(callback){
    	if(!nativeCheckPermissions()){
	    	webkitNotifications.requestPermission(function(){});
		}
    };
    
    var nativeCheckPermissions = function(){
    	var permission = false;
    	 
    	if(webkitNotifications.checkPermission() === 0){
    		permission = true;
    	}
    	    	
    	return permission;
    };
    
    var nativeNotification = function(icon, title, content){
    	if(nativeCheckPermissions()){
	    	var notify = window.webkitNotifications.createNotification(icon, title, content);
	    	return notify;
    	}
    	else{
    		return false;
    	}
    };
    
    return {
    	requestPermission: function(callback){
    		return checkNotifications(nativeRequestPermissions, function(){})
    	},
    	newNotification: function(icon, title, content){
    		return checkNotifications(function(){
    			return nativeNotification(icon, title, content);
    		},function(){});
    	},
    	checkPermission: nativeCheckPermissions,
    	notificationPrompt : notificationPrompt
    };

  }();
})( jQuery );


//webkitNotifications.requestPermission(function(){});