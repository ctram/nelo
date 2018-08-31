class Friendship < ApplicationRecord
  validates_presence_of :friender_id, :friendee_id

  belongs_to :friender, class_name: User, foreign_key: :friender_id
  belongs_to :friendee, class_name: User, foreign_key: :friendee_id

  validate :cannot_friend_self
  validate :cannot_already_exist

  def update_status!(user, action)
    unless [:confirm, :deny].include? action.to_sym
      raise 'friend action is not one of the acceptable types.'
    end

    action = action == :confirm ? :confirmed : :denied
    
    if user.id == friender.id
      update(friender_status: action)
    elsif user.id == friendee.id
      update(friendee_status: action)
    else
      raise 'user is not a friender or friendee'
    end
  end

  def role(user)
    if user == friender
      return :friender
    elsif user == friendee
      return :friendee
    end

    nil
  end

  def status
    if friender_status == 'confirmed' && friendee_status.to_sym == 'confirmed'
      'confirmed'
    elsif friender_status == 'denied' || friendee_status == 'denied'
      'denied'
    elsif friender_status == 'pending' || friendee_status == 'pending'
      'pending'
    else
      'not_friends'
    end
  end

  private

  def cannot_friend_self
    if friender_id == friendee_id
      errors.add(:friendee_id, 'cannot friend self')
    end
  end

  def cannot_already_exist
    friendship = Friendship.where('friendee_id IN (?) AND friender_id IN (?)', [friendee_id, friender_id], [friendee_id, friender_id]).first

    if friendship
      errors.add(:friendee_id, 'friendship already exists for these users')
    end
  end
end
