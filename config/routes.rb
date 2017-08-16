Rails.application.routes.draw do
  resources :categories do
    resources :gallaries do
      member do
        get :destory_picture
        get :update_gallary
      end  
    end 
		member do
    	get 'new_gallary'
    	get 'create_gallary'
  	end
  end	

  resources :pictures
  #devise_for :users
  resources :dashboard do
  	get 'dashboard'=> 'dashboard#index' 
  end	

  get 'about' => 'pages#about'

  get 'image_gallary' => 'pages#image_gallary'

  get 'gallary_project' => 'pages#gallary_project'

	devise_for :users
	devise_scope :user do
	  get '/users/sign_out' => 'devise/sessions#destroy'
	end


  root to: 'pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
