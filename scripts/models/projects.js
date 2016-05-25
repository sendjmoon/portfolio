function Project (obj) {
  for (properties in obj) {
    this[properties] = obj[properties];
  }
};

Project.all = [];

Project.prototype.toHtml = function() {
  var $source = $('#article-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

Project.populateAll = function (dataPassedIn) {
  dataPassedIn.forEach(function(obj) {
    Project.all.push(new Project(obj));
  });
};

Project.getAll = function() {
  if (localStorage.localData) {
    console.log('localStorage exists');
    var localData = localStorage.getItem('localData');
    Project.populateAll(JSON.parse(localData));
    projectsView.initProjectContent();
  } else {
    $.getJSON('data/projectsList.json', function(data) {
      console.log(data);
      Project.populateAll(data);
      localStorage.setItem('localData', JSON.stringify(Project.all));
      projectsView.initProjectContent();
    });
  };
};
