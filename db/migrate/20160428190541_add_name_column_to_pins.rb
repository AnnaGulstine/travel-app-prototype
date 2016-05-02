class AddNameColumnToPins < ActiveRecord::Migration
  def change
    add_column :pins, :name, :string    
  end
end
