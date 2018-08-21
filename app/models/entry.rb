class Entry < ApplicationRecord
  validates_presence_of :content, :title

  scope :privacy_private, -> { where(privacy_level: 'private') }
  scope :privacy_public, -> { where(privacy_level: 'public') }
  
  belongs_to :user
end
