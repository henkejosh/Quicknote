class AddColumnToTags < ActiveRecord::Migration[5.0]
  def change
    add_column :tags, :user_id, :integer, null: false
  end
end
