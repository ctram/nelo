Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  #   passwords: 'users/passwords'
  }
  resources :entries
  resources :users, shallow: true do
    resources :messages
  end
  
  root 'entries#index'
end