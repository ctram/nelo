class Message < ApplicationRecord
  validates_presence_of :content, :privacy_level, :author_id, :recipient_id
  
end
