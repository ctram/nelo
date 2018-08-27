class ChangeFriendsToUserFriends < ActiveRecord::Migration[5.0]
  def change
    rename_table :friends, :user_friends
  end
end
