Dir.entries("language_txt_files").select{|file|file.end_with?('.txt')}.
  each do |file|
  language = Language.create(name: file[0..-5].capitalize)
  File.read("language_txt_files/#{file}").gsub(/\d/, '').
    split("\n").reject(&:empty?)[0...1000].map(&:strip).each do |word|
    Word.create(word: word, language: language)
  end
end