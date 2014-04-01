class Word < ActiveRecord::Base
  belongs_to :language

  def translation
    word_name = self.word
    
    begin
      translate_hash = GoogleTranslate.new.translate("en","fr", word_name)
      translations = translate_hash[1][0][1]
      return_string = translations.join("<br>")
    rescue
      return_string = translate_hash[0][0][0]
    end
    
    return_string ||= "translation not found"
  end

end
