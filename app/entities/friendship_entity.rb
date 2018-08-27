require_relative './user_entity'

module API
  module Entities
    class FriendshipEntity < Grape::Entity
      expose :id
      expose :friender, using: API::Entities::UserEntity
      expose :friendee, using: API::Entities::UserEntity
      expose :updated_at
      expose :friender_status
      expose :friendee_status
      expose :status
    end
  end
end