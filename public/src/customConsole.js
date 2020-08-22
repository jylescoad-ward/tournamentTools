import $ from 'jquery';

global.console.div = function(message) {

    var length = 6;
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
    	retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    console.log(message);

    $(`<span id="out-${retVal}">${message}</span><br>`).hide().appendTo("#tourn-consoleout");

    $(`#out-${retVal}`).fadeIn("fast");

    delete(length,charset,retVal);
};
