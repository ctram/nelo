class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :content, null: false
      t.string :author_id, null: false
      t.string :recipient_id, null: false
      t.string :privacy_level, null: false, default: 'private'
      t.timestamps
    end
  end
end
