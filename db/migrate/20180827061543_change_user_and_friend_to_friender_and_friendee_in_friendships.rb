class ChangeUserAndFriendToFrienderAndFriendeeInFriendships < ActiveRecord::Migration[5.0]
  def change
    rename_column :friendships, :user_id, :friender_id
    rename_column :friendships, :friend_id, :friendee_id
  end
end
