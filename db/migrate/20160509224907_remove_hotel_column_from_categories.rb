class RemoveHotelColumnFromCategories < ActiveRecord::Migration
  def change
    remove_column :categories, :hotel 
  end
end
