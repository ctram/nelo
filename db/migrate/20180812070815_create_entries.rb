class CreateEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :entries do |t|
      t.text :content
      t.string :title
      t.string :user_id
      t.timestamps
    end
  end
end
