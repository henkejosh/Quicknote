class Tag < ApplicationRecord
  validates :title, presence: true

  # has_and_belongs_to_many :notes, join_table: :notes_tags
  has_many :notes_tags, dependent: :delete_all
  has_many :notes, through: :notes_tags, source: :note

  has_many :notebooks, through: :notes
  # has_one :user, through: :notebooks
  belongs_to :user

end
