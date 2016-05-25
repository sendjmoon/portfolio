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

  Project.createTable = function(callback) {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS projects (' +
        'id INTEGER PRIMARY KEY, ' +
        'title VARCHAR(255) NOT NULL, ' +
        'projectUrl VARCHAR(255), ' +
        'publishedOn VARCHAR(255) NOT NULL, ' +
        'course VARCHAR(255) NOT NULL, ' +
        'imageUrl VARCHAR(255), ' +
        'body TEXT NOT NULL);',
      function() {
        console.log('Successfully setup the Projects table.');
        if (callback) callback();
      }
    );
  };

  Project.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO projects (title, projectUrl, publishedOn, course, imageUrl, body) VALUES (?, ?, ?, ?, ?, ?);',
          'data': [this.title, this.projectUrl, this.publishedOn, this.course, this.imageUrl, this.body],
        }
      ],
      callback
    );
  };

  //function to populate the project array
  Project.loadAll = function (dataPassedIn) {
    Project.all = dataPassedIn.map(function(obj) {
      return new Project(obj);
    });
  };

  //function to get and set data based of conditions, also accepts function as an argument
  Project.fetchAll = function(next) {
    webDB.execute('SELECT * FROM projects ORDER BY publishedOn DESC', function(rows) {
      if(rows.length) {
        Project.loadAll(rows);
        next();
      } else {
        $.getJSON('/data/projectsList.json', function(rawData) {
          rawData.forEach(function(item) {
            var project = new Project(item);
            project.insertRecord();
          });
          webDB.execute('SELECT * FROM projects', function(rows) {
            Project.loadAll(rows);
            next();
          });
        });
      };
    });
    // if (localStorage.localData) {
    //   $.ajax({
    //     type: 'HEAD',
    //     url: 'data/projectsList.json',
    //     success: function(data, message, xhr) {
    //       var eTag = xhr.getResponseHeader('eTag');
    //       if (eTag !== localStorage.eTag || !localStorage.eTag) {
    //         eTag = localStorage.eTag;
    //         Project.getAll(next);
    //       } else {
    //         Project.loadAll(JSON.parse(localStorage.localData));
    //         next();
    //       }
    //     }
    //   });
    // } else {
    //   Project.getAll(next);
    // }
  };

  //returns an array of what courses are associated with the projects. displays unique, no repeats
  Project.allCourses = function() {
    return Project.all.map(function(obj) {
      return obj.course;
    }).reduce(function(acc, cur) {
      if (acc.indexOf(cur) === -1) {
        acc.push(cur);
      }
      return acc;
    }, []);
  };

  //Project is now a property of module to where any method of Project can be used
  module.Project = Project;
})(window);
