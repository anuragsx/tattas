class CreateAds < ActiveRecord::Migration[5.0]
  def change
    create_table :ads do |t|
      t.string :title
      t.text :source
      t.string :height
      t.string :weight

      t.timestamps
    end
  end
end
