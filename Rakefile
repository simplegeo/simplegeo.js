require 'rubygems'
require 'rake'
require 'erb'

ROOT = File.expand_path(File.dirname(__FILE__))

def render(src, dest, includes)
  template = ERB.new(IO.readlines(src).to_s)
  f = File.new(dest, 'w')

  # Write the ERB output to the new file:
  f.puts(template.result(binding))
  f.close
end

def combine(src, dest)
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
   sh 'yui-compressor', '-v', src, '-o', dest
end

task :default => :merge

directory "build"
directory "templates"

desc "Compile the JavaScript combiners."
task :render => [:build, :templates] do
    render "src/combine.js.erb", "templates/simplegeo.js", []
    render "src/combine.js.erb", "templates/simplegeo.storage.js", ["storage"]
    render "src/combine.js.erb", "templates/simplegeo.places.js", ["places"]
    render "src/combine.js.erb", "templates/simplegeo.context.js", ["context"]
end

desc "Merges the JavaScript sources."
task :merge => [:render] do
    combine "templates/simplegeo.js", "build/simplegeo.js"
    combine "templates/simplegeo.storage.js", "build/simplegeo.storage.js"
    combine "templates/simplegeo.places.js", "build/simplegeo.places.js"
    combine "templates/simplegeo.context.js", "build/simplegeo.context.js"
end

desc "Minifies the JavaScript source."
task :minify => [:merge] do
    compress "build/simplegeo.js", "build/simplegeo.min.js"
    compress "build/simplegeo.storage.js", "build/simplegeo.storage.min.js"
    compress "build/simplegeo.places.js", "build/simplegeo.places.min.js"
    compress "build/simplegeo.context.js", "build/simplegeo.context.min.js"
end

#desc "Check the JavaScript source with JSLint."
#task :check => [:merge] do
#  jslint_path = File.join(ROOT, "vendor", "jslint.js")
#
#  sh 'java', 'org.mozilla.javascript.tools.shell.Main',
#    jslint_path, OUTPUT_MERGED
#end
