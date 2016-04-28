json.array! @pins.each do |pin|
  json.url pin.url
  json.text pin.text
  json.boardId pin.board_id
  json.address pin.address
  json.latitude pin.latitude
  json.longitude pin.longitude
end