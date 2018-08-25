class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, Message do |msg|
      (msg.author == user || msg.recipient == user || msg.author.friend?(user)) || msg.privacy_level == 'public'
    end
    can [:create, :edit], Message do |msg|
      msg.author == user
    end
    can :destroy, Message do |msg|
      msg.author == user || msg.recipient == user
    end
    
    can :manage, Entry, author_id: user.id
    can :read, Entry do |entry|
      (entry.author == user || entry.author.friend?(user)) || entry.privacy_level == 'public'
    end

    if user.admin?
      can :manage, Message
      can :manage, Entry
      can :manage, User
    end
  end
end
