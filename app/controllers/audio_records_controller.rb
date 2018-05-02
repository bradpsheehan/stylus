class AudioRecordsController < ApplicationController
  def index
    @audio_records = AudioRecord.order('LOWER(title)')
    @artists = Artist.order('name ASC')
    @default_artist_chart = Artist.first.try(:extract_chart_info) || {}
  end

  def show
  end

  def create
    artist_id = if permitted_params[:artist_name].blank?
                  permitted_params[:artist_id]
                else
                  Artist.find_or_create_by(name: permitted_params[:artist_name]).id
                end

    audio_record = AudioRecord.new(permitted_params.merge(artist_id: artist_id))
    if audio_record.save
      render json: { audio_record: audio_record }, status: :created
    else
      render json: { errors: audio_record.errors }, status: :unprocessable_entity
    end
  end

  def update
    audio_record = AudioRecord.find(permitted_params[:id])
    if audio_record.update_attributes(permitted_params)
      render json: { audio_record: audio_record }, status: :ok
    else
      render json: { errors: audio_record.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    audio_record = AudioRecord.find(params[:id])
    if audio_record.destroy
      render json: { audio_record: audio_record }, status: :ok
    else
      render json: { errors: audio_record.errors }, status: :unprocessable_entity
    end
  end

  private

  def permitted_params
    params.require(:audio_record).permit(
     :id,
     :artist_id,
     :artist_name,
     :title,
     :record_condition,
     :released_on,
     :created_at,
     :updated_at)
  end
end
