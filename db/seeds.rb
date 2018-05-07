# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

raw_artist_data = [{ name: 'Kanye West' }, { name: 'Dave Matthews Band' }]

artists = raw_artist_data.map do |artist|
  Artist.where(name: artist[:name]).first_or_create
end

AudioRecord.where(title: 'Late Registration').first_or_create(artist: artists.first, released_on: 1.year.ago, record_condition: 'Poor')
AudioRecord.where(title: 'Graduation').first_or_create(artist: artists.first, released_on: Date.today, record_condition: 'Great')
AudioRecord.where(title: 'Freshmen Adjustment').first_or_create(artist: artists.first, released_on: 5.days.ago, record_condition: 'Amazing')

AudioRecord.where(title: 'Red Rocks').first_or_create(artist: artists.last, released_on: 2.years.ago, record_condition: 'Great')
AudioRecord.where(title: 'Crash').first_or_create(artist: artists.last, released_on: 2.years.ago, record_condition: 'Acceptable')
AudioRecord.where(title: 'Under Table').first_or_create(artist: artists.last, released_on: 2.years.ago, record_condition: 'Poor')
AudioRecord.where(title: 'Everyday').first_or_create(artist: artists.last, released_on: Date.today, record_condition: 'Great')
AudioRecord.where(title: 'Stand Up').first_or_create(artist: artists.last, released_on: 2.days.ago, record_condition: 'Perfect')
AudioRecord.where(title: 'Busted Stuff').first_or_create(artist: artists.last, released_on: 4.years.ago, record_condition: 'Great')



