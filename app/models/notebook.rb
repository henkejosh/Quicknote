class Notebook < ApplicationRecord
  validates :title, :user_id, presence: true

  belongs_to :user
  has_many :notes, dependent: :destroy

  has_many :tags,
    through: :notes,
    source: :tags

end
