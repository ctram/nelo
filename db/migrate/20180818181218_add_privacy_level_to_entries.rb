class AddPrivacyLevelToEntries < ActiveRecord::Migration[5.0]
  def change
    add_column :entries, :privacy_level, :string, null: false, default: 'private'
  end
end
