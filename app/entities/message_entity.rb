module API
  module Entities
    class MessageEntity < Grape::Entity
      expose :id
      expose :author
      expose :recipient
      expose :content
      expose :updated_at
    end
  end
end