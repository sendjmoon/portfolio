//IFFE
(function(module) {
  //blank object
  var projectsView = {};

  //when < 640px: selected nav item will display it's data content
  //when > 640px: hover will display hovered link's data content
  projectsView.handleMainNav = function() {
    //calls a function when one of the hamburger-li elements is hovered over
    $('.hamburger-li').hover(function() {
      var $hoverData = $(this).attr('data-content');
      //toggles the class to show the link's name when an icon is hovered over
      $('.display-link').toggleClass('show-link');
      $('.display-link').text($hoverData);
    });

    //changes content displayed on the page based on the selected list item's data content
    $('.main-nav').on('click', '.hamburger-li', function(e) {
      e.preventDefault();
      //hides class of page content
      $('.page-content').hide();
      //assigns clickevent variable to what is clicked by the user
      var $clickEvent = $(this);
      console.log($clickEvent);
      //shows the item of whatever data-content matches with the clicked element
      $('[id="' + $clickEvent.attr('data-content') + '"]').show();
      //hides the hamburger menu after a link is selected
      $('.hamburger-menu').removeClass('expand');
      projectsView.handleTeasers();
    });
    //shows the first nav item's content when the page first loads
    $('.main-nav .hamburger-li:first').click();
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
    console.log($('.article-body'));
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a:eq(1)', function(e){
      e.preventDefault();
      console.log('project container click event ran');
      $($(this).parent().children('.article-body')).children().fadeIn('fast');
      $(this).hide();
    });
  };

  //appends project data to the DOM
  projectsView.initProjectContent = function() {
    //iterates through each element in the projects array
    Project.all.forEach(function (data) {
      //appends the elements in the array to the projects element and uses the article-template
      $('#projects').append(data.toHtml($('#article-template')));
      if($('#course-filter option:contains("' + data.course + '")').length === 0) {
        $('#course-filter').append(data.toHtml($('#filter-template')));
      };
    });
    projectsView.handleTeasers();
  };


  //when < 640px: menu shows up when hamburger menu is clicked
  $(document).ready(function() {
    projectsView.handleMainNav();
<<<<<<< HEAD
    projectsView.handleCourseFilter();
=======
    //if the hamburger menu icon is clicked it will run what is below
>>>>>>> d30cc6f5cf39a4228bc3b943b03889bca4d62b30
    $('.hamburger-icon').click(function() {
      //shows the hamburger menu items after the icon is clicked
      $('.hamburger-menu').toggleClass('expand');
    });
  });

  //makes instances of projectView available
  module.projectsView = projectsView;
})(window);
