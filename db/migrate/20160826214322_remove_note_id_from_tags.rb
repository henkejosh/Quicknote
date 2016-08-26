class RemoveNoteIdFromTags < ActiveRecord::Migration[5.0]
  def change
    remove_column :tags, :note_id
  end
end
