class PagesController < ApplicationController
  def query
    @message = params[:message]
  end
end
