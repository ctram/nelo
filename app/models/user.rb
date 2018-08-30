class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :username, :email

  has_many :entries, dependent: :destroy, foreign_key: 'author_id'
  has_many :comments_as_author, dependent: :destroy, foreign_key: 'author_id', class_name: 'Comment'
  has_many :comments_as_recipient, dependent: :destroy, foreign_key: 'recipient_id', class_name: 'Comment'

  def friendships
    Friendship.where('friendee_id = ? OR friender_id = ?', id.to_s, id.to_s)
  end

  def public_comments(type = nil)
    public_comments = comments.privacy_public
    
    if type == :author
      return public_comments.where(author_id: id.to_s)
    elsif type == :recipient_id
      return public_comments.where(recipient_id: id.to_s)
    end

    public_comments
  end

  def private_comments(type = nil)
    private_comments = comments.privacy_private

    if type == :author
      return private_comments.where(author_id: id.to_s)
    elsif type == :recipient_id
      return private_comments.where(recipient_id: id.to_s)
    end 
    
    private_comments
  end

  def friend?(user)
    friends.where(friend_id: user.id, status: 'confirmed')
  end

  def admin?
    role == 'admin'
  end

  def comments
    Comment.where('author_id = ? OR recipient_id = ?', id.to_s, id.to_s)
  end
end
