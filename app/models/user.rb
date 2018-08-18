class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :entries, dependent: :destroy
  scope :messages_as_author,    ->(user = current_user) { where(author_id: user.id) }
  scope :messages_as_recipient, ->(user = current_user) { where(recipient_id: user.id) }
  scope :messages,              ->(user = current_user) { where('author_id = ? OR recipient_id = ?', user.id, user.id) }
end
