class Entry < ApplicationRecord
  validates_presence_of :content, :title

  scope :privacy_private, -> { where(privacy_level: 'private') }
  scope :privacy_public, -> { where(privacy_level: 'public') }
  scope :with_user_entries, ->(user) { where('privacy_level = ? OR author_id = ?', 'public', user.id) }
  
  belongs_to :author, class_name: User, foreign_key: 'author_id'
end
