class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, Comment do |comment|
      (comment.author == user || comment.recipient == user || comment.author.friend?(user)) || comment.privacy_level == 'public'
    end
    can [:create, :edit, :update], Comment do |comment|
      comment.author == user
    end
    can :destroy, Comment do |comment|
      comment.author == user || comment.recipient == user
    end
    
    can :read, Entry do |entry|
      (entry.author == user || entry.author.friend?(user)) || entry.privacy_level == 'public'
    end
    can :manage, Entry, author_id: user.id

    can :create, :read, Friendship
    can :update, Friendship do |friendship|
      user == friendship.friender || user == friendship.friendee
    end
    can :destroy, Friendship do |friendship|
      user == friendship.friender
    end

    if user.admin?
      can :manage, Comment
      can :manage, Entry
      can :manage, User
      can :manage, Friendship
    end
  end
end
