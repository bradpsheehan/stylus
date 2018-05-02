class ChartsController < ApplicationController
  def chart_data
    artist = Artist.find(permitted_params[:id])
    if artist.present?
      render json: { chart_data: artist.extract_chart_info }, status: :ok
    else
      render json: { errors: audio_record.errors }, status: :unprocessable_entity
    end
  end

  private

  def permitted_params
    params.permit(:id)
  end
end
