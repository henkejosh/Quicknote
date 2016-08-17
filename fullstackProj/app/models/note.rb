class Note < ApplicationRecord
  validates :notebook_id, presence: true
end
