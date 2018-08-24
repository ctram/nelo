class CreateFriends < ActiveRecord::Migration[5.0]
  def change
    create_table :friends, id: false do |t|
      t.string :user_id, null: false
      t.string :friend_id, null: false
      t.string :status, null: false, default: 'pending'
      t.timestamps
    end
  end
end
