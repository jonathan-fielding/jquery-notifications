jQuery Notifications
====================

For a while now chrome has had the ability to show notifications from tabs you have open, this is through taking advantage of the new Notifications api and it is used by some of google's services including gmail.

With the launch of Mountain Lion, Apple has leapfrogged this feature by making it so that notifications show at an operating system level within notification centre, however after testing some of the code people have written for chrome I found things were not working as I expected, also I felt that older browsers were being left out of the notification party so the aim of this project is to provide a standard way to implement notifications across browsers.

Planned Browser Support:

* Safari 6 - Native Notifications
* Chrome 4+ - Native Notifications (only tested in latest version however the API was introduced in Chrome 4)
* Safari iOS 5 - Window based polyfill
* Firefox - Window based polyfill
* Internet explorer - Window based polyfill
* Opera - Window based polyfill
* Getting started:

There are two ways you can get permission to show notifications to your users, the notificationPrompt provides the best cross browser experience

$.notifications.notificationPrompt() - provides an overlay which tells the user about notifications, upon closing it the browser permissions prompt is shown
$.notifications.requestPermission() - triggers the browser permissions prompt, in chrome this must be triggered by a user click action
Once you have permission you can simply create a notification using $.notifications.newNotification('icon.png','title','content'), this returns a notification object

The returned object has the following:

* .show() - shows the notification
* .onclick: - callback to run code if user clicks on the notification (so if user clicks you can take them to a page about that notification)
* .onclose: - callback to run code after notification has gone
* .ondisplay: - callback to run code when notification is shown
* .onerror: - callback to handle any errors
* .onshow: -
* 
© Copyright Jonathan Fielding