class Note < ApplicationRecord
  validates :notebook_id, presence: true

  belongs_to :notebook
  has_many :tags

  has_one :user,
    through: :notebook,
    source: :user
end
