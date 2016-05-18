(function(module) {
  function Project (obj) {
    for (property in obj) {
      this[property] = obj[property];
    }
  };

  Project.all = [];

  Project.prototype.toHtml = function() {
    var $source = $('#article-template').html();
    var template = Handlebars.compile($source);
    return template(this);
  };

  Project.loadAll = function (dataPassedIn) {
    // dataPassedIn.forEach(function(obj) {
    //   Project.all.push(new Project(obj));
    // });
    Project.all = dataPassedIn.map(function(obj) {
      return new Project(obj);
    });
  };

  Project.getAll = function(next) {
    $.getJSON('data/projectsList.json', function(responseData) {
      Project.loadAll(responseData);
      localStorage.localData = JSON.stringify(responseData);
      next();
    });
  };

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
    //   console.log('localStorage exists');
    //   var localData = localStorage.getItem('localData');
    //   Project.loadAll(JSON.parse(localData));
    //   projectsView.initProjectContent();
    // } else {
    //   $.getJSON('data/projectsList.json', function(data) {
    //     console.log(data);
    //     Project.loadAll(data);
    //     localStorage.setItem('localData', JSON.stringify(Project.all));
    //     projectsView.initProjectContent();
    //   });
    // };
  };

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

  module.Project = Project;
})(window);
