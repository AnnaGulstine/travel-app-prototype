class Api::V1::PinsController < Api::ApiController
  def index
    @pins = Pin.all
    render 'index.json.jbuilder'
  end

  def create
    unless params[:url].empty?
      page = MetaInspector.new(params[:url])
      image = page.images.best
      url = Addressable::URI.heuristic_parse(params[:url])
    end
    @pin = Pin.new(
      text: params[:text],
      name: params[:name],
      board_id: params[:board_id],
      category: params[:category],
      url: params[:url],
      image: image
    )
    @pin.save
    render 'show.json.jbuilder'    
  end

  def show
    @pin = Pin.find_by(id: params[:id])
    render = "show.json.jbuilder"
  end

  def api_pin_ids
    puts '*' * 50
    puts current_user
    puts '*' * 50
    @pins = Pin.all
    render json: @pins
  end
end