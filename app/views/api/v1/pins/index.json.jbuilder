json.array! @pins.each do |pin|
  json.url pin.url
  json.name pin.name
  json.text pin.text
  json.boardId pin.board_id
  json.latitude pin.latitude
  json.longitude pin.longitude
  json.category pin.category.name
end