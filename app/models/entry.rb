class Entry < ApplicationRecord
  validates_presence_of :content, :title

  scope :privacy_private, -> { where(privacy_level: 'private') }
  scope :privacy_public, -> { where(privacy_level: 'public') }
  # scope :viewable_by, ->(user) { where('privacy_level = ? OR author_id = ?', 'public', user.id.to_s) }
  
  belongs_to :author, class_name: User, foreign_key: 'author_id'
  has_many :comments

  def self.viewable_by(user)
    results = []
    
    all.each do |entry|
      if entry.privacy_level == 'public' || entry.author == user || entry.author.friend?(user) && entry.privacy_level == 'friends'
        results << entry
      end
    end

    Entry.where(id: results)
  end
end
