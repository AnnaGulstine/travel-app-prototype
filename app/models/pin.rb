class Pin < ActiveRecord::Base
  belongs_to :board
  # has_one :category
  belongs_to :category
end
