module API
  module Entities
    class MessageEntity < Grape::Entity
      expose :id
      expose :author, using: API::Entities::UserEntity
      expose :recipient
      expose :content
      expose :updated_at
    end
  end
end