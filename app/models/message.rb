class Message < ApplicationRecord
  validates_presence_of :content, :privacy_level, :author_id, :recipient_id

  has_many :user_as_author, class_name: 'User', foreign_key: 'author_id'
  has_many :user_as_recipient, class_name: 'User', foreign_key: 'recipient_id'
end
