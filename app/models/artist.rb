class Artist < ApplicationRecord
  has_many :audio_records, dependent: :destroy

  accepts_nested_attributes_for :audio_records

  validates_presence_of :name

  def album_release_years
    audio_records.group_by_year_released.keys
  end

  def extract_chart_info
    records_by_year_released = audio_records.group_by_year_released
    series_data = records_by_year_released.map(&:count)

    {
      chartSeriesData: [{name: name, data: series_data}],
      chartYears: records_by_year_released.keys
    }
  end
end
