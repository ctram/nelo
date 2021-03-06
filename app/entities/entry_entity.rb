require_relative './user_entity'

module API
  module Entities
    class EntryEntity < Grape::Entity
      expose :id
      expose :title
      expose :content
      expose :updated_at
      expose :privacy_level
      expose :author, using: API::Entities::UserEntity
    end
  end
end