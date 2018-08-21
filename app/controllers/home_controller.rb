class HomeController < ApplicationController
  def index
    redirect_to "/users/#{current_user.id}/entries" if signed_in?
  end
end
