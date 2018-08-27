class Friendship < ApplicationRecord
  validates_presence_of :friend_id, :user_id

  belongs_to :friender, class_name: User, foreign_key: :user_id
  belongs_to :friendee, class_name: User, foreign_key: :friend_id

  # def update_status(user, action)
  #   unless [:pending, :confirmed, :denied].include? action.to_sym
  #     raise 'friend status not one of acceptable types'
  #   end
    
  #   if user.id == user_id
  #     update(friender_status: action)
  #   elsif user.id == friend_id
  #     update(friendee_status: action)
  #   end
  # end

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
    elsif friender_status == 'pending' || friendee_status == 'pending'
      'pending'
    elsif friender_status == 'denied' || friendee_status == 'denied'
      'denied'
    else
      'not_friends'
    end
  end
end
