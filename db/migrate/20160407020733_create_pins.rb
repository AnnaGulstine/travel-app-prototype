class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
      t.string :url
      t.text :text
      t.integer :trip_id

      t.timestamps null: false
    end
  end
end
