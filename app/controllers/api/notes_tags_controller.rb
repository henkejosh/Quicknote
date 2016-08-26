class Api::NotesTagsController < ApplicationController
  def create
    @notes_tag = NotesTag.new(notes_tags_params)
  end

  def destroy
    @notes_tag = NotesTag.find(params[:id])
  end

  private
  def notes_tags_params
    params.require(:notes_tag).permit(:tag_id, :note_id)
  end
end
