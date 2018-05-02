require 'rails_helper'

RSpec.describe Artist, 'associations', :type => :model do
  it { should have_many(:audio_records) }
end

RSpec.describe Artist, 'validations', :type => :model do
  it { should validate_presence_of(:name) }
end
