class ChangeUserAndFriendStatusInFriendships < ActiveRecord::Migration[5.0]
  def change
    rename_column :friendships, :friend_status, :friendee_status
    rename_column :friendships, :user_status, :friender_status
  end
end
