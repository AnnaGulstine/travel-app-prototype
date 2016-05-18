class AddBoardIdColumnToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :board_id, :integer         
  end
end
