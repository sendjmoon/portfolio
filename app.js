$(document).ready(function() {
  $('.hamburger-icon').click(function() {
    $('.hamburger-menu').toggleClass('expand');
  });
});

var appendProjects = [];

var allProjects = [{
  title: 'About Me Project',
  projectUrl: 'https://github.com/sendjmoon/about-me',
  publishedOn: 'April 18, 2016',
  imageUrl: '<img src="images/stormtrooper-hd-bg.jpg"></img>',
  body: '<p> Lucas ipsum dolor sit amet carnor tib fode nautolan bail obi-wan darpa bothawui abyssin skywalker. Nute rendar antilles arvel katarn saleucami. Lepi kel orus karrde ansionian. Shistavanen bossk vader quarren veila gwurran dunwell jax. Wol jarael gran r5-d4 anx calrissian. Lahara jamillia mace nar r2-d2 boba senesca. Terrik asajj gank carlist keshiri oola taun skywalker derlin. Bria whiphid amedda kit. Wessell tierce gen\'dai chewbacca rex xappyh leia offee zev. Ahsoka wicket panaka nautolan nute oswaft jax c-3p0. </p>'
}];

function Project(obj) {
  this.title = obj.title;
  this.publishedOn = obj.publishedOn;
  this.imageUrl = obj.imageUrl;
  this.projectUrl = obj.projectUrl;
  this.body = obj.body;
}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();

  $newProject.find('h1').html(this.title);
  $newProject.find('.project-link').attr('href', this.projectUrl);
  $newProject.find('.project-link').text('Click me to view the Project!');
  $newProject.find('.publish-date').html(this.publishedOn);
  $newProject.find('.article-image').html(this.imageUrl);
  $newProject.find('.article-body').html(this.body);

  return $newProject;
};

//followed same code provided from pair programming in today's lab
allProjects.forEach(function(obj) {
  appendProjects.push(new Project(obj));
});

appendProjects.forEach(function(obj) {
  $('#articles').append(obj.toHtml());
});
