class PinCategory < ActiveRecord::Base
  belongs_to :category 
  belongs_to :pin
end
