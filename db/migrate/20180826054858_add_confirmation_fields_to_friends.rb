class AddConfirmationFieldsToFriends < ActiveRecord::Migration[5.0]
  def change
    add_column :friends, :user_confirmed, :boolean
    add_column :friends, :friend_confirmed, :boolean
  end
end
