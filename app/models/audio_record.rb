class AudioRecord < ApplicationRecord
  belongs_to :artist

  validates_presence_of :artist_id, :title

  attr_accessor :artist_name

  scope :group_by_year_released, -> { group_by(&:year_released) }

  def year_released
    released_on.strftime('%Y')
  end
end
