class RecreateFriendships < ActiveRecord::Migration[5.0]
  def up
    create_table :friendships, id: false do |t|
      t.string :friender_id, null: false
      t.string :friendee_id, null: false
      t.string :friender_status, null: false, default: 'pending'
      t.string :friendee_status, null: false, default: 'pending'
      t.string :friender_id, null: false
      t.timestamps
    end
  end

  def down
    drop_table :friendships
  end
end
