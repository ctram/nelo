module API
  module Entities
    class EntryEntity < Grape::Entity
      expose :id
      expose :title
      expose :content
      expose :updated_at
      expose :privacy_level
    end
  end
end