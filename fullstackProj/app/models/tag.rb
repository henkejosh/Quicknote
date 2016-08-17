class Tag < ApplicationRecord
  validates :note_id, :title, presence: true
  
end
