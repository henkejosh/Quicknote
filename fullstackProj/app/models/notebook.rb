class Notebook < ApplicationRecord
  validates :title, :user_id, presence: true
end
