# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  skip_before_action :redirect_if_not_logged_in, only: [:new, :create]
  
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # # POST /resource/sign_in
  # def create
  #   super
  # end

  # def destroy
  #   puts "current user in destroy before super #{current_user.email}"
  #   super
  #   puts "current user in destroy after super #{current_user && current_user.email}"
  #   sign_out current_user
    
  #   puts "current user in destroy after signout #{current_user && current_user.email}"
  # end

  # protected

  # # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
