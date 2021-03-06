class PinsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    board_id = Board.find_by(id: params[:id])
    @pins = Pin.find_by(id: board_id) || Pin.all
    @categories = Category.all
  end

  def show
    @pin = Pin.find_by(id: params[:id])
  end

  def new
    @boards = Board.where("user_id = ?", current_user.id)
  end

  def create
    Geocoder.configure(:timeout => 3000)
    board = Board.find_by(id: params[:board_id])
    board_name = board.name
    name = params[:name].capitalize
    coordinates = Geocoder.coordinates(params[:name])
    unless params[:url].empty?
      page = MetaInspector.new(params[:url])
      image = page.images.best
      url = Addressable::URI.heuristic_parse(params[:url])
    end
    @pin = Pin.create(
      url: url,
      text: params[:text],
      name: params[:name],
      board_id: params[:board_id],
      category: params[:category].downcase,
      latitude: coordinates[0],
      longitude: coordinates[1],
      image: image
    )
    redirect_to "/boards/#{params[:board_id]}"
  end

  def edit
    board_id = params[:id]
    @pin = Pin.find_by(id: params[:id])
  end

  def update
    pin_id = params[:id]
    @pin = Pin.find_by(id: pin_id)
    unless params[:url].empty?
      page = MetaInspector.new(params[:url])
      image = page.images.best
      url = params[:url]
      url.standardize_url
      page = MetaInspector.new(params[:url])
      image = page.images.best      
    end
    if params[:name]
      coordinates = Geocoder.coordinates(params[:name])
    end
    @pin.update(
      url: params[:url],
      text: params[:text],
      name: params[:name],
      category: params[:category],
      image: image,
      latitude: coordinates[0],
      longitude: coordinates[1]
    )
    flash[:success] = "Pin successfully updated!"
    redirect_to "/pins/#{@pin.id}"
  end

  def destroy  
    @pin = Pin.find_by(id: params[:id])
    @pin.destroy
    flash[:success] = "Pin successfully deleted!" 
    redirect_to '/boards'
  end   

  def run_search
    search_term = params[:search]
    @pins = Pin.where('lower(text) LIKE ?', "%" + search_term.downcase + "%")
    render 'index.html.erb'
  end

  def places  
  end
end