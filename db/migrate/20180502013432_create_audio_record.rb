class CreateAudioRecord < ActiveRecord::Migration[5.2]
  def change
    create_table :audio_records do |t|
      t.integer :artist_id, null: false
      t.string :title, limit: 255
      t.date :released_on
      t.text :record_condition

      t.timestamps
    end

    add_index :audio_records, :artist_id
    add_index :audio_records, :title
    add_index :audio_records, :released_on
  end
end
