var projectsView = {};

projectsView.handleMainNav = function() {
  $('.main-nav').on('click', '.hamburger-li', function(e) {
    e.preventDefault();
    $('.page-content').hide();
    $('[id="' + $(this).attr('data-content') + '"]').show();
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
