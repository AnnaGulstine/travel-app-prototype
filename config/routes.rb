Rails.application.routes.draw do
  devise_for :users

  get '/home' => 'pages#home'
  
  get '/' => 'boards#index'
  get '/boards' => 'boards#index'
  get 'boards/new' => 'boards#new'
  post 'boards' => 'boards#create'
  get '/boards/:id' => 'boards#show'
  delete '/boards/:id/' => 'boards#destroy'

  get '/pins/new' => 'pins#new'
  post '/pins' => 'pins#create'
  get '/pins/:id' => 'pins#show'
  get '/pins/:id/edit' => 'pins#edit'
  patch '/pins/:id' => 'pins#update'  

  post '/search' => 'pins#run_search'

  namespace :api do
    namespace :v1 do
      get '/boards' => 'boards#index'
      get '/boards/:id' => 'boards#show'
      get '/pins' => 'pins#index'
    end
  end
end
