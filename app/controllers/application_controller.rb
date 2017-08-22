class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :display_ads
  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || stored_location_for(resource) || dashboard_index_path
  end

  def display_ads
  	h_ad = Ad.find_by_title('header')
  	f_ad = Ad.find_by_title('footer')
  	s_ad = Ad.find_by_title('side_bar')
  	@header_ad = h_ad.present? ? h_ad.source : ""
  	@footer_ad = f_ad.present? ? f_ad.source : ""
  	@side_ad = s_ad.present? ? s_ad.source : ""
  end	
end

