class Entry < ApplicationRecord
  validates_presence_of :content, :title
  
  belongs_to :user
end
