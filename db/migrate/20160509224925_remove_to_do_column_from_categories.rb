class RemoveToDoColumnFromCategories < ActiveRecord::Migration
  def change
    remove_column :categories, :to_do      
  end
end
