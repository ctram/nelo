class ChangeUserIdToAuthorIdForEntries < ActiveRecord::Migration[5.0]
  def change
    rename_column :entries, :user_id, :author_id
  end
end
