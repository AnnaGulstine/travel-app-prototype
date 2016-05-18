class NotesController < ApplicationController
  def show
    @note = Note.find_by(id: params[:id])
  end

  def new
    @boards = Board.where("user_id = ?", current_user.id)
  end

  def create
    board_id = Board.find_by(id: params[:board_id])
    @note = Note.create(   
      title: params[:title],
      text: params[:text],
      board_id: board_id
    )
    redirect_to "/boards/#{@note.board_id}"    
  end
end
