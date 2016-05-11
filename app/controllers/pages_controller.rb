class PagesController < ApplicationController
  def home
    if current_user
      redirect_to "/boards"
    else
      render "home.html.erb"
    end
  end
end