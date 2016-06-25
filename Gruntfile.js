module.exports = function (grunt) {
   grunt.initConfig({
      browserify: {
         dist: {
            options: {
               transform: [
                    [ "babelify", { presets: ["es2015"] } ]
                ]
            },
            files: {
               "./dist/app.js": ["./lib/parle.js"]
            }
         }
      },
      watch: {
         scripts: {
            files: ["./lib/*.js"],
            tasks: ["browserify"]
         }
      }
   });

   // load npm tasks
   grunt.loadNpmTasks("grunt-browserify");
   grunt.loadNpmTasks("grunt-contrib-watch");

   // register tasks
   grunt.registerTask("default", ["watch"]);
   grunt.registerTask("build", ["browserify"]);
};

