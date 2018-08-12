class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  around_action :set_current_user_to_props

  private

  def set_current_user_to_props
    @props = { currentUser: current_user }
    yield
  end
  
end
