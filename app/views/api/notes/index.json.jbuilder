if !@notes.empty?
  json.notes_arr @notes do |note|
    json.id note.id
    json.notebook_id note.notebook_id
    json.body note.body
    json.created_at note.created_at
    json.updated_at note.updated_at
    json.title note.title
    json.tags note.tags do |tag|
      json.id tag.id
      json.title tag.title
      json.created_at tag.created_at
      json.updated_at tag.updated_at
    end
  end
end
