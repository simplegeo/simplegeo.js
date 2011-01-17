require 'rubygems'
require 'rake'
require 'erb'

ROOT = File.expand_path(File.dirname(__FILE__))

def render(src, dest, includes)
  puts "- render(#{src}, #{dest}, #{includes})"
  template = ERB.new(IO.readlines(src).to_s)
  f = File.new(dest, 'w')

  # Write the ERB output to the new file:
  f.puts(template.result(binding))
  f.close
end

def combine(src, dest)
  puts "- combine(#{src}, #{dest})"
  require "sprockets"
  
  secretary = Sprockets::Secretary.new(
    :root => ROOT,
    :load_path => ['src'],
    :source_files => [src]
  )
  # Generate a Sprockets::Concatenation object from the source files
  concatenation = secretary.concatenation
  # Write the concatenation to disk
  concatenation.save_to(dest)
end

def compress(src, dest)
    # java -jar vendor/compiler.jar --js build/simplegeo.jq.js --js_output_file build/simplegeo.jq.cmin.js --compilation_level SIMPLE_OPTIMIZATIONS
    sh 'java', '-jar', 'vendor/compiler.jar', '--js', src, '--js_output_file', dest
    # sh 'yui-compressor', '-v', src, '-o', dest
end

def bundle_template(template, name, includes)
    render "src/#{template}.js.erb", "templates/#{template}.#{name}.js", includes
    combine "templates/#{template}.#{name}.js", "build/#{name}.js"
    compress "build/#{name}.js", "build/#{name}.min.js"
end

def bundle(name, includes)
    bundle_template "combine", name, includes
    bundle_template "combine.jq", "#{name}.jq", includes
end

task :default => :minify

directory "build"
directory "templates"

desc "Minifies the JavaScript source."
task :minify => [:build, :templates] do
    bundle "simplegeo.core", []
    bundle "simplegeo.storage", ["storage"]
    bundle "simplegeo.context", ["context"]
    bundle "simplegeo.places", ["places"]
    bundle "simplegeo.all", ["storage", "context", "places"]
end

desc "Build doc."
task :doc do
    sh 'java',
      '-Djsdoc.dir=vendor/jsdoc-toolkit',
      '-jar', 'vendor/jsdoc-toolkit/jsrun.jar',
      'vendor/jsdoc-toolkit/app/run.js',
      '-D=noGlobal:true',
      'src/core.js',
      'src/client.js',
      'src/context.js',
      'src/places.js',
      '-t=vendor/jsdoc-toolkit/templates/jsdoc', '-d=doc'
end

#desc "Check the JavaScript source with JSLint."
#task :check => [:merge] do
#  jslint_path = File.join(ROOT, "vendor", "jslint.js")
#
#  sh 'java', 'org.mozilla.javascript.tools.shell.Main',
#    jslint_path, OUTPUT_MERGED
#end
