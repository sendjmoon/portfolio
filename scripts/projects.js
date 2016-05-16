var appendProjects = [];

function Project(obj) {
  this.title = obj.title;
  this.publishedOn = obj.publishedOn;
  this.imageUrl = obj.imageUrl;
  this.projectUrl = obj.projectUrl;
  this.body = obj.body;
}

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

//followed same code provided from pair programming in today's lab
allProjects.forEach(function(obj) {
  appendProjects.push(new Project(obj));
});

appendProjects.forEach(function(obj) {
  $('#projects').append(obj.toHtml());
});
