class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :entries, dependent: :destroy, foreign_key: 'author_id'
  has_and_belongs_to_many :friends,
                          join_table: :user_friends,
                          class_name: User,
                          foreign_key: :user_id,
                          association_foreign_key: :friend_id

  def public_messages(type = nil)
    public_messages = messages.privacy_public
    
    if type == :author
      return public_messages.where(author_id: id.to_s)
    elsif type == :recipient_id
      return public_messages.where(recipient_id: id.to_s)
    end

    public_messages
  end

  def private_messages(type = nil)
    private_messages = messages.privacy_private

    if type == :author
      return private_messages.where(author_id: id.to_s)
    elsif type == :recipient_id
      return private_messages.where(recipient_id: id.to_s)
    end 
    
    private_messages
  end

  def friend?(user)
    friends.where(friend_id: user.id, status: 'confirmed')
  end

  private 

  def messages(type = nil)
    messages = Message.where('author_id = ? OR recipient_id = ?', id.to_s, id.to_s) if type.nil?

    if type == :author 
      return messages.where('author_id = ?', id.to_s)
    elsif type == :recipient
      return message.where('recipient_id = ?', id.to_s)
    end

    messages
  end
end
