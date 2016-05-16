json.array! @boards.each do |board|
  json.id board.id
  json.user_id board.user_id
  json.name board.name 
  json.latitude board.latitude
  json.longitude board.longitude
  json.pins board.pins do |pin|
    json.category pin.category
  end
end