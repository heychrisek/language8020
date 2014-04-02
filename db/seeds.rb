Dir.entries("language_txt_files").select{|file|file.end_with?('.txt')}.
  each do |file|
  language = Language.create(name: file[0..-5].capitalize)
  File.read("language_txt_files/#{file}").gsub(/\d/, '').
    split("\n").reject(&:empty?)[0...1000].map(&:strip).each do |word|
    Word.create(word: word, language: language)
  end
end

{
  "Afrikaans" => "af",
  "Arabic" => "ar",
  "Bulgarian" => "bg",
  "Chinese" => "zh",
  "English" => "en",
  "French" => "fr",
  "German" => "de",
  "Hebrew" => "he",
  "Italian" => "it",
  "Japanese" => "ja",
  "Korean" => "ko",
  "Portuguese" => "pt",
  "Russian" => "ru",
  "Spanish" => "es",
  


}.each do |language_name, code|
  language = Language.find_by(name: language_name).update(language_code: code)
end


# To seed the translations of each word (remember to uncomment word.rb translation method)
(5348..13954).each do |i|
  word = Word.find(i)
  word.update(:translation => word.translation)
end