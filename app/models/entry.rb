class Entry < ApplicationRecord
  validates_presence_of :content, :title

  scope :privacy_private, -> { where(privacy_level: 'private') }
  scope :privacy_public, -> { where(privacy_level: 'public') }
  scope :viewable_by, ->(user) { where('privacy_level = ? OR author_id = ?', 'public', user.id.to_s) }
  
  belongs_to :author, class_name: User, foreign_key: 'author_id'
  has_many :comments
end
