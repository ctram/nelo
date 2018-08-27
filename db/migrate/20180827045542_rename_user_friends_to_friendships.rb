class RenameUserFriendsToFriendships < ActiveRecord::Migration[5.0]
  def change
    rename_table :user_friends, :friendships
  end
end
