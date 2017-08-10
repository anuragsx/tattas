module CategoriesHelper
	def method_caption(params)
		params[:action] == 'edit' ? 'Edit Category' : 'New Category'
	end	
end
