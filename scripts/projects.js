// IIFE!!!!!!!!
(function(module) {

  //constructor to build Project objects
  function Project (obj) {
    for (property in obj) {
      this[property] = obj[property];
    }
  };

  //empty array to hold Project objects that will append to the DOM
  Project.all = [];

  //function to use handlebars for the template
  Project.prototype.toHtml = function(scriptTemplateId) {
    var $source = $(scriptTemplateId).text();
    var template = Handlebars.compile($source);
    return template(this);
  };

  //function to populate the project array
  Project.loadAll = function (dataPassedIn) {
    Project.all = dataPassedIn.map(function(obj) {
      return new Project(obj);
    });
  };

  //function to get data from .json file, stores into localStorage
  Project.getAll = function(next) {
    $.getJSON('data/projectsList.json', function(responseData) {
      Project.loadAll(responseData);
      localStorage.localData = JSON.stringify(responseData);
      next();
    });
  };

  //function to get and set data based of conditions, also accepts function as an argument
  Project.fetchAll = function(next) {
    if (localStorage.localData) {
      $.ajax({
        type: 'HEAD',
        url: 'data/projectsList.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (eTag !== localStorage.eTag || !localStorage.eTag) {
            console.log('before' + eTag);
            eTag = localStorage.eTag;
            console.log('after' + eTag);
            Project.getAll(next);
          } else {
            Project.loadAll(JSON.parse(localStorage.localData));
            next();
          }
        }
      });
    } else {
      Project.getAll(next);
    }
  };

  //returns an array of what courses are associated with the projects. displays unique, no repeats
  Project.allCourses = function() {
    return Project.all.map(function(obj) {
      return obj.course;
    }).reduce(function(acc, cur) {
      if (acc.indexOf(cur) === -1) {
        console.log(cur);
        acc.push(cur);
      }
      return acc;
    }, []);
  };

  //Project is now a property of module to where any method of Project can be used
  module.Project = Project;
})(window);
