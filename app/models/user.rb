class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :entries, dependent: :destroy

  def public_messages(type = nil)
    messages = self.messages.where(privacy_level: 'public')
    
    return messages if type.nil?

    if type == :author
      messages.where(author_id: id.to_s)
    elsif type == :recipient_id
      messages.where(recipient_id: id.to_s)
    end
    []
  end

  def private_messages(type = nil)
    messages.where(privacy_level: 'private')
    return messages if type.nil?

    if type == :author
      messages.where(author_id: id.to_s)
    elsif type == :recipient_id
      messages.where(recipient_id: id.to_s)
    end 
    []
  end

  def messages(type = nil)
    return Message.where('author_id = ? OR recipient_id = ?', id.to_s, id.to_s) if type.nil?

    if type == :author 
      Message.where('author_id = ?', id.to_s)
    elsif type == :recipient
      Message.where('recipient_id = ?', id.to_s)
    end
  end
end
