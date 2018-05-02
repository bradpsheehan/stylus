# README
Stylus provides a dashboard for creating, updating, and deleting music records. It also provides a chart for the user to see how many albums an artist released in a year. Have fund documenting your record collection! 

### Prerequisites
yarn: `brew install yarn`

### Setup
Install gems: `bundle install`

Initialize NodeJS modules: `yarn install`

Initialize database: `bundle exec rake db:create && bundle exec rake db:migrate && bundle exec rake db:seed`

Start rails server: `rails s`

Start webpack dev server: `./bin/webpack-dev-server`


### TODOs
Add more specs

Add sorting (other than the default alpha sort)

Add CSV download

