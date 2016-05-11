class PinsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    board_id = Board.find_by(id: params[:id])
    @pins = Pin.find_by(id: board_id)
  end

  def show
    @pin = Pin.find_by(id: params[:id])
  end

  def new
    @boards = Board.where("user_id = ?", current_user.id)
  end

  def create
    coordinates = Geocoder.coordinates(params[:name])    
    @pin = Pin.create(   
      url: params[:url],
      text: params[:text],
      name: params[:name],
      board_id: params[:board_id],
      latitude: coordinates[0],
      longitude: coordinates[1]
    )    
    redirect_to "/boards"
  end

  def edit
    board_id = params[:id]
    # @pin = Pin.find_by(board_id: board_id)
    @pin = Pin.find_by(id: params[:id])
  end

  def update
    pin_id = params[:id]
    @pin = Pin.find_by(id: pin_id)
    @pin.update(
      url: params[:url],
      text: params[:text],
      name: params[:name]
    )
    flash[:success] = "Pin successfully updated!"
    redirect_to "/pins/#{@pin.id}"
  end  

  def run_search
    search_term = params[:search]
    @pins = Pin.where('lower(text) LIKE ?', "%" + search_term.downcase + "%")
    render 'index.html.erb'
  end  
end