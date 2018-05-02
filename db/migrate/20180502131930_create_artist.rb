class CreateArtist < ActiveRecord::Migration[5.2]
  def change
    create_table :artists do |t|
      t.string 'name', null: false, limit: 255
      t.text 'biography'

      t.timestamps
    end

    add_index :artists, :name
  end
end