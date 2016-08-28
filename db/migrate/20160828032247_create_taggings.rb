class CreateTaggings < ActiveRecord::Migration[5.0]
  def change
    create_table :taggings do |t|
      t.integer :note_id
      t.integer :tag_id

      t.timestamps
    end
    add_index :taggings, [:tag_id, :note_id], unique: true
    add_index :taggings, [:note_id, :tag_id], unique: true
  end
end
