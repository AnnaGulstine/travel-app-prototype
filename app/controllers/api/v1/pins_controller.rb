class Api::V1::PinsController < ApplicationController
  def index
    @pins = Pin.all
    render 'index.json.jbuilder'
  end

  def create
    @pin = Pin.new(
      text: params[:text],
      board_id: params[:board_id],
      url: params[:url]
    )
    @pin.save
    render 'show.json.jbuilder'    
    # render json: {
    #   text: params[:text],
    #   url: params[:url],
    #   board_id: params[:board_id]
    # }
  end

  def show
    @pin = Pin.find_by(id: params[:id])
    render = "show.json.jbuilder"
  end

  def api_pin_ids
    puts '*' * 50
    puts current_user
    puts '*' * 50
    # render json: {message: 'not signed in'}
    # @pins = User.first.pins
    @pins = Pin.all
    render json: @pins
  end
end