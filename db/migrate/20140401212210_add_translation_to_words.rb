class AddTranslationToWords < ActiveRecord::Migration
  def up
    add_column :words, :translation, :text
  end

  def down
    remove_column :words, :translation
  end
end
