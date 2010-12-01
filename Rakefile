require 'rubygems'
require 'rake'

ROOT            = File.expand_path(File.dirname(__FILE__))

def combine(src, dest)
  require "sprockets"
  
  secretary = Sprockets::Secretary.new(
    :root => ROOT,
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

desc "Merges the JavaScript sources."
task :merge => [:build] do
    combine "src/combine.js", "build/simplegeo.js"
    combine "src/combine.context.js", "build/simplegeo.context.js"
    combine "src/combine.places.js", "build/simplegeo.places.js"
end

desc "Minifies the JavaScript source."
task :minify => [:merge] do
    compress "build/simplegeo.js", "build/simplegeo.min.js"
    compress "build/simplegeo.context.js", "build/simplegeo.context.min.js"
    compress "build/simplegeo.places.js", "build/simplegeo.places.min.js"
end

#desc "Check the JavaScript source with JSLint."
#task :check => [:merge] do
#  jslint_path = File.join(ROOT, "vendor", "jslint.js")
#
#  sh 'java', 'org.mozilla.javascript.tools.shell.Main',
#    jslint_path, OUTPUT_MERGED
#end
