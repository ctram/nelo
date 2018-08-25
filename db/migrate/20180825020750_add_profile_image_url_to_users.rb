class AddProfileImageUrlToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :profile_image_url, :string
  end
end
