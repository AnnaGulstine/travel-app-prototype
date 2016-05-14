class Category < ActiveRecord::Base
  # belongs_to :pin
  has_many :pins
end