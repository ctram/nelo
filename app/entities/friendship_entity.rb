require_relative './user_entity'

module API
  module Entities
    class FriendshipEntity < Grape::Entity
      expose :friender, using: API::Entities::UserEntity
      expose :friendee, using: API::Entities::UserEntity
      expose :updated_at
      expose :friendee_status
      expose :status
      expose :id
    end
  end
end