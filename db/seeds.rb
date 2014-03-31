# Language.create(name: "English")
# Language.create(name: "French")
# Language.create(name: "Spanish")
# Language.create(name: "Arabic")
# Language.create(name: "Russian")
# Language.create(name: "Chinese")
# Language.create(name: "Portuguese")
# Language.create(name: "Italian")
# Language.create(name: "Hebrew")
# Language.create(name: "Afrikaans")
# Language.create(name: "German")
# Language.create(name: "Bulgarian")

# File.read('language_txt_files/english.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 1
#   word.save
# end

# File.read('language_txt_files/french.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 2
#   word.save
# end

# File.read('language_txt_files/espanol.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 3
#   word.save
# end

# File.read('language_txt_files/arabic.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 4
#   word.save
# end

# File.read('language_txt_files/russian.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 5
#   word.save
# end

# File.read('language_txt_files/simplechinese.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 6
#   word.save
# end

# File.read('language_txt_files/portuguese.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 7
#   word.save
# end

# File.read('language_txt_files/italian.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 8
#   word.save
# end

# File.read('language_txt_files/hebrew.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 9
#   word.save
# end

# File.read('language_txt_files/afrikaans.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 10
#   word.save
# end

# File.read('language_txt_files/german.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 11
#   word.save
# end

# File.read('language_txt_files/bulgarian.txt').gsub(/\d/, '').split("\n").reject(&:empty?).map(&:strip)[0...1000].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 12
#   word.save
# end