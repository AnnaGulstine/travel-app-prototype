class Category < ActiveRecord::Base
  has_many :pin_categories
  has_many :pins, through: :pin_categories
end
