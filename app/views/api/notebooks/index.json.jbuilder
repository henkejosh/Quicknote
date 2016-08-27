if !@notebooks.empty?
  json.notebooks_arr @notebooks do |notebook|
    json.id notebook.id
    json.title notebook.title
    json.user_id notebook.user_id
    json.notes notebook.notes.each do |note|
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
end
