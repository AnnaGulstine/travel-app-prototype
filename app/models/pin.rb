class Pin < ActiveRecord::Base
  belongs_to :board
  geocoded_by :name
  after_validation :geocode

  def standardize_url
    url = url.gsub!("https://", "")
    url = url.gsub!("http://", "")
  end
end
