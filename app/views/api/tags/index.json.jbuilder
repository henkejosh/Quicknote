if !@tags.empty?
  json.tags_arr @tags do |tag|
    json.id tag.id
    json.title tag.title
    json.created_at tag.created_at
    json.updated_at tag.updated_at
    json.user_id tag.user_id
    json.notes_tags tag.notes_tags do |nt|
      json.note_id nt.note_id
      json.tag_id nt.tag_id
      json.created_at nt.created_at
      json.updated_at nt.updated_at
    end
    json.note_ids tag.notes do |note|
      json.id note.id
    end
  end
end
