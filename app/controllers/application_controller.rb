class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :redirect_if_not_logged_in

  private

  def redirect_if_not_logged_in
    redirect_to '/users/sign_in' unless signed_in?
  end
end
