# Currently have full tranlsations for: Afrikaans, Arabic, Bulgarian, Chinese, English, French, German, Hebrew, Italian, Japanese, Korean, Spanish,
# Missing: Portuguese, Russian, 

# Seed words and translations for each language from individual .txt files
Dir.entries("word_txt_files").select{|file|file.end_with?('.txt')}.each do |file|
  language = Language.create(name: file[0..-5].capitalize)
  words = File.read("word_txt_files/#{file}").gsub(/\d/, '').split("\n").reject(&:empty?)[0...500].map(&:strip)
  translations = File.read("translation_txt_files/#{file}").split("\n")[0...500].map(&:strip)
  (0...500).each do |i|
    Word.create(word: words[i], language: language, translation: translations[i])
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



# (11001..12000).each do |i|
#   word = Word.find(i)
#   language = word.language
#   file = File.open("translation_txt_files/#{language.name.downcase}.txt", "a") do |f|
#     f << "#{word.translation}\n"
#   end
# end