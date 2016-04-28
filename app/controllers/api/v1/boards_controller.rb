class Api::V1::BoardsController < ApplicationController
  def index
    if current_user
      @boards = current_user.boards
    else
      redirect_to "/users/sign_in"
    end
    render 'index.json.jbuilder'
  end
end