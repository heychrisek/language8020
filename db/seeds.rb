languages = ["English", "French", "Spanish", "Arabic", "Russian", "Chinese",
  "Portuguese", "Italian", "Hebrew", "Afrikaans", "German", "Afrikaans",
  "German", "Bulgarian"]

languages.each do |language_name|
  language = Language.create(name: language_name)
  File.read("language_txt_files/#{language_name.downcase}.txt").gsub(/\d/, '').
    split("\n").reject(&:empty?)[0...1000].map(&:strip).each do |word|
    word = Word.new(word: word)
    word.language = language
    word.save
  end
end