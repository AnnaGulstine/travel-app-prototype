class Pin < ActiveRecord::Base
  belongs_to :board
  geocoded_by :name
  after_validation :geocode 
end
