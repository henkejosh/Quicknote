if @tag
  json.id @tag.id
  json.title @tag.title
  json.created_at @tag.created_at
  json.updated_at @tag.updated_at
  json.user_id @tag.user_id
  json.note_ids @tag.notes do |note|
    json.id note.id
    # json.title note.title
    # json.body note.body
    # json.notebook_id note.notebook_id
    # json.created_at note.created_at
    # json.updated_at note.updated_at
  end
end
