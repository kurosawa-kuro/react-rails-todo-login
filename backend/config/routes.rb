Rails.application.routes.draw do
  resources :todos, only: [:create, :index]
  
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
# Rails.application.routes.draw do
#   mount_devise_token_auth_for 'User', at: 'auth'
#   # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

#   # Defines the root path route ("/")
#   # root "articles#index"
#   resources :todos, only: [:create, :index]
# end
