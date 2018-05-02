require 'rails_helper'

RSpec.describe AudioRecord, 'associations', :type => :model do
  it { should belong_to(:artist) }
end

RSpec.describe AudioRecord, 'validations', :type => :model do
  it { should validate_presence_of(:artist_id) }
  it { should validate_presence_of(:title) }
end
