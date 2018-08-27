class ChangeFriendFields < ActiveRecord::Migration[5.0]
  def change
    rename_column :friends, :user_confirmed, :user_status
    rename_column :friends, :friend_confirmed, :friend_status
    change_column :friends, :user_status, :string, null: false, default: 'pending'
    change_column :friends, :friend_status, :string, null: false, default: 'pending'
  end
end
