function Project (obj) {
  for (properties in obj) {
    this[properties] = obj[properties];
  }
}
// function Project(obj) {
//   this.title = obj.title;
//   this.publishedOn = obj.publishedOn;
//   this.imageUrl = obj.imageUrl;
//   this.projectUrl = obj.projectUrl;
//   this.body = obj.body;
// }

Project.all = [];

Project.prototype.toHtml = function() {
  var $source = $('#article-template').html();
  var template = Handlebars.compile($source);
  // var $newProject = $('article.template').clone();
  //
  // $newProject.find('h1').html(this.title);
  // $newProject.find('.project-link').attr('href', this.projectUrl);
  // $newProject.find('.project-link').text('Click me to view the Project!');
  // $newProject.find('.publish-date').html(this.publishedOn);
  // $newProject.find('.article-image').html(this.imageUrl);
  // $newProject.find('.article-body').html(this.body);
  //
  // $newProject.removeClass('template');
  // $newProject.addClass('project-article');
  return template(this);
};

Project.populateAll = function (dataPassedIn) {
  dataPassedIn.forEach(function(obj) {
    Project.all.push(new Project(obj));
  });
  // appendProjects.forEach(function(obj) {
  //   $('#projects').append(obj.toHtml());
  // });
};

Project.getAll = function() {
  if (localStorage.localData) {
    console.log('localStorage exists');
    var localData = localStorage.getItem('localData');
    Project.populateAll(JSON.parse(localData));
    projectsView.initProjectContent();
  //add code here
  } else {
    $.getJSON('data/projectsList.json', function(data) {
      console.log(data);
      Project.populateAll(data);
      localStorage.setItem('localData', JSON.stringify(Project.all));
      projectsView.initProjectContent();
    });
  };
};
