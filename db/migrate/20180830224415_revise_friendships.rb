class ReviseFriendships < ActiveRecord::Migration[5.0]
  def up
    drop_table :friendships
    create_table :friendships do |t|
      t.string :friender_id, null: false
      t.string :friendee_id, null: false
      t.string :friender_status, null: false, default: 'pending'
      t.string :friendee_status, null: false, default: 'pending'
      t.timestamps
    end
  end

  def down
    drop_table :friendships
    create_table :friendships, id: false do |t|
      t.string :friender_id, null: false
      t.string :friendee_id, null: false
      t.string :friender_status, null: false, default: 'pending'
      t.string :friendee_status, null: false, default: 'pending'
      t.string :friender_id, null: false
      t.timestamps
    end
  end
end
