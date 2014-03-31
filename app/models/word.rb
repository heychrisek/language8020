class Word < ActiveRecord::Base
  belongs_to :language

  # def translate(original_lang, translation_lang)
  #   google_url = "http://translate.google.com/translate_a/t?client=t&sl="
    
  #   full_url = google_url + original_lang + "&tl=" + translation_lang + "&hl=pl&sc=2&ie=UTF-8&oe=UTF-8&prev=enter&ssel=0&tsel=0&"

  #   uri = URI.parse(URI.escape(full_url))
  #   http = Net::HTTP.new(uri.host, uri.port)
  #   request = Net::HTTP::Post.new(uri.request_uri) 
  #   request.set_form_data(text: self.word)
  #   response = http.request(request)

  #   # when trying to translate all, stuff breaks here - "incompatible character encodings: ASCII-8BIT and UTF-8"

  #   to_parse = response.body.split(',').collect { |s| s == '' ? "\"\"" : s }.join(",") # fix json object
  #   to_parse
  #   result = JSON.parse(to_parse)
  #   result[0][0][0]
  # end
end
