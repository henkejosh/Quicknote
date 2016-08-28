class CreateNotesTags < ActiveRecord::Migration[5.0]
  def change
    create_table :notes_tags do |t|
      t.integer :note_id, null: false
      t.integer :tag_id, null: false
      t.timestamps
    end
    add_index :notes_tags, [:tag_id, :note_id], unique: true
    add_index :notes_tags, [:note_id, :tag_id], unique: true
  end
end
