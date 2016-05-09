class Api::V1::BoardsController < ApplicationController
  def index
    @boards = current_user.boards
    render 'index.json.jbuilder'
  end

  def show
    @board = Board.find_by(id: params[:id])
    render 'show.json.jbuilder'
  end

  def api_board_ids
    puts '*' * 50
    puts current_user
    puts '*' * 50
    if current_user
      @boards = current_user.boards
      render json: @boards
    else
      # render json: {message: 'not signed in'}
      @boards = User.first.boards
      render json: @boards
    end
  end
end