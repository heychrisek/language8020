require 'fileutils'

Dir.entries("language_txt_files").select{|file|file.end_with?('.txt')}.
  each do |file|
  new_file_name = 'language_image_prep/' + file
  FileUtils.touch(new_file_name)
  File.open(new_file_name, 'w') do |new_file|
    words = File.read("language_txt_files/#{file}").split("\n")[0..999]
    min_total = words.last.split[1].to_i
    words.each do |line|
      line = line.split
      word = line[0]
      num = line[1].to_i
      (num/min_total).times do
        new_file.puts word
      end
    end
  end
end