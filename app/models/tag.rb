class Tag < ApplicationRecord
  validates :note_id, :title, presence: true

  has_and_belongs_to_many :notes

end
