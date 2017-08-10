class PagesController < ApplicationController
  def index
  	@categories = Category.all
  	#@even_odd_rows = ['even', 'odd', 'even', 'odd', 'even', 'odd', 'even', 'odd', 'even', 'odd'
  					  #'even', 'odd', 'even', 'odd''even', 'odd', 'even', 'odd', 'even', 'odd']
  end

  def about
  end
end
