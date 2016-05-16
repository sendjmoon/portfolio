var projectsView = {};

projectsView.handleMainNav = function() {
  $('.hamburger-li').hover(function() {
    var $hoverData = $(this).attr('data-content');
    $('.display-link').toggleClass('show-link');
    $('.display-link').text($hoverData);
  });
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


$(document).ready(function() {
  projectsView.handleMainNav();
  $('.hamburger-icon').click(function() {
    $('.hamburger-menu').toggleClass('expand');
  });
});
