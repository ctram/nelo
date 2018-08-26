class ChangeMesssagesToComments < ActiveRecord::Migration[5.0]
  def change
    rename_table :messages, :comments
    add_column :comments, :entry_id, :string, null: false
  end
end
