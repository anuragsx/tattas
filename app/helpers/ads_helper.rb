module AdsHelper
	def method_caption_ads(params)
		params[:action] == 'edit' ? 'Edit Ad' : 'New Ad'
	end	
end
