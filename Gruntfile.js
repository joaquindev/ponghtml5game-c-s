/* Source: http://gruntjs.com/sample-gruntfile  */
module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        //define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        //the files to concatenate
        src: ['src/**/*.js'],
        //the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }
    }, 
    uglify: {
      options: {
        //the banner is inserted at the top of the output
        banner: '/*! <%= pkg.author %> <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }, 
    jshint: {
      //define the files to lint 
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'test/**/*.spec.js', 'package.json'], 
      //configure JSHint
      options: {
        //more options here if you want to override JSHint defaults
        globals: {
          jQuery: true, 
          console: true,
          module: true
        }
      }
    }, 
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }, 
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        }, 
        src: ['test/**/*.js']
      }  
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  //this would be run by typing "grunt test" on the command line
  grunt.registerTask('test', ['jshint']);
  //the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['jshint', 'mochaTest', 'concat', 'uglify']);

};
