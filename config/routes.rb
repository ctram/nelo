Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  #   passwords: 'users/passwords'
  }
  resources :entries
  resources :messages
  
  root 'entries#index'
end