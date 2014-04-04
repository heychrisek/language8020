class LanguagesController < ApplicationController
  before_action :set_languages 

  def index
    @language = Language.all.sample
    @home = true
  end

  def show
    get_set_of_words
    render layout: false if request.headers['X-PJAX']
  end

  def choose_language
    language_id = Language.find_by(language_code: params[:language]).id
    redirect_to "/languages/#{language_id}?per_page=#{params[:per_page]}"
  end

  def random
    language_id = Language.all.sample.id
    redirect_to "/languages/#{language_id}?per_page=10"
  end

  def game
    @languages = Language.all
  end

  def get_word_data
    language_code = params[:language_code]
    num_words = params[:num_words]
    words = Language.find_by(language_code: language_code).words.first(num_words)
    respond_to do |format|
      format.json {render json: words, status: 200}
    end
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
      @last_word_number = 500 if @last_word_number > 500

      first_id = @language.words.first.id
      @words = @language.words[(@first_word_number - 1)...@last_word_number]

      redirect_to @language unless @words
    end

    def set_languages
      @languages = Language.all
    end
end
