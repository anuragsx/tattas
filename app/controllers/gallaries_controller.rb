class GallariesController < ApplicationController
	before_action :authenticate_user!
  #before_action :set_category, only: [:show, :edit, :update, :destroy]
  layout 'dashboard'

  # GET /categories
  # GET /categories.json
  def index
    @category = Category.find(params[:category_id])
    @pictures = @category.pictures
  end

  def destory_picture
  	@category = Category.find(params[:category_id])
  	@picture = Picture.find(params[:id])
    @picture.destroy
    respond_to do |format|
      format.html { redirect_to category_gallaries_path(@category), notice: 'Image was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def edit
  	@category = Category.find(params[:category_id])
  	@picture = Picture.find(params[:id])
  end	

  def update_gallary
  	@picture = Picture.find(params[:id])
  	@category = Category.find(params[:category_id])
      respond_to do |format|
        if @picture.update(picture_params)
          format.html { redirect_to category_gallaries_path(category_id: @category), notice: 'Gallary was successfully updated.' }
        else
          format.html { render :edit }
        end
      end
  end	

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def picture_params
      params.require(:picture).permit(:description)
    end

end
