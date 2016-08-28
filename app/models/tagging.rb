class Tagging < ApplicationRecord
  belongs_to :tag, inverse_of: :taggings
  belongs_to :note

  validates :tag_id, uniqueness: { scope: :note_id }
end
