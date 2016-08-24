require 'byebug'

class Api::NotesController < ApplicationController
  def index
    # @notes = Note.all.where(notebook_id: params[:notebook_id])
    @notes = Note.all
    render json: @notes
  end

  def new
    @note = Note.new
    render json: @note
  end

  def show
    @note = Note.find(params[:id])
    render json: @note
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy!
    render :index
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note
    else
      render json: @note.errors, status: 422
    end
  end

  def update
    @note = Note.find(params[:id])
    @note.update_attributes!(note_params)

    if @note.save
      render json: @note
    else
      render json: @note.errors, status: 422
    end
  end

  private
  def note_params
    # byebug
    params.require(:note).permit(:body, :notebook_id)
  end
end
