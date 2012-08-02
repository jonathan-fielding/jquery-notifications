/* Author:

*/$(document).ready(function(){$("#example1").on("click",function(){$.notifications.requestPermission(function(){$.notifications.newNotification("img/logo.png","title","content").show()});return!1});$("#example2").on("click",function(){$.notifications.requestPermission(function(){$.notifications.newNotification("img/logo.png","title","content").show()});return!1})});