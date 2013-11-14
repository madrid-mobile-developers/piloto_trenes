module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: './lib',
                    install: true,
                    verbose: false,
                    cleanTargetDir: false,
                    cleanBowerDir: true
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'lib/',
                src: '**',
                dest: 'public/lib/',
                filter: 'isFile'
            },
            sources: {
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'public/app/',
                filter: 'isFile'
            },
            apache: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '**',
                        dest: '/Library/WebServer/Documents/train/app',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'lib',
                        src: '**',
                        dest: '/Library/WebServer/Documents/train/lib',
                        filter: 'isFile'

                    }
                ]

            }
        },
        clean: {
            sources: {
                src: ['public/app/**'],
                force: true
            }
        },
        shell: {
            node_start: {
                options: {
                    stdout: true
                },
                command: 'supervisor server.js'
            },
            git_push:{
                command: 'git push -u origin master'
            }
        },
        karma: {
            unit: {
                configFile: './karma.conf.js'
            },
            //continuous integration mode: run tests once in PhantomJS browser.
            continuous: {
                configFile: './karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }

    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['bower', 'copy:main', 'clean:sources', 'copy:sources']);
    grunt.registerTask('dev_deploy', ['karma:unit', 'clean:sources', 'copy:sources']);
    grunt.registerTask('prod_deploy', ['karma:unit', 'shell:git_push']);
};