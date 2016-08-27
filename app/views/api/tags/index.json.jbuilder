if !@tags.empty?
  json.tags_arr @tags do |tag|
    json.id tag.id
    json.title tag.title
    json.created_at tag.created_at
    json.updated_at tag.updated_at
    # json.notes_count tag.notes.length
    json.note_ids tag.notes do |note|
      json.id note.id
    end
  end
end
