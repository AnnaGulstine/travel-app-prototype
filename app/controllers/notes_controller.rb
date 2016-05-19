class NotesController < ApplicationController
  def index
  end

  def new
    @boards = Board.where("user_id = ?", current_user.id)
  end

  def create
    @note = Note.create(   
      title: params[:title],
      text: params[:text],
      board_id: params[:board_id],
      user_id: current_user.id
    )
    redirect_to "/boards/#{@note.board_id}"
  end  

  def show
    @note = Note.find_by(id: params[:id])
  end

  def edit
    @note = Note.find_by(id: params[:id])
  end

  def update
    @note = Note.find_by(id: params[:id])
    @note.update(
      title: params[:title],
      text: params[:text]
    )
    redirect_to "/boards/#{@note.board_id}"
  end

  def destroy
    @note = Note.find_by(id: params[:id])
    board_id = @note.board_id
    @note.destroy
    flash[:success] = "Note successfully deleted!"
    redirect_to "/boards/#{board_id}"
  end
end