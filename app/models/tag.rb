class Tag < ApplicationRecord
  validates :title, presence: true

  has_many :taggings, dependent: :destroy
  has_many :notes, through: :taggings
  has_many :notebooks, through: :notes
  belongs_to :user

end
