class RemoveAddressColumnFromPins < ActiveRecord::Migration
  def change
    remove_column :pins, :address   
  end
end
