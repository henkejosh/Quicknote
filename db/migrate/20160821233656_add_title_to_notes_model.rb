class AddTitleToNotesModel < ActiveRecord::Migration[5.0]
  def change
    add_column :notes, :title, :string, unique: true, null: false
  end
end
