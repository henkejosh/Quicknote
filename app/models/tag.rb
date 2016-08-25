class Tag < ApplicationRecord
  validates :note_id, :title, presence: true

  belongs_to :note

end
