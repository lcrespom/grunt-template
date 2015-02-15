// jshint node: true
// See https://blog.codecentric.de/en/2014/02/cross-platform-javascript/ for a
//	detailed Grunt task tutorial
//TODO add tests
//TODO reorganize src directory into src/js, src/html and src/css
module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		// Readas package.json and stores it in the pkg property,
		//	which can be useful for embedding package properties,
		//	e.g. <%= pkg.name %>
		pkg: grunt.file.readJSON('package.json'),

		// Removes all machine-generated output
		clean: ['build'],

		// Transpiles from ES6 to ES5
		'6to5': {
			options: {
				modules: 'common',
				sourceMap: 'inline'
			},
			build: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.js'],
					dest: 'build/es5/',
				}],
			}
		},

		// Concatenates all JS modules into a single file
		browserify: {
			main: {
				files: {
					'build/dev/bundle.js': 'build/es5/main.js',
				},
				options: {
					banner: '// My application, v0.9',
					browserifyOptions: {
						debug: true
					}
				}
			}
		},

		// Copies source files that are not automatically built by other tasks
		copy: {
			main: {
				files: {
					'build/dev/index.html' :'src/index.html',
					'build/dev/': 'lib/**'
				}
			},
		},

		// Constantnly watches for changes in JS files and triggers build tasks
		watch: {
			files: ['src/**/*.js'],
			tasks: ['6to5', 'browserify'],
		},

	});


	grunt.registerTask('default', ['clean', '6to5', 'browserify', 'copy']);
};