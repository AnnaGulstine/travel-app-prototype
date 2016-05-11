class CreatePinCategories < ActiveRecord::Migration
  def change
    create_table :pin_categories do |t|
      t.integer :pin_id
      t.integer :category_id

      t.timestamps null: false
    end
  end
end
