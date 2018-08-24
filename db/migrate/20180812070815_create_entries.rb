class CreateEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :entries do |t|
      t.text :content, null: false
      t.string :title, null: false
      t.string :author_id, null: false
      t.string :privacy_level, null: false, default: 'private'
      t.timestamps
    end
  end
end
