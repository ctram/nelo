class Message < ApplicationRecord
  validates_presence_of :content, :privacy_level, :author_id, :recipient_id

  belongs_to :author,     class_name: 'User', foreign_key: 'author_id'
  belongs_to :recipient,  class_name: 'User', foreign_key: 'recipient_id'
end
