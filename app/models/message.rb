class Message < ApplicationRecord
  validates_presence_of :content, :privacy_level, :author_id, :recipient_id
  validate :recipient_and_author_cannot_be_the_same

  scope :privacy_public, -> { where(privacy_level: 'public') }
  scope :privacy_private, -> { where(privacy_level: 'private') }

  belongs_to :author,     class_name: 'User', foreign_key: 'author_id'
  belongs_to :recipient,  class_name: 'User', foreign_key: 'recipient_id'

  private

  def recipient_and_author_cannot_be_the_same
    errors.add(:author_id, 'cannot be the same as recipient_id') if author_id == recipient_id
  end
end
