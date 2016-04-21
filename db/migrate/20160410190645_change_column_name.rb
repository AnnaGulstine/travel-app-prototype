class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :pins, :trip_id, :board_id
  end
end
