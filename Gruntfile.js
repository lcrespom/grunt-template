module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: ['dist', 'es5'],

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
					dest: 'es5/',
				}],
			}
		},

		browserify: {
			main: {
				files: {
					'dist/bundle.js': 'es5/main.js',
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
					'dist/index.html' :'src/index.html',
					'dist/': 'lib/**'
				}
			},
		}

	});


	grunt.registerTask('default', ['clean', '6to5', 'browserify', 'copy']);
}