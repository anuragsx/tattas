class PagesController < ApplicationController

  def index
  	@categories = Category.all
  end

  def image_gallary
  	@category = Category.find(params[:id])
  	@images = @category.pictures
  end

  def gallary_project
    @picture = Picture.find(params[:img])
    @categories = Category.all
  end	

  def about
  end
end
