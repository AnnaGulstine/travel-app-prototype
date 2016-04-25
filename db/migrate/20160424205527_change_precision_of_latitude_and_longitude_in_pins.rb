class ChangePrecisionOfLatitudeAndLongitudeInPins < ActiveRecord::Migration
  def change
    change_column :pins, :latitude, :float, precision: 9, scale: 6    
  end
end
