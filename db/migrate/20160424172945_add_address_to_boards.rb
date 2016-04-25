class AddAddressToBoards < ActiveRecord::Migration
  def change
    add_column :boards, :address, :string
  end
end
