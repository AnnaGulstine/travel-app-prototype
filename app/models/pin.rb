class Pin < ActiveRecord::Base
  belongs_to :board
  has_many :pin_categories
  has_many :categories, through: :pin_categories
end
