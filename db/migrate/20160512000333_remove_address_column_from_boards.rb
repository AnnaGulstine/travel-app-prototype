class RemoveAddressColumnFromBoards < ActiveRecord::Migration
  def change
    remove_column :boards, :address, :string
  end
end
