require_relative '../entities/friendship_entity'

class FriendshipsController < ApplicationController
  def create
    friendee_id = friendship_params[:friendee_id]
    friender_id = current_user.id
    friendship = Friendship.where('friendee_id IN (?) AND friender_id IN (?)', [friendee_id, friender_id], [friendee_id, friender_id]).first

    if @friendship.nil?
      friendship = Friendship.create(friender_id: current_user.id, friendee_id: friendee_id, friender_status: 'friendee_status')
      status = 201
    else
      status = 204
    end

    render status: status, json: { friendship: API::Entities::FriendshipEntity.represent(friendship) }
  end

  def show
    friendee_id = params[:friendee_id]
    friender_id = params[:friender_id]
    id = params[:id]

    if id 
      friendship = Friendship.find(id)
    else
      friendship = Friendship.where('friendee_id IN (?) AND friender_id IN (?)', [friendee_id, friender_id], [friendee_id, friender_id]).first
    end
    
    render json: { friendship: API::Entities::FriendshipEntity.represent(friendship) }
  end

  def update
    friendship = Friendship.find(params[:id])
    can? :update, friendship
    friendship.update(friendship_params)
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