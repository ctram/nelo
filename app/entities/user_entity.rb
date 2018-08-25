module API
  module Entities
    class UserEntity < Grape::Entity
      expose :id
      expose :email
      expose :role
      expose :profile_image_url
    end
  end
end