(function(module) {
  var projectsController = {};

  Project.createTable();

  projectsController.index = function() {
    if ($('#projects article').length === 0) {
      Project.fetchAll(projectsView.initProjectContent);
    };
    $('#projects').show().siblings().hide();
  };

  module.projectsController = projectsController;
})(window);
