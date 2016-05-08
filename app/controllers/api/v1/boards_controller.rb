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
    @boards = current_user.boards
    render json: @boards
  end
end