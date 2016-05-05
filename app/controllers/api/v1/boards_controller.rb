class Api::V1::BoardsController < ApplicationController
  def index
    if current_user
      @boards = current_user.boards
    else
      redirect_to "/users/sign_in"
    end
    render 'index.json.jbuilder'
  end

  def show
    @board = Board.find_by(id: params[:id])
    render 'show.json.jbuilder'
  end

  def api_board_ids
    @boards = current_user.boards
    render json: @boards
  end
end