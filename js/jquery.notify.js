// jQuery Notifications v1.0
// A easy way to use notifications across browsers
// by Jonathan Fielding

(function( $ ){

  $.notifications = function() {  

    var default_settings = {
    	mobile_notifications : true
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
    
    
   	// Native Functionality
    var nativeRequestPermissions = function(callback){
    	if(!nativeCheckPermissions()){
	    	webkitNotifications.requestPermission(function(){});
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
    
    // Polyfill functionality
    var polyfillRequestPermissions = function(callback){
    	$('body').append('<div class="ntfy_overlay"></div><div class="ntfy_request"><p>This website would like to display desktop notifications, cookies are used to manage these preferences</p> <a href="#" class="allow">allow</a><a href="#" class="deny">deny</a></div>');
    	$('.ntfy_request').on('click','a',function() {
    		var $this = $(this);
    		
    		if($this.hasClass('allow')){
    			setData('permission','granted');
    		}
    		else if($this.hasClass('deny')){
    			setData('permission','denied');
    		}
    		
    		$('.ntfy_request, .ntfy_overlay').remove();
    	});	
    };
    
    var polyfillCheckPermissions = function(){
    	var permission = false;
    	 
    	if(getData('permission') === 'granted'){
    		permission = true;
    	}
    	
    	return permission;
    };
    
    var polyfillNotification = function(icon, title, content){
    	console.log(icon);
    	
    	if(icon === undefined || title === undefined || content === undefined){
    		console.error("TypeError: Not enough arguments");
    	}
    	else{
	    	if(polyfillCheckPermissions()){
	        	return {
	        		show: function(){
	        			var $ntfy_panel = $('.nfty_panel'), notification_id = "notify"+Math.floor(Math.random()*10000000);
	        			
	        			if($ntfy_panel.length === 0){
	        				$('body').append('<div class="nfty_panel"></div>');
	        				$ntfy_panel = $('.nfty_panel');
	        			}
	        			
	        			$ntfy_panel.append('<div class="ntfy_notification" id="'+notification_id+'"><p class="ntfy_title">'+ title + '</p><p class="ntfy_content">'+ content + '</p></div>');
	        		
	        			$ntfy_panel.find('.ntfy_notification').on('click',this.onclick);
	        			this.onshow();
	        			
	        		},
	        		onclick: function(){
	        			alert('test');
	        		},
	        		onclose: function(){
	        		},
	        		ondisplay: function(){
	        		},
	        		onerror: function(){
	        		},
	        		onshow: function(){
	        		}
	        	};
	    	}
	    	else{
	    		return false;
	    	}
    	}
    };
    
    //Store settings locally (cookies/local storage)
    
    var setData = function(name, value){
    	var exdate=new Date(), exdays = 365;
    	exdate.setDate(exdate.getDate() + exdays);
    	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    	document.cookie=name + "=" + value;
    };
    
    var getData = function(c_name){
		var i,x,y,ARRcookies=document.cookie.split(";");
		
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name)
			{
				return unescape(y);
			}
		}
    };
    
    return {
    	config: function(settings) {
    		
    	},
    	requestPermission: function(callback){
    		return checkNotifications(nativeRequestPermissions, polyfillRequestPermissions)
    	},
    	newNotification: function(icon, title, content){
    		return checkNotifications(function(){
    			return nativeNotification(icon, title, content);
    		},function(){});
    	},
    	checkPermission: nativeCheckPermissions,
    	notificationPrompt : notificationPrompt,
    	polyfillRequestPermissions: polyfillRequestPermissions,
    	polyfillNotification: polyfillNotification
    };

  }();
})( jQuery );


//webkitNotifications.requestPermission(function(){});