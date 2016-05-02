class PinsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    board_id = Board.find_by(id: params[:id])
    @pins = Pin.find_by(id: board_id)
  end

  def show
    @board = Board.find_by(id: params[:id])
    @pins = @board.pins
  end

  def new
    @boards = Board.where("user_id = ?", current_user.id.to_i)
  end

  def create
    @pin = Pin.create(
      name: params[:name],    
      url: params[:url],
      text: params[:text],
      address: params[:address],
      board_id: params[:board]
    )    
    redirect_to "/boards"
  end

  def run_search
    search_term = params[:search]
    @pins = Pin.where('lower(text) LIKE ?', "%" + search_term.downcase + "%")
    render 'index.html.erb'
  end  
end