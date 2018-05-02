# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


  artists = Artist.create([{ name: 'Kanye West' }, { name: 'Dave Matthews Band' }])
  AudioRecord.create(title: 'Graduation', artist: artists.first, released_on: Date.today, record_condition: 'Great')
  AudioRecord.create(title: 'Late Registration', artist: artists.first, released_on: 1.year.ago, record_condition: 'Great')
  AudioRecord.create(title: 'Freshmen Adjustment', artist: artists.first, released_on: Date.today, record_condition: 'Great')

  AudioRecord.create(title: 'Crash', artist: artists.last, released_on: 2.years.ago, record_condition: 'Great')
  AudioRecord.create(title: 'Under Table', artist: artists.last, released_on: 2.years.ago, record_condition: 'Great')
  AudioRecord.create(title: 'Another Record', artist: artists.last, released_on: Date.today, record_condition: 'Great')



