Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, controllers: {
    # sessions: 'users/sessions'
  #   registrations: 'users/registrations',
  #   passwords: 'users/passwords'
  }
  root 'home#index'
end