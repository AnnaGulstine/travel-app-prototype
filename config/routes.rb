Rails.application.routes.draw do
  devise_for :users
  
  get '/' => 'boards#index'
  get '/boards' => 'boards#index'
  get 'boards/new' => 'boards#new'
  post 'boards' => 'boards#create'
  get '/boards/:id' => 'boards#show'
  delete '/boards/:id/' => 'boards#destroy'

  get '/pins/new' => 'pins#new'
  post '/pins' => 'pins#create'

  post '/search' => 'pins#run_search'
end
