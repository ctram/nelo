require_relative '../entities/friendship_entity'

class FriendshipsController < ApplicationController
  def create
    friendee_id = friendship_params[:friendee_id]
    friender_id = current_user.id
    friendship = Friendship.where('friendee_id IN (?) AND friender_id IN (?)', [friendee_id, friender_id], [friendee_id, friender_id]).first

    if friendship.nil?
      friendship = Friendship.create(friender_id: current_user.id, friendee_id: friendee_id, friender_status: 'confirmed')
      status = 201
    else
      status = 200
    end

    render json: { friendship: API::Entities::FriendshipEntity.represent(friendship) }, status: status
  end

  def show
    friendee_id = friendship_params[:friendee_id]
    friender_id = friendship_params[:friender_id]
    id = params[:id]

    if id 
      friendship = Friendship.find(id)
    else
      friendship = Friendship.where('friendee_id IN (?) AND friender_id IN (?)', [friendee_id, friender_id], [friendee_id, friender_id]).first
    end
    
    render json: { friendship: API::Entities::FriendshipEntity.represent(friendship) }
  end

  def update
    user = User.find(params[:user_id])
    unless user
      return render status: 422, json: { message: 'User not found as friend.' }
    end
    
    friendship = Friendship.where('friender_id IN (?) AND friendee_id IN (?)', [user.id, current_user.id], [user.id, current_user.id]).first
    unless friendship 
      return render status: 422, json: { message: 'Frienship not found.' }
    end
    
    friendship_action = params[:friendship_action].to_sym
    can? :update, friendship
    friendship = friendship.update_status!(current_user, friendship_action)
    render json: { friendship: API::Entities::FriendshipEntity.represent(friendship) }
  end

  # def destroy
  #   friendship = Friendship.find(params[:id])
  #   if current_user == friendship.user
  #     user = current_user
  #   elsif current_user == friendship.friend
  #     friend = current_user
  #   end
  # end

  private

  def friendship_params
    params.require(:friendship).permit(:friender_id, :friendee_id, :friender_status, :friendee_status)
  end
end