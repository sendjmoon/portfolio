// IIFE!!!!!!!!
(function(module) {

  //constructor to build Project objects
  function Project (obj) {
    //for every property in the object
    for (property in obj) {
      //set that object's property into this instance's property
      this[property] = obj[property];
    }
  };

  //empty array to hold Project objects that will append to the DOM
  Project.all = [];

  //function to use handlebars for the template
  Project.prototype.toHtml = function() {
    //takes the html content of #article-template and puts it into local variable $source
    var $source = $('#article-template').html();
    //uses handlebars to compile data stored in $source
    var template = Handlebars.compile($source);
    //
    return template(this);
  };

  //function to populate the project array
  Project.loadAll = function (dataPassedIn) {
    //instantiates new article objects into the Project.all array
    Project.all = dataPassedIn.map(function(obj) {
      return new Project(obj);
    });
  };

  //function to get data from .json file, stores into localStorage
  Project.getAll = function(next) {
    //gets data from the json file
    $.getJSON('data/projectsList.json', function(responseData) {
      //throws the data from the json file into the loadAll function
      Project.loadAll(responseData);
      //stores the data as a string in localStorage under the variable localData
      localStorage.localData = JSON.stringify(responseData);
      //calls the function that is passed through
      next();
    });
  };

  //function to get and set data based of conditions, also accepts function as an argument
  Project.fetchAll = function(next) {
    //checks to see if localStorage exists under key "localData"
    if (localStorage.localData) {
      $.ajax({
        type: 'HEAD',
        url: 'data/projectsList.json',
        success: function(data, message, xhr) {
          //gets eTag of localStorage and assigns to variable eTag
          var eTag = xhr.getResponseHeader('eTag');
          //checks to see if eTag does not equal the local stored eTag, or if there is no local stored eTag
          if (eTag !== localStorage.eTag || !localStorage.eTag) {
            console.log('before' + eTag);
            eTag = localStorage.eTag;
            console.log('after' + eTag);
            //passes function through the Project.getAll function
            Project.getAll(next);
          //if localStorage does not exist then we will...
          } else {
            //pulls data from localStorage and parses so it can run through the Project.loadAll function
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
    //maps through Project.all array to return the value held in the course property
    return Project.all.map(function(obj) {
      return obj.course;
    //.reduce used to create an array of results. pass acc as the array and cur as the element in the array
    }).reduce(function(acc, cur) {
      //if the value of the iterated element returns -1 it will push that element into the returned array
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
