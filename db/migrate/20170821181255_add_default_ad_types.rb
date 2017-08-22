class AddDefaultAdTypes < ActiveRecord::Migration[5.0]
  def change
  	Ad.create(title: 'header')
  	Ad.create(title: 'footer')
  	Ad.create(title: 'side_bar')
  end
end
