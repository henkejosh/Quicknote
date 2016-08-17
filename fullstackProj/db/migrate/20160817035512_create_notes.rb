class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.integer :notebook_id, null: false
      t.string :body
      t.timestamps
    end

    add_index :notes, :notebook_id
  end
end
