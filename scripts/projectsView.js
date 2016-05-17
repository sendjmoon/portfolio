var projectsView = {};

//when < 640px: selected nav item will display it's data content
//when > 640px: hover will display hovered link's data content
projectsView.handleMainNav = function() {
  $('.hamburger-li').hover(function() {
    var $hoverData = $(this).attr('data-content');
    $('.display-link').toggleClass('show-link');
    $('.display-link').text($hoverData);
  });

  //changes content displayed on the page based on the selected list item's data content
  $('.main-nav').on('click', '.hamburger-li', function(e) {
    e.preventDefault();
    $('.page-content').hide();
    var $clickEvent = $(this);
    console.log($clickEvent);
    $('[id="' + $clickEvent.attr('data-content') + '"]').show();
    $('.hamburger-menu').removeClass('expand');
  });
  $('.main-nav .hamburger-li:first').click();
};

//when < 640px: menu shows up when hamburger menu is clicked
$(document).ready(function() {
  projectsView.handleMainNav();
  $('.hamburger-icon').click(function() {
    $('.hamburger-menu').toggleClass('expand');
  });
});
