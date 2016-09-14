class Note < ApplicationRecord
  validates :notebook_id, presence: true

  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

end
