json.array! @boards.each do |board|
  json.id board.id
  json.user_id board.user_id
  json.name board.name 
  json.latitude board.latitude
  json.longitude board.longitude
  json.pins board.pins do |pin|
    json.id pin.id
    json.category pin.category.name
  end
end