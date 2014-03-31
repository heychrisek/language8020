class CreateLanguages < ActiveRecord::Migration
  def change
    create_table :languages do |t|
      t.string  :name
      t.string :language_code
      t.timestamps
    end
  end
end
