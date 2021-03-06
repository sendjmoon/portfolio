//IFFE
(function(module) {

  var projectsView = {};

  //when < 640px: selected nav item will display it's data content
  //when > 640px: hover will display hovered link's data content
  projectsView.showNavContent = function() {
    $('.hamburger-li').hover(function() {
      var $hoverData = $(this).attr('data-content');
      $('.display-link').toggleClass('show-link');
      $('.display-link').text($hoverData);
    });
  };

  //handles course filter
  projectsView.handleCourseFilter = function() {
    $('#course-filter').on('change', function() {
      if($(this).val()) {
        $('.project-container').hide();
        $('.project-container[data-category="' + $(this).val() + '"]').fadeIn('fast');
      } else {
        $('.project-container').fadeIn('fast');
      }
      projectsView.handleTeasers();
    });
  };

  projectsView.handleTeasers = function() {
    $('.read-more').show();
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a:eq(1)', function(e){
      e.preventDefault();
      $($(this).parent().children('.article-body')).children().fadeIn('fast');
      $(this).hide();
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
    projectsView.handleTeasers();
  };


  //when < 640px: menu shows up when hamburger menu is clicked
  $(document).ready(function() {
    projectsView.showNavContent();
    projectsView.handleCourseFilter();
    $('.hamburger-icon').click(function() {
      $('.hamburger-menu').toggleClass('expand');
    });
  });

  //makes instances of projectView available
  module.projectsView = projectsView;
})(window);
