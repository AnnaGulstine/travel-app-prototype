class PagesController < ApplicationController
  def home
    if user_signed_in?
      redirect_to "/boards"
    else
      render "home.html.erb"
    end
  end
end