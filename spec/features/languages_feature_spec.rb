require 'spec_helper'

describe "Languages controller" do  
  before(:each) do
    FactoryGirl.create(:language)
    50.times {FactoryGirl.create(:word)}
  end

  describe "index page" do
    it "renders the index" do
      visit languages_path
      expect(page).to have_text("Learn the languages of the world the efficient way: by applying the 80/20 rule. Since 80% of a person's daily conversation is derived from roughly 20% of his or her vocabulary, focusing on the most frequently used words is a helpful approach to learning a foreign language.")
    end

    it "includes languages in the dropdown menu" do
      visit languages_path
      expect(page).to have_text("French")
    end
  end

  describe "languages show page" do
    it "includes languages in the dropdown menu" do
      visit language_path(1)
      expect(page).to have_text("#{Language.first.name}")
      expect(page).to have_text("#{Word.first.word}")
    end
  end

  describe "random language page" do
    it "redirects to a language show page" do
      visit languages_path
      click_link("Random language")
      expect(page).to have_text("#{Language.first.name}")
      expect(page).to have_text("#{Word.first.word}")
    end
  end

  describe "game" do
    it "renders the game" do
      visit game_path
      expect(page).to have_text("Test your knowledge!")
    end

    it "gets words for a game in a given language" do
      # Test languages_controller's get_set_of_words method
    end
  end
end