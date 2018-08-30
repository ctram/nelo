Rails.application.routes.draw do
  root 'home#index'

  # devise_for :users
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  #   passwords: 'users/passwords'
  }
  resources :users, shallow: true do
    resources :entries
    resources :comments
  end

  get 'friendships', to: 'friendships#show'
  patch 'friendships', to: 'friendships#update'

  resources :friendships
end