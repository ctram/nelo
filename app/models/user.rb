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

  validates_presence_of :username, :email

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

  def all_comments
    comments
  end

  def friend?(user)
    friends.where(friend_id: user.id, status: 'confirmed')
  end

  def admin?
    role == 'admin'
  end

  def comments(type = nil)
    comments = Comment.where('author_id = ? OR recipient_id = ?', id.to_s, id.to_s) if type.nil?

    if type == :author 
      return comments.where('author_id = ?', id.to_s)
    elsif type == :recipient
      return comment.where('recipient_id = ?', id.to_s)
    end

    comments
  end
end
