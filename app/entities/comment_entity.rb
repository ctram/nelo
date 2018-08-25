require_relative './user_entity'

module API
  module Entities
    class CommentEntity < Grape::Entity
      expose :id
      expose :author, using: API::Entities::UserEntity
      expose :recipient, using: API::Entities::UserEntity
      expose :content
      expose :updated_at
    end
  end
end