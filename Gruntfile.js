module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: ['build'],

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

		copy: {
			main: {
				files: {
					'build/dev/index.html' :'src/index.html',
					'build/dev/': 'lib/**'
				}
			},
		}

	});


	grunt.registerTask('default', ['clean', '6to5', 'browserify', 'copy']);
}