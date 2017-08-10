class AddCategoriesData < ActiveRecord::Migration[5.0]
  def change
  	[{name: 'Street', desc: 'even'}, {name: 'South', desc: 'odd'}, {name: 'Trendy', desc: 'even'},
  		{name: 'Sand', desc: 'odd'}, {name: 'Outdoor', desc: 'even'}, {name: 'Green', desc: 'odd'},
  		{name: 'Black', desc: 'even'}, {name: 'Gothic', desc: 'odd'}, {name: 'Casual', desc: 'even'},
  		{name: 'Sweater', desc: 'odd'}, {name: 'Easiness', desc: 'even'}, {name: 'Family', desc: 'odd'}].each do |c|
  			Category.create(name: c[:name], desc: c[:desc])
  		end
  	
  end
end
