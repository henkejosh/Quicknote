class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.integer :note_id, null: false
      t.string :title, null: false
      t.timestamps
    end

    add_index :tags, :note_id
  end
end
