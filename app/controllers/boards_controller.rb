class BoardsController < ApplicationController
  def index
    if current_user
      @boards = current_user.boards
    else
      redirect_to "/"
    end
  end

  def show
    if current_user
      @board = Board.find_by(id: params[:id])
      @categories = Category.all
      @notes = Note.where(user_id: current_user.id)
      session[:board_id] = @board.id
      if @board
        @pins = @board.pins
      else
        redirect_to "/boards"
      end
    else
      redirect_to "/users/sign_in"
    end
  end

  def new    
  end

  def create
    # coordinates = Geocoder.coordinates(params[:address])
    # console.log(coordinates)
    @board = Board.create(
      name: params[:name],
      user_id: current_user.id.to_i
      # latitude: coordinates[0],
      # longitude: coordinates[1]
    )
    redirect_to "/boards"
  end

  def edit
    @board = Board.find_by(id: params[:id])
  end

  def update
    @board = Board.find_by(id: params[:id])   
    @board.update(
      name: params[:name]
    )
    flash[:success] = "Trip successfully updated!"
    redirect_to "/boards/#{@board.id}"
  end  

  def destroy  
    @board = Board.find_by(id: params[:id])
    @board.destroy
    flash[:success] = "Board successfully deleted!" 
    redirect_to '/boards'
  end  
end
