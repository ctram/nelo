class ReviseFriendships2 < ActiveRecord::Migration[5.0]
  def change
    remove_column :friendships, :friender_status
  end
end
