class ChangeLanguageIdToReference < ActiveRecord::Migration
  def up
    remove_column :words, :language_id
    add_reference :words, :language
  end

  def down
    remove_column :words, :language
    add_column :words, :language_id, :integer
  end
end
