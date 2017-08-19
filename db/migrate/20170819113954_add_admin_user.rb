class AddAdminUser < ActiveRecord::Migration[5.0]
  def change
    	u = User.new(email: "admin@gmail.com", password: 'admin123', 
    					password_confirmation: 'admin123')
    	u.save!
  end
end
