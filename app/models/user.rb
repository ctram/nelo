class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :entries, dependent: :destroy
  has_many :messages_as_recipient, class_name: 'Message', foreign_key: 'recipient_id'
  has_many :messages_as_author, class_name: 'Message', foreign_key: 'author_id'

  def all_messages
    Message.where('author_id = ? OR recipient_id = ?', current_user.id, current_user.id)
  end
end
