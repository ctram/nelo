class ChangeUsersIdToString < ActiveRecord::Migration[5.0]
  def change
    change_column :users, :id, :string, null: false
  end
end
