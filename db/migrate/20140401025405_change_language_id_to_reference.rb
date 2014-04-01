class ChangeLanguageIdToReference < ActiveRecord::Migration
  def up
    change_table :words do |t|
      t.change :language_id, :reference
    end
  end

  def down
    change_table :words do |t|
      t.change :language_id, :integer
    end
  end
end
