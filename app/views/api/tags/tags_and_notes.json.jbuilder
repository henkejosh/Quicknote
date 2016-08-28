json.object do
  if @tag
    json.tag do
      json.id @tag.id
      json.title @tag.title
      json.created_at @tag.created_at
      json.updated_at @tag.updated_at
      json.user_id @tag.user_id
      json.taggings @tag.taggings do |nt|
        json.id nt.id
        json.note_id nt.note_id
        json.tag_id nt.tag_id
        json.created_at nt.created_at
        json.updated_at nt.updated_at
      end
      json.note_ids @tag.notes do |note|
        json.id note.id
      end
    end
  end
  if @note
    json.note do
      json.id @note.id
      json.notebook_id @note.notebook_id
      json.body @note.body
      json.created_at @note.created_at
      json.updated_at @note.updated_at
      json.title @note.title
      json.tags @note.tags do |tag|
        json.id tag.id
        json.title tag.title
        json.created_at tag.created_at
        json.updated_at tag.updated_at
        json.taggings tag.taggings do |nt|
          json.id nt.id
          json.note_id nt.note_id
          json.tag_id nt.tag_id
          json.created_at nt.created_at
          json.updated_at nt.updated_at
        end
      end
    end
  end
end
