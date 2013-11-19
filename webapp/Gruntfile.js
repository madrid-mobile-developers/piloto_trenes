module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: './temp_lib',
                    install: true,
                    verbose: false,
                    cleanTargetDir: true,
                    cleanBowerDir: true
                }
            }
        },
        copy: {
            lib: {
                expand: true,
                cwd: 'lib/',
                src: '**',
                dest: 'public/lib/',
                filter: 'isFile'
            },
            bower: {
                files :
                    [
                    // jquery
                    {expand: true, cwd: 'temp_lib/', src: 'jquery/jquery.*', dest: './lib/', filter: 'isFile'},
                    //backbone
                    {expand: true, cwd: 'temp_lib/', src: 'backbone-amd/backbone-min.*', dest: './lib/', filter: 'isFile'},
                    //jquery-mobile
                    {expand: true, cwd: 'temp_lib/', src: 'jquery-mobile/dist/jquery.mobile.min.*', dest: './lib/', filter: 'isFile'},
                    //requirejs
                    {expand: true, cwd: 'temp_lib/', src: 'requirejs/require.js', dest: './lib/', filter: 'isFile'},
                    //requirejs-text
                    {expand: true, cwd: 'temp_lib/', src: 'requirejs-text/text.js', dest: './lib/', filter: 'isFile'},
                    //underscore
                    {expand: true, cwd: 'temp_lib/', src: 'underscore-amd/underscore-min.*', dest: './lib/', filter: 'isFile'}
                    ]
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
            },
            lib: {
                src: ['public/lib/**'],
                force: true
            },
            bower: {
                src: ['temp_lib'],
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
                command: 'git push -u github master'
            },
            clean_apache:{
                command: 'rm -R /Library/WebServer/Documents/train/*'
            },
            build_jquery_mobile: {
                command: 'grunt js:release',
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: './temp_lib/jquery-mobile/'
                    }
                }

            },
            npm_jquery_mobile:{
                command: 'npm install',
                options: {
                    stdout: true,
                    execOptions: {
                        cwd: './temp_lib/jquery-mobile/'
                    }
                }
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

    grunt.registerTask('default', ['install', 'dev_deploy']);
    grunt.registerTask('install', ['bower', 'shell:npm_jquery_mobile','shell:build_jquery_mobile','copy:bower', 'clean:bower']);
    grunt.registerTask('dev_deploy', ['karma:unit', 'clean:lib', 'copy:lib', 'clean:sources', 'copy:sources']);
    grunt.registerTask('prod_install', ['karma:unit', 'shell:git_push']);
    grunt.registerTask('prod_deploy', ['karma:unit', 'shell:clean_apache', 'copy:apache']);
};