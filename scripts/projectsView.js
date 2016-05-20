(function(module) {
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

  projectsView.handleCourseFilter = function() {
    $('#course-filter').on('change', function() {
      if($(this).val()) {
        $('.project-container').hide();
        $('.project-container[data-category="' + $(this).val() + '"]').fadeIn('fast');
      } else {
        $('.project-container').fadeIn('fast');
      }
    });
  };

  //appends project data to the DOM
  projectsView.initProjectContent = function() {
    Project.all.forEach(function (data) {
      $('#projects').append(data.toHtml($('#article-template')));
      if($('#course-filter option:contains("' + data.course + '")').length === 0) {
        $('#course-filter').append(data.toHtml($('#filter-template')));
      };
    });
  };


  //when < 640px: menu shows up when hamburger menu is clicked
  $(document).ready(function() {
    projectsView.handleMainNav();
    projectsView.handleCourseFilter();
    $('.hamburger-icon').click(function() {
      $('.hamburger-menu').toggleClass('expand');
    });
  });

  module.projectsView = projectsView;
})(window);
