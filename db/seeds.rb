
# Language.create(name: "English")
# Language.create(name: "French")
# Language.create(name: "Spanish")
# Language.create(name: "Arabic")

# # English (www.oxforddictionaries.com/us/words/the-oec-facts-about-the-language) # 
# ["the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 1
#   word.save
# end
# # French (https://en.wiktionary.org/wiki/Wiktionary:French_frequency_lists/1-2000) # 
# ["je","de","est","pas","le","vous","la","tu","que","un","il","et","à","a","ne","les","ce","en","on","ça","une","ai","pour","des","moi","qui","nous","y","mais","me","dans","du","bien","elle","si","tout","plus","non","mon","suis","te","au","avec","va","oui","toi","fait","ils","as","être","faire","se","comme","était","sur","quoi","ici","sais","lui","veux","ma","là","rien","dit","es","où","votre","pourquoi","sont","cette","quand","par","son","ton","peux","vais","dire","alors","comment","avez","bon","ou","très","merci","ont","même","jamais","aussi","voir","chose","allez","tous","deux","ces","faut","sa","êtes","été","ta","fais"].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 2
#   word.save
# end
# # Spanish (https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish1000) # 

# ["que","de","no","a","la","el","es","y","en","lo","un","por","qué","me","una","te","los","se","con","para","mi","está","si","bien","pero","yo","eso","las","sí","su","tu","aquí","del","al","como", "le","más","esto","ya","todo","esta","vamos","muy","hay","ahora","algo","estoy","tengo","nos","tú","nada","cuando","ha","este","sé","estás","así","puedo","cómo","quiero","sólo","soy","tiene","gracias","o","él","bueno","fue","ser","hacer","son","todos","era","eres","vez","tienes","creo","ella","he","ese","voy","puede","sabes","hola","sus","porque","dios","quién","nunca","dónde","quieres","casa","favor","esa","dos","tan","señor","tiempo","verdad","estaba"].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 3
#   word.save
# end


# ["لا","من","هذا","أن","في","أنا","على","ما","هل","يا","و","لقد","ذلك","ماذا","أنت","هنا","لم","إلى","نعم","كان","هو","ان","هذه","هناك","عن","فى","كل","ليس","فقط","كنت","الآن","يجب","انا","لك","مع","شيء","لكن","لن","الذي","حسنا","كيف","سوف","هيا","نحن","إنه","ـ","أجل","لماذا","إذا","عندما","انه","كذلك","لي","الى","بعد","انت","هي","أين","أنه","كانت","حتى","أي","إنها","أعرف","قد","قبل","تلك","الأمر","بعض","أو","مثل","أريد","رجل","لو","أعتقد","ربما","أيها","بخير","يكون","عليك","جيد","أنك","شخص","إن","التي","ولكن","أليس","علي","أحد","به","الوقت","يمكن","انها","اليوم","شئ","تعرف","تريد","صحيح","أكثر","تكون"].each do |word|
#   word = Word.new(word: word)
#   word.language_id = 4
#   word.save
# end


