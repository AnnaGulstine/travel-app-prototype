class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :restaurant
      t.string :hotel
      t.string :to_do

      t.timestamps null: false
    end
  end
end
