require 'rake'

ROOT            = File.expand_path(File.dirname(__FILE__))
OUTPUT_MERGED   = "build/simplegeo.js"
OUTPUT_MINIFIED = "build/simplegeo.min.js"

task :default => :merge

desc "Merges the JavaScript sources."
task :merge do
  require "sprockets"
  # require File.join(ROOT, "vendor", "sprockets")

  #environment  = Sprockets::Environment.new(".")
  #preprocessor = Sprockets::Preprocessor.new(environment)
  
  secretary = Sprockets::Secretary.new(
    :root => ROOT,
    :source_files => ["src/combine.js"]
  )
  # Generate a Sprockets::Concatenation object from the source files
  concatenation = secretary.concatenation
  # Write the concatenation to disk
  concatenation.save_to(OUTPUT_MERGED)
end

desc "Minifies the JavaScript source."
task :minify => [:merge] do
  yuicompressor = File.join(ROOT, "vendor", "yuicompressor-2.4.2.jar")
  sh 'java', '-jar', yuicompressor, '-v',
    OUTPUT_MERGED, '-o', OUTPUT_MINIFIED
end

#desc "Check the JavaScript source with JSLint."
#task :check => [:merge] do
#  jslint_path = File.join(ROOT, "vendor", "jslint.js")
#
#  sh 'java', 'org.mozilla.javascript.tools.shell.Main',
#    jslint_path, OUTPUT_MERGED
#end
