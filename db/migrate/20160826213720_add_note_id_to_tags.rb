class AddNoteIdToTags < ActiveRecord::Migration[5.0]
  def change
    add_column :tags, :note_id, :integer
  end
end
