class Word < ActiveRecord::Base
  belongs_to :language

  # def translation
  #   "a translation"
  #   # word_name = self.word
  #   # lang_from = self.language.language_code
  #   # begin
  #   #   translate_hash = GoogleTranslate.new.translate(lang_from, "en", word_name)
  #   #   translations = translate_hash[1][0][1]
  #   #   return_string = translations.join("<br>")
  #   # rescue
  #   #   begin
  #   #     return_string = translate_hash[0][0][0]
  #   #   rescue
  #   #     return_string = "N/A"
  #   #   end
  #   # end
    
  #   # return_string ||= "translation not found"
  # end

end
