class LanguagesController < ApplicationController
  def index
    @languages = Language.all
  end

  def show
    get_set_of_words
  end

  def get_words
    get_set_of_words
    respond_to do |format|
      format.js
    end
  end

  def choose_language
    language_id = Language.find_by(language_code: params[:language]).id
    redirect_to "/languages/#{language_id}?per_page=#{params[:per_page]}"
  end

  private
    def get_set_of_words
      params[:page] ||= 0
      @page = params[:page].to_i
      params[:per_page] ||= 25
      @per_page = params[:per_page].to_i

      @language = Language.find(params[:id])
      @first_word_number = @page * @per_page + 1
      @last_word_number = @first_word_number + @per_page - 1

      first_id = @language.words.first.id
      @words = @language.words[(@first_word_number - 1)...@last_word_number]

      redirect_to @language unless @words
    end
end
