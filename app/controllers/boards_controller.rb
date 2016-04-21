class BoardsController < ApplicationController
  def index
    if current_user
      @boards = current_user.boards
    else
      redirect_to "/users/sign_in"
    end
  end

  def show
    if current_user
      @board = Board.find_by(id: params[:id])
      # @board = Board.where("id = ? AND user_id = ?", id: params[:id], current_user.id.to_i)
      if @board
        @pins = @board.pins
      else
        redirect_to "/users/sign_in"
      end
    else
      redirect_to "/users/sign_in"
    end
  end

  def new    
  end

  def create
    @board = Board.create(
      name: params[:name],
      user_id: current_user.id.to_i
    )
    redirect_to "/boards/#{@board.id}"
  end

  def destroy  
    @board = Board.find_by(id: params[:id])
    @board.destroy
    flash[:success] = "Board successfully deleted!" 
    redirect_to '/boards'
  end  
end
