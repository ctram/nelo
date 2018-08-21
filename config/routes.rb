Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  #   passwords: 'users/passwords'
  }
  resources :users, shallow: true do
    resources :entries
    resources :messages
  end

  root 'home#index'
  get '/entries', to: 'entries#index'
end