class MakeTitleAndContentOfEntriesNonNull < ActiveRecord::Migration[5.0]
  def change
    change_column_null(:entries, :title, false)
    change_column_null(:entries, :content, false)
  end
end
