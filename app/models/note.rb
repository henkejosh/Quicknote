class Note < ApplicationRecord
  validates :notebook_id, presence: true

  belongs_to :notebook
  # has_and_belongs_to_many :tags, join_table: :notes_tags
  has_many :notes_tags, dependent: :delete_all
  has_many :tags, through: :notes_tags, source: :tag

  has_one :user,
    through: :notebook,
    source: :user
end
