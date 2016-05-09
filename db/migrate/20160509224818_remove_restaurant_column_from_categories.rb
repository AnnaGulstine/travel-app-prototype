class RemoveRestaurantColumnFromCategories < ActiveRecord::Migration
  def change
    remove_column :categories, :restaurant
  end
end
