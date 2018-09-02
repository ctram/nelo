class Friendship < ApplicationRecord
  validates_presence_of :friender_id, :friendee_id

  belongs_to :friender, class_name: User, foreign_key: :friender_id
  belongs_to :friendee, class_name: User, foreign_key: :friendee_id

  validate :cannot_friend_self
  validate :cannot_already_exist, on: :create

  def update_status!(action)
    unless [:confirm, :unconfirm].include? action.to_sym
      raise 'friend action is not one of the acceptable types.'
    end
    
    action = action == :confirm ? :confirmed : :pending
    update(friendee_status: action)
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
    if friendee_status == 'confirmed'
      'confirmed'
    elsif friendee_status == 'pending'
      'pending'
    else 
      raise 'impossible friendship status'
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
