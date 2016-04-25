class ChangePrecisionOfLatitudeAndLongitudeInBoards < ActiveRecord::Migration
  def change
    change_column :boards, :latitude, :float, precision: 9, scale: 6
  end
end
