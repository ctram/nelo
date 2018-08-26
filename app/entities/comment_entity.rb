require_relative './user_entity'
require_relative './entry_entity'

module API
  module Entities
    class CommentEntity < Grape::Entity
      expose :id
      expose :author, using: UserEntity
      expose :recipient, using: UserEntity
      expose :entry, using: EntryEntity
      expose :content
      expose :updated_at
      expose :privacy_level
    end
  end
end