class LanguagesController < ApplicationController
  def index
    @languages = Language.all
  end

  def show
    params[:page] ||= 0
    @page = params[:page]
    params[:per_page] ||= 25
    @per_page = params[:per_page]

    @language = Language.find(params[:id])
    @first_word_number = @page * @per_page + 1
    @last_word_number = @first_word_number + @per_page - 1

    first_id = @language.words.first.id
    begin_range = first_id + @first_word_number - 1
    end_range = first_id + @last_word_number
    range = begin_range...end_range
    @words = @language.words.find(range.to_a)
  end

end
