(function(module) {
  var projectsController = {};

  Project.createTable();

  projectsController.index = function() {
    Project.fetchAll(projectsView.initProjectContent);
  };

  module.projectsController = projectsController;
})(window);
