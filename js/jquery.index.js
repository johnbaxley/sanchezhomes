$(document).ready(function($) { 
// do stuff to show seleced projects
 showSelected(); 

 $(window).resize(function(){
 positionAbsolute();
 });

 // initialise history plugin
 $.history.init(history);

 // replace all hrefs with hashed urls for history plugin
 $('a[rel*=popup]').each( function() {
 var anchor = $(this).attr('href').replace(/http:\/\/(www.)*toko.nu\//, '').replace(/(.*).html/, '#$1');
 $(this).attr('href', anchor);
 });

 // collapse/expand short projects
 $('.short img').click( function(){
 $('.active').removeClass('active');
 var postHeight = $(this).parent().height();
 if (postHeight > 42) {
 $(this).parent().animate({height: 42}, 'normal');
 } else {
 $(this).parent().animate({height: 367}, 'normal');
 }
 });

 // collapse/expand long projects
 $('.long img').click( function(){
 $('.active').removeClass('active');
 var postHeight = $(this).parent().height();

 if (postHeight > 42) {
 $(this).parent().animate({height: 42}, 'normal');
 } else {
 $(this).parent().animate({height: 367}, 'normal');
 }
 });

 // show selected projects
 $('#show-selected').click( function() {
 $.cookie("showselected", "true");
 showSelected();
 return false;
 });
 $('#navigation a:not(#show-selected)').click(function() {
 $.cookie("showselected", null);
 });

 // show all projects
 $('#show-all').click( function() {
 $('html, body').animate({scrollTop:0}, 'normal');
 $('.active').removeClass('active');
 $(this).addClass('active');
 $('.eachpost.short').animate({height: 270}, 'normal');
 $('.eachpost.long').animate({height: 360}, 'normal');
 return false;
 });
 // CONTENT

 // set scroll to position popup
 $('body.level1 a[rel*=popup]').click( function() {
 $.cookie("scrollFromTop", $(window).scrollTop(), { expires: .5} );
 return false;
 });

 // to open popup
 $('a[rel*=popup]').click( function() {
 var hash = this.href;
 hash = hash.replace(/^.*#/, '');
 $.history.load(hash);
 return false;
 });

// to close popup
 $('a.close, #popup_overlay, #pop-column2').click(function() {
 $.history.load('');
 return false;
 });

});

// Cookies for selected projects
function showSelected() {
 if ($.cookie("showselected") == 'true') {
 $.cookie("scrollFromTop", 0);
 $('html, body').animate({scrollTop:0}, 'normal');
 $('.active').removeClass('active');
 $('#show-selected').addClass('active');
 $('.eachpost:not(.selected)').animate({height: 15}, 'normal');
 $('.selected.short').animate({height: 270}, 'normal');
 $('.selected.long').animate({height: 360}, 'normal');
 }
};

// load the correct stuff into history
function history(hash) {
 if (hash) {
 // restore ajax loaded state
 if($.browser.msie) {
 // jquery's $.load() function does't work when hash include special characters like aao.
 hash = encodeURIComponent(hash);
 }
 bodyHeight();
 $('div#popup_overlay:hidden').fadeIn('fast');
 $('div#popup:hidden').load(hash+".html", function() {
 $('div#popup').fadeIn('fast', function(){
 positionAbsolute();
 });
 $('html, body').animate({scrollTop:0}, 'normal');
 });

 $('div#popup:visible').fadeOut('fast', function() {
 $('div#popup').load(hash+".html", function() {
 $('div#popup:hidden').fadeIn('fast');
 $('html, body').animate({scrollTop:0}, 'normal');
 });
 });
 } else {
 // start page
 $('html, body').animate({scrollTop: $.cookie('scrollFromTop')}, 'normal');
 $('body').css('overflow', 'visible');
 $('body').height('auto');
 $('div#popup_overlay, div#popup').fadeOut('slow', function(){
 $('div#popup').empty();
 });
 }
}

function bodyHeight() {
 var bodyHeight = $('body').height();
 var windowHeight = $(window).height();
 var popupHeight = $('#popup:visible').height();

 if (popupHeight < bodyHeight) {
 $('body').css('overflow', 'hidden');
 $('body').height(windowHeight);
 } else {
 $('body').css('overflow', 'visible');
 $('body').height('auto');
 }
};

// make col1 position absolute if the window is too small
function positionAbsolute() {
 var col1Height = $('div#pop-column1').height();
 var viewerHeight = $(window).height();

 if ((col1Height + 50) > viewerHeight) {
 $('div#pop-column1').css('position', 'absolute');
 } else {
 $('div#pop-column1').css('position', 'fixed');
 }
}