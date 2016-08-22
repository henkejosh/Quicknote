if @notebook
  json.id @notebook.id
  json.title @notebook.title
  json.user_id @notebook.user_id
  if @notebook.notes
    json.notes @notebook.notes.each do |note|
      json.id note.id
      json.body note.body
      json.title note.title
    end
  end
end
