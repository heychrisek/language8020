# Seed words for each language from individual .txt files
Dir.entries("word_txt_files").select{|file|file.end_with?('.txt')}.
  each do |file|
  language = Language.create(name: file[0..-5].capitalize)
  File.read("word_txt_files/#{file}").gsub(/\d/, '').
    split("\n").reject(&:empty?)[0...1000].map(&:strip).each do |word|
    Word.create(word: word, language: language)
  end
end

# Seed transltions for each language from individual .txt files
Dir.entries("translation_txt_files").select{|file|file.end_with?('.txt')}.
  each do |file|
  language = Language.find_by(name: file[0..-5].capitalize)
  words = Word.where(language_id: language.id)
  translations_from_file = File.read("translation_txt_files/#{file}").gsub(/\d/, '').split("\n").reject(&:empty?)[0...1000].map(&:strip)
    # Have words and translations for a given language
    # Need to update *each* word to have *each* translation

    # Word.create(translation: translation_from_file, language: language)
  # end
end

(1..5347).each do |i|
  word = Word.find(i)
  language = word.language
  file = File.open("translation_txt_files/#{language.name.downcase}.txt", "a") do |f|
    f << "#{word.translation}\n"
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


# (5348..13954).each do |i|
#   word = Word.find(i)
#   word.update(:translation => word.translation)
# end
