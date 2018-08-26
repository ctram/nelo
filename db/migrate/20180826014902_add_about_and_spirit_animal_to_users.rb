class AddAboutAndSpiritAnimalToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :about, :text
    add_column :users, :spirit_animal, :string
  end
end
