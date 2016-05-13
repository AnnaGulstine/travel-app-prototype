class Pin < ActiveRecord::Base
  belongs_to :board
  has_one :category
end
