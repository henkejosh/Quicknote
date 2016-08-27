require 'byebug'

class Api::TagsController < ApplicationController
  def index
    # byebug
    # @tags = Tag.where(user_id: current_user.id)
    @tags = current_user.tags
    render json: @tags
  end

  def new
    @tag = Tag.new
    render json: @tag
  end

  def show
    @tag = Tag.find(params[:id])
    render json: @tag
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy!
    render :index
  end

  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      note = Note.find(params["note_id"])
      @tag.notes << note
      @tag.save
      render json: @tag
    else
      render json: @tag.errors, status: 422
    end
  end

  def update
    @tag = Tag.find(params[:id])
    @tag.update_attributes!(tag_params)

    if @tag.save
      render json: @tag
    else
      render json: @tag.errors, status: 422
    end
  end

  private
  def tag_params
    params.require(:tag).permit(:title)
  end
end
